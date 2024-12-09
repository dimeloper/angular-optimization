import { Component, Input } from '@angular/core';
import { NgForOf, UpperCasePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-pokemon-details',
  imports: [UpperCasePipe, NgForOf, MatCard, MatCardContent],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  @Input() pokemon: any;
}
