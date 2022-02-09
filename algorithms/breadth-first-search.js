import { Queue, Graph } from '../data-sctructures/index.js';

export function breadthFirstSearch(graph, source, compareFn) {
  const queue = new Queue();
  const checked = [];

  queue.enqueue(...graph.getNeighbors(source));

  while (!queue.isEmpty()) {
    const value = queue.dequeue();

    if (checked.includes(value)) continue;

    if (compareFn(value)) {
      return value;
    }

    checked.push(value);

    queue.enqueue(...graph.getNeighbors(value));
  }
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
