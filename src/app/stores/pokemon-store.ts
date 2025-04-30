import { inject, computed, effect } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
  type,
} from '@ngrx/signals';
import { withEntities, setEntities } from '@ngrx/signals/entities';
import { PokemonService, Pokemon } from '../services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export interface PokemonListItem {
  id: string;
  name: string;
  image: string;
}

export const PokemonStore = signalStore(
  withState({
    isLoading: false,
    limit: 20,
    offset: 0,
  }),

  withEntities({
    entity: type<PokemonListItem>(),
    collection: 'pokemonList',
  }),

  withEntities({
    entity: type<Pokemon & { id: string }>(),
    collection: 'pokemonDetails',
  }),

  withMethods((store, service = inject(PokemonService)) => {
    const fetchPokemonListOnce = async () => {
      if (store.pokemonListEntities().length > 0) return;

      patchState(store, { isLoading: true });

      // Trigger the resource loader by updating params
      service.updateListParams(store.limit(), store.offset());

      // ✅ Wait for the RxJS stream to emit the result
      try {
        const resourceValue = await firstValueFrom(service.pokemonList$);

        const baseList = resourceValue as {
          results: Array<{ name: string; url: string }>;
        };

        if (!baseList?.results) {
          patchState(store, { isLoading: false });
          return;
        }

        const entities = baseList.results.map(item => ({
          id: item.name,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(item.url)}.png`,
        }));

        patchState(store, setEntities(entities, { collection: 'pokemonList' }));
      } catch (error) {
        console.error('[STORE] Error loading Pokémon list:', error);
      } finally {
        patchState(store, { isLoading: false });
      }
    };

    const fetchAndCachePokemonDetails = async (name: string) => {
      const cached = store.pokemonDetailsEntityMap()[name];
      if (cached) return cached;

      try {
        const raw = await service.fetchPokemonDetails(name);
        const entityWithId = { ...raw, id: raw.name };

        patchState(
          store,
          setEntities([entityWithId], { collection: 'pokemonDetails' })
        );
        return entityWithId;
      } catch (error) {
        console.error('[STORE] Error fetching details:', error);
        return null;
      }
    };

    return {
      fetchPokemonListOnce,
      fetchAndCachePokemonDetails,
    };
  }),

  withComputed(store => ({
    pokemonListItems: computed(() => store.pokemonListEntities()),
    pokemonDetailsMap: computed(() => store.pokemonDetailsEntityMap()),
  }))
);

function extractPokemonId(url: string): string {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match?.[1] ?? '0';
}
