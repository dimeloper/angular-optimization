import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/intro/intro.component').then(m => m.IntroComponent),
  },
  {
    path: 'pokedex-bad',
    loadComponent: () =>
      import('./pages-bad/pokedex-bad/pokedex.component').then(
        m => m.PokedexComponent
      ),
  },
  {
    path: 'pokemon-bad/:name',
    loadComponent: () =>
      import('./pages-bad/details-bad/details.component').then(
        m => m.DetailsBadPageComponent
      ),
  },
  {
    path: 'pokedex-optimized',
    loadComponent: () =>
      import('./pages-optimized/pokedex-optimized/pokedex.component').then(
        m => m.PokedexComponent
      ),
  },
  {
    path: 'pokemon-optimized/:name',
    loadComponent: () =>
      import('./pages-optimized/details-optimized/details.component').then(
        m => m.DetailsOptimizedPageComponent
      ),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
