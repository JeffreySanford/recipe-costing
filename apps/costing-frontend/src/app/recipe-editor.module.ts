import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { RecipeEditorComponent } from './views/recipe-editor.component';

@NgModule({
  declarations: [RecipeEditorComponent],
  imports: [CommonModule, UiMaterialModule],
  exports: [RecipeEditorComponent]
})
export class RecipeEditorModule {}
