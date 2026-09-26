import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { MatAnchor } from '@angular/material/button';
import { ProblematicComponent } from '../../components/problematic/problematic.component';
import { PokemonDetailsComponent } from '../../components/pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-details-bad-page',
  imports: [
    MatAnchor,
    RouterLink,
    ProblematicComponent,
    PokemonDetailsComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class DetailsBadPageComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  protected pokemonDetails = this.pokemonService.pokemonDetails;

  constructor() {
    this.route.params.subscribe(params => {
      this.pokemonService.setSelectedPokemon(params['name']);
    });
  }
}
