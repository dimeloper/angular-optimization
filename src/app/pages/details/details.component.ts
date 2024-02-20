import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailsComponent } from '../../components/pokemon-details/pokemon-details.component';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [PokemonDetailsComponent, MatAnchor, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class DetailsComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.pokemonService.getPokemonDetailsByName(name).subscribe(details => {
        this.pokemon = details;
      });
    });
  }
}
