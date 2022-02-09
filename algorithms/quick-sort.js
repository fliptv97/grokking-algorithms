// https://en.wikipedia.org/wiki/Quicksort
export function quickSort(arr) {
  if (arr.length < 2) return arr;

  const pivotIndex = Math.floor(arr.length / 2);

  const lessThanPivot = [];
  const greaterThanPivot = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;

    if (arr[i] > arr[pivotIndex]) {
      greaterThanPivot.push(arr[i]);
    } else {
      lessThanPivot.push(arr[i]);
    }
  }

  return quickSort(lessThanPivot).concat(arr[pivotIndex]).concat(quickSort(greaterThanPivot));
}
