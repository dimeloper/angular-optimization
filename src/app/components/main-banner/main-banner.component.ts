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

  public banners = {
    mobile: '/assets/images/pokemon-banner-mobile.webp',
    desktop: '/assets/images/pokemon-banner.webp',
  };
  // initialising the banner with a default value
  public banner = this.banners.mobile;

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
}
