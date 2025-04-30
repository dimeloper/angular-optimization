import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonStore } from '../../stores/pokemon-store';
import { PokemonDetailsComponent } from '../../components/pokemon-details/pokemon-details.component';
import { ProblematicComponent } from '../../components/problematic/problematic.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private store = inject(PokemonStore);

  private routeParams = toSignal(this.route.params, { initialValue: {} });

  protected pokemon = computed(() => {
    const name = (this.routeParams() as any)['name'];
    if (!name) return null;
    return this.store.pokemonDetailsMap()[name] ?? null;
  });

  constructor() {
    effect(() => {
      const params = this.routeParams();
      const name = params && 'name' in params ? params['name'] : null;

      if (name) {
        this.store.fetchAndCachePokemonDetails(name);
      }
    });
  }
}
