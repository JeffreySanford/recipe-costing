import { RECIPES, INGREDIENTS } from '../mock-data';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss'],
  standalone: false
})
export class IngredientsPageComponent {
  recipes = RECIPES;
  ingredients = INGREDIENTS;

  private selectedRecipeId$ = new BehaviorSubject<string>(RECIPES[0].id);
  filteredIngredients: Array<{ name: string; quantity: number; unit: string }> = [];

  constructor() {
    this.selectedRecipeId$.subscribe(recipeId => {
      const recipe = this.recipes.find(r => r.id === recipeId);
      let allLines = [...(recipe?.lines || [])];
      // If recipe includes sub-recipes, add their lines
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

  get selectedRecipeId() {
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
