import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailsComponent } from '../../components/pokemon-details/pokemon-details.component';
import { MatAnchor } from '@angular/material/button';
import { ProblematicComponent } from '../../components/problematic/problematic.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    PokemonDetailsComponent,
    MatAnchor,
    RouterLink,
    ProblematicComponent,
    NgOptimizedImage,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [
    provideImgixLoader('https://ng-pokedex-optimization.netlify.app/'),
  ],
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
