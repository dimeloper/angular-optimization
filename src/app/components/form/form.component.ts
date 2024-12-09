import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    MatButton,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  public favouritePokemon = 'pikachu';

  ngOnInit() {
    this.performHeavyTasks();
  }

  performHeavyTasks() {
    // Function to check if a number is prime
    const isPrime = (num: number): boolean => {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    };

    // Compute prime numbers up to a specified limit (e.g., 1000000)
    const limit = 10000000;
    const primes = [];
    for (let num = 2; num <= limit; num++) {
      if (isPrime(num)) {
        primes.push(num);
      }
    }

    console.log(
      `=== FORM: Found ${primes.length} prime numbers up to ${limit}`
    );

    this.favouritePokemon = this.favouritePokemon + primes.length;
  }

  onNoClick(): void {
    console.log('nothing');
  }
}
