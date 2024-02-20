import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokedex',
    loadComponent: () =>
      import('./pages/pokedex/pokedex.component').then(m => m.PokedexComponent),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./pages/details/details.component').then(m => m.DetailsComponent),
  },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
];
