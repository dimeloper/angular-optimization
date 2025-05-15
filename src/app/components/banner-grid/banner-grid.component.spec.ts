import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BannerGridComponent } from './banner-grid.component';

describe('BannerGridComponent', () => {
  let component: BannerGridComponent;
  let fixture: ComponentFixture<BannerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerGridComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPokemonLink', () => {
    it('should return correct URL format with lowercase pokemon name', () => {
      const pokemon = { title: 'Charizard' };
      expect(component.getPokemonLink(pokemon)).toBe(
        '/pokemon-optimized/charizard'
      );
    });

    it('should work with different pokemon names', () => {
      const testCases = [
        { input: 'Blastoise', expected: '/pokemon-optimized/blastoise' },
        { input: 'Venusaur', expected: '/pokemon-optimized/venusaur' },
        { input: 'PIKACHU', expected: '/pokemon-optimized/pikachu' },
      ];

      testCases.forEach(test => {
        const pokemon = { title: test.input };
        expect(component.getPokemonLink(pokemon)).toBe(test.expected);
      });
    });
  });
});
