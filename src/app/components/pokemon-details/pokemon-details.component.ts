import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-pokemon-details',
  imports: [UpperCasePipe, MatCard, MatCardContent],
  templateUrl: './pokemon-details.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  readonly pokemon = input<any>();
}
