# 1. Найти узел с наименьшей стоимостью
# 2. Проверить, существует ли более дешёвый путь к соседям этого
#    узла, и если существует, обновить их стоимость
# 3. Повторять, пока это не будет сделано для всех узлов графа
# 4. Вычислить итоговый путь

graph = {
  "start": {
    "a": 6,
    "b": 2
  },
  "a": {
    "finish": 1
  },
  "b": {
    "a": 3,
    "finish": 5
  },
  "finish": {}
}

infinity = float("inf")

costs = {
  "a": 6,
  "b": 2,
  "finish": infinity
}

parents = {
  "a": "start",
  "b": "start",
  "finish": None
}

processed = []

def find_lowest_cost_node(costs):
  lowest_cost = float("inf")
  lowest_cost_node = None

  for node in costs:
    cost = costs[node]

    if cost < lowest_cost and node not in processed:
      lowest_cost = cost
      lowest_cost_node = node

  return lowest_cost_node

# Поиск узла с наименьшией стоимостью среди необработанных
node = find_lowest_cost_node(costs)

while node is not None:
  cost = costs[node]
  neighbors = graph[node]

  # Цикл по всем соседям текущего узла
  for key in neighbors.keys():
    new_cost = cost + neighbors[key]

    # Если путь к соседу меньше через текущий узел...
    if costs[key] > new_cost:
      # ... нужно обновить стоимость для этого узла
      costs[key] = new_cost
      # Родителем соседа становится текущий узел
      parents[key] = node

  processed.append(node)

  node = find_lowest_cost_node(costs)

print(costs)
print(parents)
