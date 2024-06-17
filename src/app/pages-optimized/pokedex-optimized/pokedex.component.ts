import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormComponent } from '../../components/form/form.component';
import { provideImgixLoader } from '@angular/common';
import { BannerGridComponent } from '../../components/banner-grid/banner-grid.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    MatButton,
    PokemonListComponent,
    FormComponent,
    BannerGridComponent,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
  providers: [
    provideImgixLoader('https://ng-pokedex-optimization.netlify.app/'),
  ],
})
export class PokedexComponent {
  private dialog = inject(MatDialog);
  private deviceService = inject(DeviceDetectorService);

  public hideForm = true;
  public deviceInfo;
  public isDesktopUserAgent = false;

  constructor() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isDesktopUserAgent = this.deviceService.isDesktop();
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

  protected readonly JSON = JSON;
}
