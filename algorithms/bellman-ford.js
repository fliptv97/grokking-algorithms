import { Graph } from '../data-sctructures/graph.js';

export function bellmanFord(graph, source) {
  const distance = {};
  const predecessor = {};

  // Step 1: initialize graph
  for (const vertice of graph.vertices) {
    // Initialize the distance to all vertices to infinity
    distance[vertice] = Infinity;
    // And having a null predecessor
    predecessor[vertice] = null;
  }

  // The distance from the source to itself is, of course, zero
  distance[source] = 0;

  // Step 2: Telax edges repeatedly
  for (let i = 0; i < graph.vertices.length; i++) {
    for (const edge of graph.edges) {
      if (distance[edge.from] + edge.weight < distance[edge.to]) {
        distance[edge.to] = distance[edge.from] + edge.weight;
        predecessor[edge.to] = edge.from;
      }
    }
  }

  // Step 3: Сheck for negative-weight cycles
  for (const edge in graph.edges) {
    if (distance[edge.from] + edge.weight < distance[edge.to]) {
      throw new Error('Graph contains a negative-weight cycle');
    }
  }

  return {
    distance,
    predecessor
  };
}

const graph = new Graph(
  ['S', 'V1', 'V2', 'V3', 'V4'],
  [
    { from: 'S', to: 'V1', weight: 9 },
    { from: 'S', to: 'V2', weight: 3 },
    { from: 'V1', to: 'V2', weight: 6 },
    { from: 'V1', to: 'V4', weight: 2 },
    { from: 'V2', to: 'V1', weight: 2 },
    { from: 'V2', to: 'V3', weight: 1 },
    { from: 'V3', to: 'V2', weight: 2 },
    { from: 'V3', to: 'V4', weight: 2 }
  ]
);

// const graph = new Graph(
//   ['A', 'B', 'C', 'D', 'E'],
//   [
//     { from: 'A', to: 'B', weight: -3 },
//     { from: 'B', to: 'C', weight: 1 },
//     { from: 'C', to: 'D', weight: 1 },
//     { from: 'D', to: 'E', weight: 1 }
//   ]
// );

console.dir(bellmanFord(graph, 'S'));
