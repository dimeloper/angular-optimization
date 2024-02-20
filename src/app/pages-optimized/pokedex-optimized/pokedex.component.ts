import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
  MatCardXlImage,
} from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButton } from '@angular/material/button';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormComponent } from '../../components/form/form.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
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
    PokemonListComponent,
    FormComponent,
    NgOptimizedImage,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  providers: [
    provideImgixLoader('https://ng-pokedex-optimization.netlify.app/'),
  ],
})
export class PokedexComponent implements OnInit {
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
        'While it basks in the sun, it can convert light into energy and it is more powerful in the sun.',
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
        'While it basks in the sun, it can convert light into energy and it is more powerful in the sun.',
    },
  ];

  public banners = {
    mobile: '../assets/images/pokemon-banner-mobile.webp',
    desktop: '../assets/images/pokemon-banner.webp',
  };
  // initialising the banner with a default value
  public banner = this.banners.mobile;

  public hideForm = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {}

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
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.banner = this.banners.mobile;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.banner = this.banners.desktop;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.banner = this.banners.desktop;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.banner = this.banners.desktop;
          }
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { name: 'tester', pokemon: 'pikachu' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openForm(): void {
    this.hideForm = false;
  }
}
