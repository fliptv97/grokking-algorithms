export function binarySearch(arr, item) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0] === item;

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.round((low + high) / 2);

    if (arr[mid] === item) {
      return mid;
    }

    if (arr[mid] > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}
