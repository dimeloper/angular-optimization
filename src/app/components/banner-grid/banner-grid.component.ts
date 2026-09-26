import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';

@Component({
  selector: 'app-banner-grid',
  imports: [
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './banner-grid.component.html',
  styleUrl: './banner-grid.component.scss',
  providers: [provideImgixLoader('https://assets.pokemon.com')],
})
export class BannerGridComponent {
  public getPokemonLink(pokemon: { title: string }): string {
    return `/pokemon-optimized/${pokemon.title.toLowerCase()}`;
  }

  public pokemons = [
    {
      title: 'Blastoise',
      image: '/assets/cms2/img/pokedex/detail/009.png',
      preview:
        'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.',
    },
    {
      title: 'Charizard',
      image: '/assets/cms2/img/pokedex/detail/006.png',
      preview:
        'If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade.',
    },
    {
      title: 'Venusaur',
      image: '/assets/cms2/img/pokedex/detail/003.png',
      preview:
        'While it basks in the sun, it can convert light into energy and it is more powerful in the sun.',
    },
    {
      title: 'Blastoise',
      image: '/assets/cms2/img/pokedex/detail/009.png',
      preview:
        'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.',
    },
    {
      title: 'Charizard',
      image: '/assets/cms2/img/pokedex/detail/006.png',
      preview:
        'If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade.',
    },
    {
      title: 'Venusaur',
      image: '/assets/cms2/img/pokedex/detail/003.png',
      preview:
        'While it basks in the sun, it can convert light into energy and it is more powerful in the sun.',
    },
  ];
}
