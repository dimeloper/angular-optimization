import { computed, Injectable, resource, signal } from '@angular/core';

export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  // Add other properties as needed
}

export interface BasePokemonItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Array<BasePokemonItem>;
}

interface PokemonListWithDetailsItem {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  private listParams = signal({ limit: 20, offset: 0 });
  private selectedPokemonName = signal<string>('');

  pokemonList = resource<
    PokemonListResponse,
    { limit: number; offset: number }
  >({
    request: this.listParams,
    loader: async params => {
      const { limit, offset } = params.request;
      const response = await fetch(
        `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
        { signal: params.abortSignal }
      );
      return (await response.json()) as PokemonListResponse;
    },
  });

  pokemonDetails = resource<Pokemon, string>({
    request: this.selectedPokemonName,
    loader: async params => {
      const name = params.request;
      if (!name) throw new Error('No Pokemon name provided');

      try {
        const response = await fetch(
          `${this.baseUrl}/pokemon/${name.toLowerCase()}`,
          { signal: params.abortSignal }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Pokemon: ${response.status} ${response.statusText}`
          );
        }

        return (await response.json()) as Pokemon;
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        throw new Error(
          'Unable to fetch Pokemon details. Please try again later.'
        );
      }
    },
  });

  pokemonListWithDetails = resource<
    PokemonListWithDetailsItem[],
    BasePokemonItem[]
  >({
    request: computed(() => this.pokemonList.value()?.results ?? []),
    loader: async params => {
      const pokemonUrls = params.request;
      try {
        const details = await Promise.all(
          pokemonUrls.map(async ({ url }) => {
            const response = await fetch(url, { signal: params.abortSignal });

            if (!response.ok) {
              throw new Error(
                `Failed to fetch Pokemon details from ${url}: ${response.status} ${response.statusText}`
              );
            }

            const data = (await response.json()) as Pokemon;
            return {
              name: data.name,
              image: data.sprites.front_default,
            };
          })
        );
        return details;
      } catch (error) {
        console.error('Error fetching Pokemon list with details:', error);
        throw new Error(
          'Unable to fetch Pokemon list with details. Please try again later.'
        );
      }
    },
  });

  updateListParams(limit: number, offset: number) {
    this.listParams.set({ limit, offset });
  }

  setSelectedPokemon(name: string) {
    this.selectedPokemonName.set(name);
  }
}
