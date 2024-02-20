import { Component, inject, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];

  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemonList(20, 0).subscribe((response: any) => {
      const pokemonUrls = response.results.map((p: any) => p.url);
      this.fetchPokemonDetails(pokemonUrls);
    });
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

  fetchPokemonDetails(pokemonUrls: string[]) {
    pokemonUrls.forEach(url => {
      this.pokemonService
        .getPokemonDetailsByUrl(url)
        .subscribe((details: any) => {
          const pokemon = {
            name: details.name,
            image: details.sprites.front_default,
          };
          this.pokemonList.push(pokemon);
        });
    });
  }
}
