import { Component, OnInit, inject } from '@angular/core';
import { RecipeApiService, Recipe } from '../recipe-api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-costing-page',
  templateUrl: './costing-page.component.html',
  styleUrls: ['./costing-page.component.scss'],
  standalone: false
})
export class CostingPageComponent implements OnInit {
  get ingredientTotals(): Array<{ name: string; quantity: number; unit: string }> {
    const recipe = this.activeRecipe;
    if (!recipe) return [];
    const totals: Array<{ name: string; quantity: number; unit: string }> = [];

    // Helper to accumulate ingredient quantities
    const addOrUpdate = (id: string, qty: number, unit: string) => {
      const idx = totals.findIndex(t => t.name === this.getIngredientName(id) && t.unit === unit);
      if (idx >= 0) {
        totals[idx].quantity += qty;
      } else {
        totals.push({ name: this.getIngredientName(id), quantity: qty, unit });
      }
    };

    if (recipe.includes) {
      for (const inc of recipe.includes) {
        const sub = this.recipes.find((r) => r.id === inc.recipeId);
        if (sub) {
          for (const line of sub.lines || []) {
            addOrUpdate(line.ingredientId, line.quantity * (inc.multiplier || 1), line.unit);
          }
        }
      }
    }
    for (const line of recipe.lines || []) {
      addOrUpdate(line.ingredientId, line.quantity, line.unit);
    }
    return totals;
  }
  recipes: Recipe[] = [];
  selectedRecipeId = '';
  previewedRecipeId: string | null = null;

  ingredientCosts$ = new BehaviorSubject<{ [id: string]: number }>({});

  private api = inject(RecipeApiService);
  private http = inject(HttpClient);

  ngOnInit() {
    this.api.getRecipes().subscribe((data) => {
      this.recipes = data;
      if (data.length) {
        this.selectedRecipeId = data[0].id;
      }
    });
    this.http.get<{ [id: string]: number }>('/api/ingredient-costs')
      .subscribe(costs => this.ingredientCosts$.next(costs));
  }

  onRecipeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRecipeId = select.value;
  }

  onPreview() {
    this.previewedRecipeId = this.selectedRecipeId;
  }

  getRecipeDisplayName(recipe: Recipe): string {
    return recipe.name.replace(' (40 cups)', '').trim();
  }

  get activeRecipe(): Recipe | undefined {
    return this.recipes.find((r) => r.id === (this.previewedRecipeId || this.selectedRecipeId));
  }

  get totalIngredientsCost(): number {
    const recipe = this.activeRecipe;
    if (!recipe) return 0;
    let total = 0;
    for (const line of recipe.lines || []) {
      total += this.ingredientCosts[line.ingredientId] * line.quantity;
    }
    if (recipe.includes) {
      for (const inc of recipe.includes) {
        const sub = this.recipes.find((r) => r.id === inc.recipeId);
        if (sub) {
          for (const line of sub.lines || []) {
            total += this.ingredientCosts[line.ingredientId] * line.quantity * inc.multiplier;
          }
        }
      }
    }
    return total;
  }

  get perCupCost(): number {
    const recipe = this.activeRecipe;
    if (!recipe || !recipe.packaging) return 0;
    const totalCups = Math.max(...recipe.packaging.bagCupSizes);
    return totalCups ? this.totalIngredientsCost / totalCups : 0;
  }

  get bagMatrix(): Array<{ size: number; cost: number }> {
    const recipe = this.activeRecipe;
    if (!recipe) return [];
    // Always show these sizes
    const defaultSizes = [3, 4, 6, 18, 40];
    // Use recipe sizes if present, else default
    const sizes = Array.from(new Set([...(recipe.packaging?.bagCupSizes ?? []), ...defaultSizes])).sort((a, b) => a - b);
    return sizes.map((size: number) => ({
      size,
      cost: +(this.perCupCost * size).toFixed(2)
    }));
  }

  get lineItems(): Array<{ name: string; quantity: number; unit: string; perCup: number; cost: number }> {
    const recipe = this.activeRecipe;
    if (!recipe) return [];
    const items: Array<{ name: string; quantity: number; unit: string; perCup: number; cost: number }> = [];

    const getTotalCups = (r: Recipe) => {
      if (r.id === 'bcp-base-40cup') return 40;
      const baseInc = r.includes?.find((inc) => inc.recipeId === 'bcp-base-40cup');
      if (baseInc) return baseInc.multiplier * 40;
      return 1;
    };
    const totalCups = getTotalCups(recipe);

    if (recipe.includes) {
      for (const inc of recipe.includes) {
        const sub = this.recipes.find((r) => r.id === inc.recipeId);
        if (sub && sub.id === 'bcp-base-40cup') {
          let baseTotal = 0;
          for (const line of sub.lines || []) {
            baseTotal += this.ingredientCosts[line.ingredientId] * line.quantity;
          }
          const costPerCup = +(baseTotal / 40).toFixed(2);
          items.push({
            name: 'BCP Base Popcorn (per cup)',
            quantity: 1,
            unit: 'cup',
            perCup: 1,
            cost: costPerCup
          });
        } else if (sub) {
          for (const line of sub.lines || []) {
            items.push({
              name: this.getIngredientName(line.ingredientId) + ` (from ${this.getRecipeDisplayName(sub)})`,
              quantity: line.quantity * inc.multiplier,
              unit: line.unit,
              perCup: +(line.quantity * inc.multiplier / totalCups).toFixed(2),
              cost: +(this.ingredientCosts[line.ingredientId] * line.quantity * inc.multiplier / totalCups).toFixed(2)
            });
          }
        }
      }
    }

    for (const line of recipe.lines || []) {
      items.push({
        name: this.getIngredientName(line.ingredientId),
        quantity: line.quantity,
        unit: line.unit,
        perCup: +(line.quantity / totalCups).toFixed(2),
        cost: +(this.ingredientCosts[line.ingredientId] * line.quantity / totalCups).toFixed(2)
      });
    }
    return items;
  }

  get basePopcornCost(): number {
    const recipe = this.activeRecipe;
    if (!recipe || !recipe.includes) return 0;
    const baseInc = recipe.includes.find((inc) => inc.recipeId === 'bcp-base-40cup');
    if (!baseInc) return 0;
    const baseRecipe = this.recipes.find((r) => r.id === 'bcp-base-40cup');
    if (!baseRecipe) return 0;
    let total = 0;
    for (const line of baseRecipe.lines || []) {
      total += this.ingredientCosts[line.ingredientId] * line.quantity * baseInc.multiplier;
    }
    return +total.toFixed(2);
  }

  get ingredientCosts(): { [id: string]: number } {
    return this.ingredientCosts$.value;
  }

  getIngredientName(id: string): string {
    return id.replace(/-/g, ' ');
  }
}
