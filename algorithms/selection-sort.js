import { swap } from '../utils/index.js';

// https://en.wikipedia.org/wiki/Selection_sort
export function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        swap(arr, i, j);
      }
    }
  }

  return arr;
}
