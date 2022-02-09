def binary_search(list, item):
  # `low` and `high` are boundaries for search
  low = 0
  high = len(list) - 1

  # While it's not the same index
  while low <= high:
    # Get middle element index
    mid = int((low + high) / 2)
    guess = list[mid]

    # We found item
    if guess == item:
      return mid
    # Guess is bigger
    if guess > item:
      high = mid - 1
    # Guess is smaller
    else:
      low = mid + 1

  # We didn't find item
  return None

my_list = [1, 3, 5, 7, 9]

assert binary_search(my_list, 3) == 1
assert binary_search(my_list, -1) == None
