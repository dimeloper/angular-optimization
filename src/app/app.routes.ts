import { Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

export const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemon/:name', component: PokemonDetailsComponent },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' }
];
