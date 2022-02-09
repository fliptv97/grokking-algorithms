export function swap(arr, i, j) {
  const temp = arr[j];

  arr[j] = arr[i];
  arr[i] = temp;
}
