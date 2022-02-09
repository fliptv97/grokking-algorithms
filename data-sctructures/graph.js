export class Graph {
  #vertices = [];
  #edges = [];

  constructor(vertices, edges) {
    this.#vertices = vertices;
    this.#edges = edges;
  }

  get vertices() {
    return this.#vertices;
  }

  get edges() {
    return this.#edges;
  }

  getWeight(source, destination) {
    const edge = this.#edges.find(
      edge => edge.source === source && edge.destination === destination
    );

    if (edge) {
      return edge.weight;
    }

    return null;
  }

  getNeighbors(vertice) {
    const neighbors = [];

    for (const edge of this.#edges) {
      if (edge.source === vertice && !neighbors.includes(edge.destination)) {
        neighbors.push(edge.destination);
      }
    }

    return neighbors;
  }
}
