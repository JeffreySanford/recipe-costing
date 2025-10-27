import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { UiMaterialModule } from '@recipe-costing/ui-material';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    UiMaterialModule,
    // Add feature modules here
  ],
  // No manual providers needed for ActivatedRoute
  bootstrap: [App],
})
export class AppModule {}
