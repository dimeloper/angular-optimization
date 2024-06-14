import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormComponent } from '../../components/form/form.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { BannerGridComponent } from '../../components/banner-grid/banner-grid.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-pokedex',
  standalone: true,
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
export class PokedexComponent implements OnInit {
  public hideForm = true;
  public isMobile = true;

  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog);
  private deviceService = inject(DeviceDetectorService);

  private isUserAgentMobile = this.deviceService.isMobile();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  public ngOnInit() {
    if (this.isUserAgentMobile) {
      // if mobile, skip the breakpoint observer logic
      return;
    } else {
      // if desktop we also set up breakpoint observers, so that we load the correct banners
      // in case the user resizes the browser window
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
              this.isMobile = true;
            }
            if (result.breakpoints[Breakpoints.Small]) {
              this.isMobile = true;
            }
            if (result.breakpoints[Breakpoints.Medium]) {
              this.isMobile = false;
            }
            if (result.breakpoints[Breakpoints.Large]) {
              this.isMobile = false;
            }
            if (result.breakpoints[Breakpoints.XLarge]) {
              this.isMobile = false;
            }
          }
        });
    }
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
