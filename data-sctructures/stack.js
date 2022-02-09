export class Stack {
  #value = [];

  push(value) {
    this.#value.push(value);
  }

  pop() {
    return this.#value.pop();
  }

  isEmpty() {
    return this.#value.length === 0;
  }
}
