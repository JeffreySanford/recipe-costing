import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id: string;
  name: string;
  lines?: Array<{ ingredientId: string; quantity: number; unit: string }>;
  includes?: Array<{ recipeId: string; multiplier: number }>;
  packaging?: { bagCupSizes: number[] };
}

export interface Ingredient {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  private http = inject(HttpClient);

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('/api/recipes');
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('/api/ingredients');
  }
}
