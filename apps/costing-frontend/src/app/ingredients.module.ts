import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { IngredientsPageComponent } from './views/ingredients-page.component';

@NgModule({
  declarations: [IngredientsPageComponent],
  imports: [CommonModule, UiMaterialModule],
  exports: [IngredientsPageComponent]
})
export class IngredientsModule {}
