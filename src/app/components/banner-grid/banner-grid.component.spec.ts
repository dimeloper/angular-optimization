import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerGridComponent } from './banner-grid.component';

describe('BannerGridComponent', () => {
  let component: BannerGridComponent;
  let fixture: ComponentFixture<BannerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
