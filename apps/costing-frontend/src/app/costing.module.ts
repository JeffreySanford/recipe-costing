import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { CostingPageComponent } from './views/costing-page.component';

@NgModule({
  declarations: [CostingPageComponent],
  imports: [CommonModule, UiMaterialModule],
  exports: [CostingPageComponent]
})
export class CostingModule {}
