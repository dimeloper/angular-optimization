import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonStore } from '../../stores/pokemon-store';
import { ActivatedRoute, Router } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
  let mockStore: {
    fetchPokemonListOnce: ReturnType<typeof vi.fn>;
    pokemonListItems: WritableSignal<
      Array<{ id: string; name: string; image: string }>
    >;
    isLoading: WritableSignal<boolean>;
  };
  let component: PokemonListComponent;

  beforeEach(() => {
    mockRouter = new MockRouter();

    const itemsSignal = signal([
      { id: 'pikachu', name: 'Pikachu', image: 'pikachu.png' },
    ]);
    const loadingSignal = signal(false);

    mockStore = {
      fetchPokemonListOnce: vi.fn().mockImplementation(() => {
        // Simulate store mutation
        itemsSignal.set([
          { id: 'bulbasaur', name: 'Bulbasaur', image: 'bulbasaur.png' },
        ]);
        return Promise.resolve();
      }),
      pokemonListItems: itemsSignal,
      isLoading: loadingSignal,
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        PokemonListComponent,
      ],
      providers: [
        { provide: PokemonStore, useValue: mockStore },
        { provide: ActivatedRoute, useValue: {} },
      ],
    });

    const fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchPokemonListOnce on initialization', () => {
    expect(mockStore.fetchPokemonListOnce).toHaveBeenCalled();
  });

  it('should reflect the updated Pokémon list in the component', () => {
    const items = component.items;
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Bulbasaur');
  });

  describe('getPokemonLink', () => {
    it('should return /pokemon/:name when URL does not end with -optimized or -bad', () => {
      mockRouter.setUrl('/pokemon');
      const link = component.getPokemonLink('pikachu');
      expect(link).toEqual(['/pokemon', 'pikachu']);
    });

    it('should return /pokemon-optimized/:name when URL ends with -optimized', () => {
      const router = TestBed.inject(Router);
      vi.spyOn(router, 'url', 'get').mockReturnValue('/some-path-optimized');

      const link = component.getPokemonLink('charmander');
      expect(link).toEqual(['/pokemon-optimized', 'charmander']);
    });

    it('should return /pokemon-bad/:name when URL ends with -bad', () => {
      const router = TestBed.inject(Router);
      vi.spyOn(router, 'url', 'get').mockReturnValue('/some-path-bad');

      const link = component.getPokemonLink('bulbasaur');
      expect(link).toEqual(['/pokemon-bad', 'bulbasaur']);
    });
  });
});
