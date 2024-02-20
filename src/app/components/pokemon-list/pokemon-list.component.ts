import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemonList(20, 0).subscribe((response: any) => {
      const pokemonUrls = response.results.map((p: any) => p.url);
      this.fetchPokemonDetails(pokemonUrls);
    });
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
