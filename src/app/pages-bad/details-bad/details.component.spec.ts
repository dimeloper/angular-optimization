import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DetailsBadPageComponent } from './details.component';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetailsBadPageComponent', () => {
  let mockActivatedRoute: ActivatedRoute;
  let mockPokemonService: PokemonService;
  let component: DetailsBadPageComponent;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ name: 'pikachu' }), // fake param observable
    } as unknown as ActivatedRoute;

    mockPokemonService = {
      pokemonDetails: {},
      setSelectedPokemon: vi.fn(),
    } as unknown as PokemonService;

    TestBed.configureTestingModule({
      imports: [DetailsBadPageComponent], // because it's a standalone component
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    });

    const fixture = TestBed.createComponent(DetailsBadPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setSelectedPokemon with param name on init', () => {
    expect(mockPokemonService.setSelectedPokemon).toHaveBeenCalledWith(
      'pikachu'
    );
  });

  it('should expose pokemonDetails from the service', () => {
    expect((component as any).pokemonDetails).toBe(
      mockPokemonService.pokemonDetails
    );
  });
});
