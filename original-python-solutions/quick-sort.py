# O(n log n)
def quick_sort(arr):
  if len(arr) < 2:
    return arr

  pivot = arr[0]
  less_than_pivot = [i for i in arr[1:] if i <= pivot]
  greater_than_pivot = [i for i in arr[1:] if i > pivot]

  return quick_sort(less_than_pivot) + [pivot] + quick_sort(greater_than_pivot)

assert quick_sort([10, 5, 2, 3]) == [2, 3, 5, 10]
