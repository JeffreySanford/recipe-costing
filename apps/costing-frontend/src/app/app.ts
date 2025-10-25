import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@recipe-costing/ui-material';

@Component({
  imports: [RouterModule, UiMaterialModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'costing-frontend';
}
