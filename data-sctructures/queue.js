export class Queue {
  #value = [];

  enqueue(...values) {
    this.#value.push(...values);
  }

  dequeue() {
    return this.#value.shift();
  }

  isEmpty() {
    return this.#value.length == 0;
  }

  reverse(numberOfElementsToReverse) {
    if (
      isNumber(numberOfElementsToReverse) &&
      inRange(numberOfElementsToReverse, 0, this.#value.length - 1)
    ) {
      this.#value = this.#value
        .slice(0, numberOfElementsToReverse)
        .reverse()
        .concat(this.#value.slice(numberOfElementsToReverse));
    } else {
      this.#value.reverse();
    }
  }

  sort(compareFn) {
    this.#value.sort(compareFn);
  }

  toString() {
    return this.#value.join(', ');
  }
}
