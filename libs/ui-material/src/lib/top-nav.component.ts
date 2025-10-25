import { Component } from '@angular/core';

@Component({
  selector: 'bcp-top-nav',
  template: `
    <nav>
      <span class="brand">BCP Costing</span>
      <a routerLink="/costing" routerLinkActive="active">Costing</a>
      <a routerLink="/recipes" routerLinkActive="active">Recipes</a>
      <a routerLink="/ingredients" routerLinkActive="active">Ingredients</a>
      <span class="spacer"></span>
    </nav>
  `,
  styles: [`
    nav { display:flex; gap:.75rem; align-items:center; padding:.75rem 1rem; background:#111; color:#eee; }
    a { color:#ccc; text-decoration:none; padding:.25rem .5rem; border-radius:.5rem; }
    a.active { background:#2a2a2a; color:#fff; }
    .brand { font-weight:700; margin-right:1rem; color:#fff; }
    .spacer { flex:1; }
  `],
  standalone: false
})
export class TopNavComponent {}
