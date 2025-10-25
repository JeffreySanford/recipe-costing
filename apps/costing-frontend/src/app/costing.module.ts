import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { HttpClientModule } from '@angular/common/http';
import { CostingPageComponent } from './views/costing-page.component';

@NgModule({
  declarations: [CostingPageComponent],
  imports: [CommonModule, UiMaterialModule, HttpClientModule],
  exports: [CostingPageComponent]
})
export class CostingModule {}
