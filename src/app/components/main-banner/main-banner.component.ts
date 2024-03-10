import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-banner',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './main-banner.component.html',
  styleUrl: './main-banner.component.scss',
  providers: [
    provideImgixLoader('https://ng-pokedex-optimization.netlify.app/'),
  ],
})
export class MainBannerComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  // initialising the value for mobile phones
  public isMobileBanner = true;

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
            this.isMobileBanner = true;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.isMobileBanner = true;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.isMobileBanner = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.isMobileBanner = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.isMobileBanner = false;
          }
        }
      });
  }
}
