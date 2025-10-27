import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    RouterModule,
    UiMaterialModule,
    // Add feature modules here
  ],
  bootstrap: [App],
})
export class AppModule {}
