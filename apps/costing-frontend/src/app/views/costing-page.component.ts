import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../mock-data';

@Component({
  selector: 'bcp-costing-page',
  templateUrl: './costing-page.component.html',
  styleUrls: ['./costing-page.component.scss'],
  standalone: false
})
export class CostingPageComponent implements OnInit {
  recipes = RECIPES;
  selectedRecipeId = RECIPES[0].id;
  previewedRecipeId: string | null = null;

  // Mock costs for demonstration
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

  ngOnInit() {}

  onRecipeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRecipeId = select.value;
  }

  onPreview() {
    this.previewedRecipeId = this.selectedRecipeId;
  }

  getRecipeDisplayName(recipe: { name: string }): string {
    return recipe.name.replace(' (40 cups)', '').trim();
  }

  get activeRecipe() {
    return this.recipes.find((r: any) => r.id === (this.previewedRecipeId || this.selectedRecipeId));
  }

  get totalIngredientsCost(): number {
    const recipe: any = this.activeRecipe;
    if (!recipe) return 0;
    let total = 0;
    for (const line of recipe.lines || []) {
      total += this.ingredientCosts[line.ingredientId] * line.quantity;
    }
    // Add included sub-recipes
    if (recipe.includes) {
      for (const inc of recipe.includes) {
        const sub: any = this.recipes.find((r: any) => r.id === inc.recipeId);
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
    const recipe: any = this.activeRecipe;
    if (!recipe || !recipe.packaging) return 0;
    const totalCups = Math.max(...recipe.packaging.bagCupSizes);
    return totalCups ? this.totalIngredientsCost / totalCups : 0;
  }

  get bagMatrix(): Array<{ size: number; cost: number }> {
    const recipe: any = this.activeRecipe;
    if (!recipe || !recipe.packaging) return [];
    return recipe.packaging.bagCupSizes.map((size: number) => ({
      size,
      cost: +(this.totalIngredientsCost * (size / Math.max(...recipe.packaging.bagCupSizes))).toFixed(2)
    }));
  }

  get lineItems(): Array<{ name: string; quantity: number; unit: string; cost: number }> {
    const recipe: any = this.activeRecipe;
    if (!recipe) return [];
    const items: Array<{ name: string; quantity: number; unit: string; cost: number }> = [];

    // Helper: get total cups produced by recipe
    const getTotalCups = (r: any) => {
      if (r.id === 'bcp-base-40cup') return 40;
      const baseInc = r.includes?.find((inc: any) => inc.recipeId === 'bcp-base-40cup');
      if (baseInc) return baseInc.multiplier * 40;
      return 1;
    };
    const totalCups = getTotalCups(recipe);

    // If recipe includes sub-recipes, add their ingredients except BCP Base Popcorn
    if (recipe.includes) {
      for (const inc of recipe.includes) {
        const sub: any = this.recipes.find((r: any) => r.id === inc.recipeId);
        if (sub && sub.id === 'bcp-base-40cup') {
          // List cost of 1 cup of base popcorn as ingredient
          // Calculate cost per cup for base popcorn
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

    // Add main recipe ingredients
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

  // Show BCP Base Popcorn cost at the bottom if included
  get basePopcornCost(): number {
    const recipe: any = this.activeRecipe;
    if (!recipe || !recipe.includes) return 0;
    const baseInc = recipe.includes.find((inc: any) => inc.recipeId === 'bcp-base-40cup');
    if (!baseInc) return 0;
    // Calculate cost for BCP Base Popcorn batch
    const baseRecipe = this.recipes.find((r: any) => r.id === 'bcp-base-40cup');
    if (!baseRecipe) return 0;
    let total = 0;
    for (const line of baseRecipe.lines || []) {
      total += this.ingredientCosts[line.ingredientId] * line.quantity * baseInc.multiplier;
    }
    return +total.toFixed(2);
  }

  getIngredientName(id: string): string {
    // For demo, just return id (could use INGREDIENTS lookup)
    return id.replace(/-/g, ' ');
  }
}
