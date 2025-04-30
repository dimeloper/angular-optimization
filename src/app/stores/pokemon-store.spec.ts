import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
import { PokemonStore } from './pokemon-store';
import { PokemonService, Pokemon } from '../services/pokemon.service';

class MockPokemonService implements Partial<PokemonService> {
  updateListParams = vi.fn();
  fetchPokemonDetails = vi.fn().mockResolvedValue({
    name: 'pikachu',
    id: 'pikachu',
    height: 4,
    weight: 60,
    sprites: { front_default: 'https://img.pikachu.png' },
  });

  pokemonList$ = of({
    count: 1,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
  });
}

describe('PokemonStore', () => {
  let store: InstanceType<typeof PokemonStore>;
  let service: MockPokemonService;

  beforeEach(() => {
    service = new MockPokemonService();

    TestBed.configureTestingModule({
      providers: [PokemonStore, { provide: PokemonService, useValue: service }],
    });

    store = TestBed.inject(PokemonStore);
  });

  it('should initialize with correct default state', () => {
    expect(store.isLoading()).toBe(false);
    expect(store.limit()).toBe(20);
    expect(store.offset()).toBe(0);
  });

  it('should call updateListParams when fetching list', async () => {
    await store.fetchPokemonListOnce();

    expect(service.updateListParams).toHaveBeenCalledWith(20, 0);
  });

  it('should store Pokémon list from service observable', async () => {
    await store.fetchPokemonListOnce();

    const entities = store.pokemonListEntities();
    expect(entities.length).toBe(1);
    expect(entities[0].name).toBe('bulbasaur');
    expect(entities[0].id).toBe('bulbasaur');
    expect(entities[0].image).toContain('/1.png');
  });

  it('should cache Pokémon details after fetching', async () => {
    const result = await store.fetchAndCachePokemonDetails('pikachu');

    const cached = store.pokemonDetailsEntityMap()['pikachu'];
    expect(result).toEqual(cached);
    expect(cached?.name).toBe('pikachu');
    expect(service.fetchPokemonDetails).toHaveBeenCalledTimes(1);
  });

  it('should return cached Pokémon details if already fetched', async () => {
    // First fetch - should call service
    const first = await store.fetchAndCachePokemonDetails('pikachu');
    // Second fetch - should return from cache
    const second = await store.fetchAndCachePokemonDetails('pikachu');

    expect(second).toBe(first);
    expect(service.fetchPokemonDetails).toHaveBeenCalledTimes(1);
  });

  it('should return undefined for a non-existent Pokémon', () => {
    const details = store.pokemonDetailsMap()['mewtwo'];
    expect(details).toBeUndefined();
  });
});
