# O(n^2)
def find_smallest(arr):
  index_of_smallest = 0;

  for i in range(1, len(arr)):
    if arr[i] < arr[index_of_smallest]:
      index_of_smallest = i;

  return index_of_smallest

def selection_sort(arr):
  result_arr = []

  for i in range(len(arr)):
    index_of_smallest = find_smallest(arr)

    result_arr.append(arr.pop(index_of_smallest))

  return result_arr

assert selection_sort([5, 3, 6, 2, 10]) == [2, 3, 5, 6, 10]
