import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAnimationComponent } from './footer-animation.component';

describe('FooterAnimationComponent', () => {
  let component: FooterAnimationComponent;
  let fixture: ComponentFixture<FooterAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterAnimationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
