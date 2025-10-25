import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { HttpClientModule } from '@angular/common/http';
import { RecipesPageComponent } from './views/recipes-page.component';

@NgModule({
  declarations: [RecipesPageComponent],
  imports: [CommonModule, UiMaterialModule, HttpClientModule],
  exports: [RecipesPageComponent]
})
export class RecipesModule {}
