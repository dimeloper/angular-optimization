import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  protected pokemonList = this.pokemonService.pokemonListWithDetails;

  constructor() {
    // Initialize with default values
    this.pokemonService.updateListParams(20, 0);
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
