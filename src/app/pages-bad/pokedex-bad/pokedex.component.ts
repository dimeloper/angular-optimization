import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
  MatCardXlImage,
} from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-pokedex',
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatButton,
    MatCardSubtitle,
    MatCardXlImage,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardHeader,
    PokemonListComponent,
    FormComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class PokedexComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  dialog = inject(MatDialog);

  public cols = 1;
  public rowHeight = '380px';

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
    mobile: '../assets/images/non-optimized/pokemon-banner-mobile.png',
    desktop: '../assets/images/non-optimized/pokemon-banner.png',
  };
  public banner = '';

  public hideForm = true;

  private gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 3,
    xs: 2,
  };

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
            this.rowHeight = '250px';
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.banner = this.banners.mobile;
            this.cols = this.gridByBreakpoint.sm;
            this.rowHeight = '250px';
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.banner = this.banners.desktop;
            this.cols = this.gridByBreakpoint.md;
            this.rowHeight = '380px';
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.banner = this.banners.desktop;
            this.cols = this.gridByBreakpoint.lg;
            this.rowHeight = '380px';
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.banner = this.banners.desktop;
            this.cols = this.gridByBreakpoint.xl;
            this.rowHeight = '380px';
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
