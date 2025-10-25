import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { RecipesPageComponent } from './views/recipes-page.component';

@NgModule({
  declarations: [RecipesPageComponent],
  imports: [CommonModule, UiMaterialModule],
  exports: [RecipesPageComponent]
})
export class RecipesModule {}
