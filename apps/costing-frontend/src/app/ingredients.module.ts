import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { HttpClientModule } from '@angular/common/http';
import { IngredientsPageComponent } from './views/ingredients-page.component';

@NgModule({
  declarations: [IngredientsPageComponent],
  imports: [CommonModule, UiMaterialModule, HttpClientModule],
  exports: [IngredientsPageComponent]
})
export class IngredientsModule {}
