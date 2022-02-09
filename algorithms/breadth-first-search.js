import { Queue, Graph } from '../data-sctructures/index.js';

// https://en.wikipedia.org/wiki/Breadth-first_search
export function breadthFirstSearch(graph, source, compareFn) {
  const queue = new Queue();
  const visited = [source];

  queue.enqueue(source);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    if (compareFn(node)) {
      return node;
    }

    const neighbors = graph.getNeighbors(node);

    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);

        queue.enqueue(neighbor);
      }
    }
  }

  return false;
}

const graph = new Graph(
  ['you', 'alice', 'claire', 'anuj', 'peggy', 'josh'],
  [
    { source: 'you', destination: 'alice' },
    { source: 'you', destination: 'claire' },
    { source: 'alice', destination: 'anuj' },
    { source: 'alice', destination: 'peggy' },
    { source: 'claire', destination: 'peggy' },
    { source: 'claire', destination: 'josh' }
  ]
);

console.log(
  breadthFirstSearch(graph, 'you', node => node.endsWith('sh')),
  'is a mango seller!'
);
