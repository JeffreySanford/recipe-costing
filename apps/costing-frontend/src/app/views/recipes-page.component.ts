  // ...existing code...
import { Component, OnInit, inject } from '@angular/core';
import { RecipeApiService, Recipe } from '../recipe-api.service';

@Component({
  selector: 'app-recipes-page',
  standalone: false,
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipeId = '';

  private api = inject(RecipeApiService);

  ngOnInit() {
    this.api.getRecipes().subscribe((data) => {
      this.recipes = data;
      if (data.length) {
        this.selectedRecipeId = data[0].id;
      }
    });
  }

  get selectedRecipe(): Recipe | undefined {
    return this.recipes.find(r => r.id === this.selectedRecipeId);
  }

  getTotalCups(recipe: Recipe): number {
    if (recipe.id === 'bcp-base-40cup') return 40;
    const baseInc = recipe.includes?.find((inc) => inc.recipeId === 'bcp-base-40cup');
    if (baseInc) return baseInc.multiplier * 40;
    return 1;
  }

  getLineCost(line: { ingredientId: string; quantity: number; unit: string }, recipe: Recipe): number {
    if (line.ingredientId === 'kernels-yellow') return 3 * (line.quantity / this.getTotalCups(recipe));
    if (line.ingredientId === 'oil-canola') return 3 * (line.quantity / this.getTotalCups(recipe));
    if (line.ingredientId === 'salt-fine') return 0.2 * (line.quantity / this.getTotalCups(recipe));
    return 1 * (line.quantity / this.getTotalCups(recipe));
  }

  getBasePopcornLines(recipe: Recipe): Array<{ ingredientId: string; quantity: number; unit: string }> {
    if (!recipe.includes || !recipe.includes.length) return [];
    const baseInc = recipe.includes.find((inc) => inc.recipeId === 'bcp-base-40cup');
    if (!baseInc) return [];
    const baseRecipe = this.recipes.find(r => r.id === 'bcp-base-40cup');
    if (!baseRecipe) return [];
    return (baseRecipe.lines ?? []).map((line: { ingredientId: string; quantity: number; unit: string }) => ({
      ...line,
      quantity: line.quantity * baseInc.multiplier
    }));
  }

  getNonBaseLines(recipe: Recipe): Array<{ ingredientId: string; quantity: number; unit: string }> {
    if (!recipe.lines) return [];
    return recipe.lines;
  }

  onRecipeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRecipeId = select.value;
  }

  getIngredientName(id: string): string {
    return id.replace(/-/g, ' ');
  }

  getRecipeName(id: string): string {
    const recipe = this.recipes.find(r => r.id === id);
    return recipe ? recipe.name : id;
  }
}

