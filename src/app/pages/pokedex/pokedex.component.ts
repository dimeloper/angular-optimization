import { Component, OnInit } from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle, MatCardTitleGroup, MatCardXlImage,
} from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardXlImage,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardHeader,
    MatDivider,
    PokemonListComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent implements OnInit {
  public cols = 1;

  public pokemons = [
    {
      title: 'Blastoise',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png',
      preview:
        'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.',
    },
    {
      title: 'Charizard',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
      preview:
        'If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade.',
    },
    {
      title: 'Venusaur',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png',
      preview:
        'While it basks in the sun, it can convert the light into energy. As a result, it is more powerful in the summertime.',
    },
    {
      title: 'Blastoise',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png',
      preview:
        'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.',
    },
    {
      title: 'Charizard',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
      preview:
        'If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade.',
    },
    {
      title: 'Venusaur',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png',
      preview:
        'While it basks in the sun, it can convert the light into energy. As a result, it is more powerful in the summertime.',
    },
  ];

  public banners = {
    mobile: '../assets/images/pokemon-banner-mobile.png',
    desktop: '../assets/images/pokemon-banner.png',
  };
  public banner = '';

  private gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1,
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.banner = this.banners.mobile;
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.banner = this.banners.mobile;
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.banner = this.banners.desktop;
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.banner = this.banners.desktop;
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.banner = this.banners.desktop;
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
  }
}
