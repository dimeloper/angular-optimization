import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsOptimizedPageComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from '../../services/pokemon.service';
import { BehaviorSubject, of } from 'rxjs';

describe('DetailsOptimizedPageComponent', () => {
  let component: DetailsOptimizedPageComponent;
  let fixture: ComponentFixture<DetailsOptimizedPageComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const mockPokemonDetails = {
      isLoading: () => false,
      error: () => null,
      value: () => null,
    };

    mockPokemonService = jasmine.createSpyObj(
      'PokemonService',
      ['setSelectedPokemon'],
      {
        pokemonDetails: mockPokemonDetails,
      }
    );

    await TestBed.configureTestingModule({
      imports: [
        DetailsOptimizedPageComponent,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsOptimizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
