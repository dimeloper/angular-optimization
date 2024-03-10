import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormComponent } from '../../components/form/form.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { MainBannerComponent } from '../../components/main-banner/main-banner.component';

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
    MatCardTitle,
    MatCardTitleGroup,
    MatCardHeader,
    PokemonListComponent,
    FormComponent,
    NgOptimizedImage,
    MainBannerComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  providers: [provideImgixLoader('https://assets.pokemon.com')],
})
export class PokedexComponent {
  public pokemons = [
    {
      title: 'Blastoise',
      image: '/assets/cms2/img/pokedex/full/009.png',
      preview:
        'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.',
    },
    {
      title: 'Charizard',
      image: '/assets/cms2/img/pokedex/full/006.png',
      preview:
        'If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade.',
    },
    {
      title: 'Venusaur',
      image: '/assets/cms2/img/pokedex/full/003.png',
      preview:
        'While it basks in the sun, it can convert light into energy and it is more powerful in the sun.',
    },
    {
      title: 'Blastoise',
      image: '/assets/cms2/img/pokedex/full/009.png',
      preview:
        'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.',
    },
    {
      title: 'Charizard',
      image: '/assets/cms2/img/pokedex/full/006.png',
      preview:
        'If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade.',
    },
    {
      title: 'Venusaur',
      image: '/assets/cms2/img/pokedex/full/003.png',
      preview:
        'While it basks in the sun, it can convert light into energy and it is more powerful in the sun.',
    },
  ];

  public hideForm = true;

  constructor(public dialog: MatDialog) {}

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
