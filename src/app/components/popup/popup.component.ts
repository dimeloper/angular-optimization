import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

export interface DialogData {
  name: string;
  pokemon: string;
}

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatLabel,
    MatFormField,
    MatDialogActions,
    MatButton,
    FormsModule,
    MatInput,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

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

    // Compute prime numbers up to a specified limit (e.g., 100000)
    const limit = 100000;
    const primes = [];
    for (let num = 2; num <= limit; num++) {
      if (isPrime(num)) {
        primes.push(num);
      }
    }

    console.log(
      `=== POPUP: Found ${primes.length} prime numbers up to ${limit}`
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
