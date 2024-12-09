import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailsComponent } from '../../components/pokemon-details/pokemon-details.component';
import { ProblematicComponent } from '../../components/problematic/problematic.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-details-optimized-page',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  imports: [
    PokemonDetailsComponent,
    ProblematicComponent,
    NgOptimizedImage,
    MatAnchor,
    RouterLink,
  ],
  providers: [
    provideImgixLoader('https://ng-pokedex-optimization.netlify.app/'),
  ],
})
export class DetailsOptimizedPageComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  protected pokemonDetails = this.pokemonService.pokemonDetails;

  constructor() {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.pokemonService.setSelectedPokemon(params['name']);
      }
    });
  }
}
