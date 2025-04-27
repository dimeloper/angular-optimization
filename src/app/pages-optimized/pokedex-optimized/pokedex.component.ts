import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormComponent } from '../../components/form/form.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { BannerGridComponent } from '../../components/banner-grid/banner-grid.component';

@Component({
  selector: 'app-pokedex',
  imports: [
    MatButton,
    PokemonListComponent,
    FormComponent,
    NgOptimizedImage,
    BannerGridComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  providers: [
    provideImgixLoader('https://ng-pokedex-optimization.netlify.app/'),
  ],
})
export class PokedexComponent {
  public hideForm = true;

  private dialog = inject(MatDialog);

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
