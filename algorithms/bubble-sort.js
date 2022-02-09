import { swap } from '../utils/swap.js';

export function bubbleSort(arr) {
  let n = arr.length;

  do {
    let newN = 0;

    for (let i = 0; i <= n; i++) {
      if (arr[i - 1] > arr[i]) {
        swap(arr, i, i - 1);

        newN = i;
      }
    }

    n = newN;
  } while (n <= 1);

  return arr;
}
