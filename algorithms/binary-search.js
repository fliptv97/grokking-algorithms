// https://en.wikipedia.org/wiki/Binary_search_algorithm
export function binarySearch(arr, target) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0] === target;

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (arr[middle] === target) {
      return middle;
    }

    if (arr[middle] > target) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return null;
}
