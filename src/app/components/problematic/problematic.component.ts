import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-problematic',
  imports: [NgForOf],
  templateUrl: './problematic.component.html',
  styleUrl: './problematic.component.scss',
})
export class ProblematicComponent implements OnInit, AfterViewInit {
  largeImages = [
    'https://static.vecteezy.com/system/resources/previews/024/625/582/non_2x/cute-yellow-mouse-character-background-free-vector.jpg',
    'https://wallpapers-clan.com/wp-content/uploads/2023/10/cute-pikachu-flowers-pokemon-desktop-wallpaper-preview.jpg',
  ];
  dynamicContent = [5, 4, 2, 3, 1];

  ngOnInit() {
    this.performHeavyTasks();
  }

  ngAfterViewInit() {
    const result = this.processData(this.dynamicContent);
    console.log(`=== PROBLEMATIC: Bubble sort Result: ${result}`);
  }

  performHeavyTasks() {
    // Inefficient calculation of Fibonacci numbers
    const fibonacci = (n: number): number => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    // Intentionally perform this calculation for a high value to block the main thread
    const result = fibonacci(40); // This is highly inefficient and blocks the main thread
    console.log(`=== PROBLEMATIC: Fibonacci Result: ${result}`);
  }

  processData(item: any) {
    // Assume `item` is an array of numbers that needs complex processing
    // For demonstration, we'll sort the array using a very inefficient sorting algorithm, like bubble sort

    const bubbleSort = (arr: number[]) => {
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            // Swapping the elements
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      return arr;
    };

    return bubbleSort(item);
  }
}
