class Deque<T> {
  private queue: T[];
  constructor() {
    this.queue = [];
  }

  // Time: O(1)
  pushBack(element: T): void {
    this.queue.push(element);
  }

  // Time: O(N)
  pushFront(element: T): void {
    this.queue = [element, ...this.queue];
  }

  // Time: O(N)
  popFront(): T {
    const element = this.queue.shift();
    return element;
  }

  // Time: O(1)
  popBack(): T {
    const element = this.queue.pop();
    return element;
  }

  // Time: O(1)
  front(): T {
    return this.queue[0];
  }

  // Time: O(1)
  back(): T {
    return this.queue[this.queue.length - 1];
  }

  // Time: O(1)
  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  // Time: O(1)
  clear(): void {
    this.queue = [];
  }

  at(pos: number): T {
    return this.queue[pos];
  }
}

export default Deque;
