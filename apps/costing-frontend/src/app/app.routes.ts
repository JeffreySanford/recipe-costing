import { Routes } from '@angular/router';
import { CostingPageComponent } from './views/costing-page.component';
import { IngredientsPageComponent } from './views/ingredients-page.component';
import { RecipesPageComponent } from './views/recipes-page.component';
import { RecipeEditorComponent } from './views/recipe-editor.component';

export const routes: Routes = [
  { path: 'costing', component: CostingPageComponent },
  { path: 'ingredients', component: IngredientsPageComponent },
  { path: 'recipes', component: RecipesPageComponent },
  { path: 'recipes/:id', component: RecipeEditorComponent }, // id = 'new' for create
  { path: '', redirectTo: 'costing', pathMatch: 'full' },
  { path: '**', redirectTo: 'costing' }
];
