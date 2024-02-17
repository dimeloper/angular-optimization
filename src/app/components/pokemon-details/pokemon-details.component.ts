import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { NgForOf, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.pokemonService.getPokemonDetailsByName(name).subscribe(details => {
        this.pokemon = details;
      });
    });
  }
}
