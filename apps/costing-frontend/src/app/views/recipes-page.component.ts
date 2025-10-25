import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RECIPES } from '../mock-data';

@Component({
  selector: 'app-recipes-page',
  standalone: false,
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {
  // Helper: get total cups produced by a recipe (default 40 for base, else from includes)
  getTotalCups(recipe: any): number {
    if (recipe.id === 'bcp-base-40cup') return 40;
    // If recipe includes base, use its multiplier * 40
    const baseInc = recipe.includes?.find((inc: any) => inc.recipeId === 'bcp-base-40cup');
    if (baseInc) return baseInc.multiplier * 40;
    return 1; // fallback
  }

  // Helper: get per-cup cost for a line item (mock: $3/cup for base, $0.2/tsp for salt)
  getLineCost(line: any, recipe: any): number {
    // Example mock costs
    if (line.ingredientId === 'kernels-yellow') return 3 * (line.quantity / this.getTotalCups(recipe));
    if (line.ingredientId === 'oil-canola') return 3 * (line.quantity / this.getTotalCups(recipe));
    if (line.ingredientId === 'salt-fine') return 0.2 * (line.quantity / this.getTotalCups(recipe));
    // Default mock cost
    return 1 * (line.quantity / this.getTotalCups(recipe));
  }
  recipes = RECIPES;
  selectedRecipeId = RECIPES[0].id;

    /**
     * Returns the selected recipe object
     */
    get selectedRecipe() {
      return this.recipes.find(r => r.id === this.selectedRecipeId);
    }

    /**
     * Returns the base popcorn line items for the selected recipe, if it includes base popcorn
     */
    getBasePopcornLines(recipe: any) {
      if (!recipe.includes || !recipe.includes.length) return [];
      const baseInc = recipe.includes.find((inc: any) => inc.recipeId === 'bcp-base-40cup');
      if (!baseInc) return [];
      const baseRecipe = this.recipes.find(r => r.id === 'bcp-base-40cup');
      if (!baseRecipe) return [];
      // Multiply base recipe lines by multiplier
      return baseRecipe.lines.map(line => ({
        ...line,
        quantity: line.quantity * baseInc.multiplier
      }));
    }

    /**
     * Returns all non-base line items for the selected recipe
     */
    getNonBaseLines(recipe: any) {
      if (!recipe.lines) return [];
      return recipe.lines;
    }

  ngOnInit() {}

  onRecipeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRecipeId = select.value;
  }

  getIngredientName(id: string): string {
    // @ts-ignore
    const ingredient = (window as any).INGREDIENTS?.find((i: any) => i.id === id);
    return ingredient ? ingredient.name : id;
  }

  getRecipeName(id: string): string {
    const recipe = this.recipes.find(r => r.id === id);
    return recipe ? recipe.name : id;
  }
}
