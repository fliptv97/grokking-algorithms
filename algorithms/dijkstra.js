import { Graph } from '../data-sctructures/index.js';

export function dijkstra(graph, source) {
  const visited = [];

  const distance = {};
  const previous = {};

  for (const vertice of graph.vertices) {
    distance[vertice] = Infinity;
    previous[vertice] = null;
  }

  distance[source] = 0;

  let node = source;

  while (visited.length < graph.vertices.length) {
    // Get all neighbors, which wasn't already visited
    const unvisitedNeighbors = graph
      .getNeighbors(node)
      .filter(neighbor => !visited.includes(neighbor));

    // Get through all unvisited neighbors and check, if path from current node
    // is better, than their current
    for (const neighbor of unvisitedNeighbors) {
      const weight = graph.getWeight(node, neighbor);

      if (distance[node] + weight < distance[neighbor]) {
        distance[neighbor] = distance[node] + weight;
        previous[neighbor] = node;
      }
    }

    // Mark current node as visited
    visited.push(node);

    // Find unvisited node with smallest distance
    let minWeight = Infinity;
    let minNode = null;

    for (const key in distance) {
      if (visited.includes(key)) continue;

      if (distance[key] < minWeight) {
        minWeight = distance[key];
        minNode = key;
      }
    }

    node = minNode;
  }

  return { distance, previous };
}

const graph = new Graph(
  ['start', 'a', 'b', 'finish'],
  [
    { source: 'start', destination: 'a', weight: 6 },
    { source: 'start', destination: 'b', weight: 2 },
    { source: 'a', destination: 'finish', weight: 1 },
    { source: 'b', destination: 'a', weight: 3 },
    { source: 'b', destination: 'finish', weight: 5 }
  ]
);

const { distance, previous } = dijkstra(graph, 'start');

console.log(distance);
console.log(previous);
