import { Component, OnInit, inject } from '@angular/core';
import { RecipeApiService, Recipe } from '../recipe-api.service';

@Component({
  selector: 'app-costing-page',
  templateUrl: './costing-page.component.html',
  styleUrls: ['./costing-page.component.scss'],
  standalone: false
})
export class CostingPageComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipeId = '';
  previewedRecipeId: string | null = null;

  ingredientCosts: { [id: string]: number } = {
    'kernels-yellow': 2.00,
    'oil-canola': 0.50,
    'salt-fine': 0.10,
    'sugar-white': 1.00,
    'butter': 1.50,
    'caramel-syrup': 2.00,
    'white-choc-coating': 2.50,
    'candy-cane-crush': 1.25,
    'bbq-seasoning': 0.75,
    'brown-sugar': 0.80,
    'smoked-paprika': 0.60,
    'dill-seasoning': 0.90,
    'citric-acid': 0.30,
    'cheddar-powder': 2.20,
    'vanilla-extract': 1.10
  };

  private api = inject(RecipeApiService);

  ngOnInit() {
    this.api.getRecipes().subscribe((data) => {
      this.recipes = data;
      if (data.length) {
        this.selectedRecipeId = data[0].id;
      }
    });
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
    if (!recipe || !recipe.packaging) return [];
    return (recipe.packaging?.bagCupSizes ?? []).map((size: number) => ({
      size,
      cost: +(this.totalIngredientsCost * (size / Math.max(...(recipe.packaging?.bagCupSizes ?? [1])))).toFixed(2)
    }));
  }

  get lineItems(): Array<{ name: string; quantity: number; unit: string; cost: number }> {
    const recipe = this.activeRecipe;
    if (!recipe) return [];
    const items: Array<{ name: string; quantity: number; unit: string; cost: number }> = [];

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
            cost: costPerCup
          });
        } else if (sub) {
          for (const line of sub.lines || []) {
            items.push({
              name: this.getIngredientName(line.ingredientId) + ` (from ${this.getRecipeDisplayName(sub)})`,
              quantity: line.quantity * inc.multiplier,
              unit: line.unit,
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

  getIngredientName(id: string): string {
    return id.replace(/-/g, ' ');
  }
}
