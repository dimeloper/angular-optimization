import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PokemonStore } from '../../stores/pokemon-store';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private router = inject(Router);
  private store = inject(PokemonStore);

  protected pokemonListItems = this.store.pokemonListItems;
  protected isLoading = this.store.isLoading;

  constructor() {
    // Fetch list on component load, only if not already loaded
    this.store.fetchPokemonListOnce().catch(error => {
      console.error('[LIST] Error fetching Pokemon list:', error);
    });
  }

  get items() {
    return this.store.pokemonListItems();
  }

  getPokemonLink(pokemonName: string): string[] {
    const currentUrl = this.router.url;
    let baseRoute = '/pokemon';

    if (currentUrl.endsWith('-optimized')) {
      baseRoute = '/pokemon-optimized';
    } else if (currentUrl.endsWith('-bad')) {
      baseRoute = '/pokemon-bad';
    }

    return [baseRoute, pokemonName];
  }
}
