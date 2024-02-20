import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgIf,
    NgForOf,
    RouterLink,
    MatAnchor,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  @Input() pokemon: any;
}
