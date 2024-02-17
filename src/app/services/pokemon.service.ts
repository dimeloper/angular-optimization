import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number, offset: number) {
    return this.http.get(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetailsByName(name: string) {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonDetailsByUrl(url: string) {
    return this.http.get(url);
  }
}
