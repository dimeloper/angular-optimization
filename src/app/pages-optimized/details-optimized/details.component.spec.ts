import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsOptimizedPageComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from '../../services/pokemon.service';
import { vi } from 'vitest';

describe('DetailsOptimizedPageComponent', () => {
  let component: DetailsOptimizedPageComponent;
  let fixture: ComponentFixture<DetailsOptimizedPageComponent>;
  let mockPokemonService: {
    setSelectedPokemon: ReturnType<typeof vi.fn>;
    pokemonDetails: {
      isLoading: () => boolean;
      error: () => any;
      value: () => any;
    };
  };

  beforeEach(async () => {
    const mockPokemonDetails = {
      isLoading: () => false,
      error: () => null,
      value: () => null,
    };

    mockPokemonService = {
      setSelectedPokemon: vi.fn(),
      pokemonDetails: mockPokemonDetails,
    };

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
