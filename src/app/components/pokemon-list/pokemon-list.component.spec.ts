import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

class MockRouter {
  private _url = '/pokemon';

  setUrl(url: string) {
    this._url = url;
  }

  get url() {
    return this._url;
  }
}

describe('PokemonListComponent', () => {
  let mockRouter: MockRouter;
  let mockPokemonService: PokemonService;
  let component: PokemonListComponent;

  beforeEach(() => {
    mockRouter = new MockRouter();

    mockPokemonService = {
      pokemonListWithDetails: [],
      updateListParams: vi.fn(),
    } as unknown as PokemonService;

    TestBed.configureTestingModule({
      imports: [PokemonListComponent], // Because PokemonListComponent is standalone
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    });

    const fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateListParams with 20 and 0 on initialization', () => {
    expect(mockPokemonService.updateListParams).toHaveBeenCalledWith(20, 0);
  });

  describe('getPokemonLink', () => {
    it('should return /pokemon/:name when URL does not end with -optimized or -bad', () => {
      mockRouter.setUrl('/pokemon');
      const link = component.getPokemonLink('pikachu');
      expect(link).toEqual(['/pokemon', 'pikachu']);
    });

    it('should return /pokemon-optimized/:name when URL ends with -optimized', () => {
      mockRouter.setUrl('/some-path-optimized');
      const link = component.getPokemonLink('charmander');
      expect(link).toEqual(['/pokemon-optimized', 'charmander']);
    });

    it('should return /pokemon-bad/:name when URL ends with -bad', () => {
      mockRouter.setUrl('/some-path-bad');
      const link = component.getPokemonLink('bulbasaur');
      expect(link).toEqual(['/pokemon-bad', 'bulbasaur']);
    });
  });
});
