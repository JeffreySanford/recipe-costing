import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeApiService, Recipe, Ingredient } from '../recipe-api.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss'],
  standalone: false
})
export class IngredientsPageComponent {
  recipes: Recipe[] = [];
  ingredients: Ingredient[] = [];
  private selectedRecipeId$ = new BehaviorSubject<string>('');
  filteredIngredients: Array<{ name: string; quantity: number; unit: string }> = [];

  private api = inject(RecipeApiService);

  constructor() {
    this.api.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      if (recipes.length) {
        this.selectedRecipeId$.next(recipes[0].id);
      }
    });
    this.api.getIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
    this.selectedRecipeId$.subscribe(recipeId => {
      const recipe = this.recipes.find(r => r.id === recipeId);
      const allLines: Array<{ ingredientId: string; quantity: number; unit: string }> = [...(recipe?.lines || [])];
      if (recipe?.includes) {
        for (const inc of recipe.includes) {
          const sub = this.recipes.find(r => r.id === inc.recipeId);
          if (sub && sub.lines) {
            for (const line of sub.lines) {
              allLines.push({
                ...line,
                quantity: line.quantity * inc.multiplier
              });
            }
          }
        }
      }
      if (allLines.length) {
        this.filteredIngredients = allLines.map(line => {
          const ingredient = this.ingredients.find(i => i.id === line.ingredientId);
          return {
            name: ingredient ? ingredient.name : line.ingredientId,
            quantity: line.quantity,
            unit: line.unit
          };
        });
      } else {
        this.filteredIngredients = [];
      }
    });
  }

  get selectedRecipeId(): string {
    return this.selectedRecipeId$.value;
  }

  get selectedRecipeName(): string {
    const recipe = this.recipes.find(r => r.id === this.selectedRecipeId);
    return recipe ? recipe.name : '';
  }

  onRecipeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedRecipeId$.next(select.value);
  }
}
