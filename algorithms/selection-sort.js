export function selectionSort(arr) {
  const result = [];

  for (let i = 0, slice = arr.slice(); i < arr.length; i++) { 
    let indexOfSmallest = 0;

    for (let j = 0; j < slice.length; j++) {
      if (slice[j] < slice[indexOfSmallest]) {
        indexOfSmallest = j;
      }
    }

    result.push(slice[indexOfSmallest]);

    slice = slice.filter((_, index) => index !== indexOfSmallest);
  }

  return result;
}
