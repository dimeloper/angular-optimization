import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService, Pokemon } from './pokemon.service';
import { firstValueFrom } from 'rxjs';
import { vi } from 'vitest';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Pokémon details successfully', async () => {
    const mockResponse: Pokemon = {
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: {
        front_default: 'https://example.com/pikachu.png',
      },
    };

    const promise = service.fetchPokemonDetails('pikachu');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const result = await promise;

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when the fetch fails', async () => {
    const promise = service.fetchPokemonDetails('missingno');

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/missingno'
    );
    expect(req.request.method).toBe('GET');
    req.flush(
      { message: 'Not found' },
      { status: 404, statusText: 'Not Found' }
    );

    try {
      await promise;
      throw new Error('Expected fetch to throw, but it did not');
    } catch (error: any) {
      expect(error.message).toMatch(/404/);
    }
  });

  it('should emit Pokémon list through pokemonList$ when listParams is updated', async () => {
    const mockListResponse = {
      count: 1,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockListResponse,
    } as Response);

    // Trigger resource() to react to param change
    service.updateListParams(1, 0);
    service.pokemonList.value(); // trigger the resource loader

    const result = await firstValueFrom(service.pokemonList$);
    expect(result).toEqual(mockListResponse);

    // Cleanup
    fetchSpy.mockRestore();
  });
});
