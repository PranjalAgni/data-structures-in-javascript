// Plan
// [x] User can create a instance of CustomMap
// [x] Key can be "string" | "number"
// [x] hashFunction with Linkedlist support

class LinkedListNode<Key, Value> {
  public key: Key;
  public data: Value;
  public next: LinkedListNode<Key, Value>;

  constructor(key: Key, data: Value) {
    this.key = key;
    this.data = data;
    this.next = null;
  }
}

class LinkedList<Key, Value> {
  public head: LinkedListNode<Key, Value>;
  public tail: LinkedListNode<Key, Value>;

  constructor() {
    this.head = null;
    this.tail = null;
  }
}

class CustomMap<Key, Value> {
  private readonly hashTable: Array<LinkedList<Key, Value> | null>;
  private readonly HASH_TABLE_SIZE: number;
  constructor() {
    this.HASH_TABLE_SIZE = 5;
    this.hashTable = Array.from(
      { length: this.HASH_TABLE_SIZE },
      () => new LinkedList<Key, Value>()
    );
  }

  private hashFunction(key: Key): number {
    // trimming type to string only.
    const stringInput: string = key.toString();
    let keyWeight = 0;
    for (let idx = 0; idx < stringInput.length; idx++) {
      keyWeight =
        (keyWeight + stringInput.charCodeAt(idx)) % this.HASH_TABLE_SIZE;
    }

    return keyWeight;
  }

  private getLinkedListNode(
    key: Key,
    value: Value
  ): LinkedListNode<Key, Value> {
    const linkedListNode = new LinkedListNode<Key, Value>(key, value);
    return linkedListNode;
  }

  private appendToLinkedList(
    tail: LinkedListNode<Key, Value>,
    nodeToInsert: LinkedListNode<Key, Value>
  ) {
    tail.next = nodeToInsert;
    return nodeToInsert;
  }

  private searchInLinkedList(head: LinkedListNode<Key, Value>, key: Key) {
    let runnerNode = head;
    while (runnerNode !== null) {
      if (runnerNode.key === key) return runnerNode;
      runnerNode = runnerNode.next;
    }
    return null;
  }

  private remveNodeFromLinkedList(
    linkedlist: LinkedList<Key, Value>,
    targetNode: LinkedListNode<Key, Value>
  ) {
    if (linkedlist.head === targetNode) {
      linkedlist.head = linkedlist.head.next;
    } else {
      let prevNode = null;
      let runnerNode = linkedlist.head;
      while (runnerNode !== null && runnerNode !== targetNode) {
        prevNode = runnerNode;
        runnerNode = runnerNode.next;
      }

      if (!prevNode.next) {
        prevNode.next = null;
        linkedlist.tail = prevNode;
      } else {
        prevNode.next = prevNode.next.next;
      }
    }
  }

  put(key: Key, value: Value): void {
    const keyIdx = this.hashFunction(key);
    console.log("Using index as = ", keyIdx);
    const linkedList = this.hashTable[keyIdx];

    const currentNode = this.getLinkedListNode(key, value);
    if (!linkedList.head) {
      linkedList.head = currentNode;
      linkedList.tail = currentNode;
      console.log("Head insertion");
    } else {
      console.log("Tail insertion");
      linkedList.tail = this.appendToLinkedList(linkedList.tail, currentNode);
    }

    this.hashTable[keyIdx] = linkedList;
  }

  get(key: Key): Value {
    const keyIdx = this.hashFunction(key);
    const linkedList = this.hashTable[keyIdx];
    if (!linkedList) return null;
    const targetNode = this.searchInLinkedList(linkedList.head, key);
    return targetNode ? targetNode.data : null;
  }

  remove(key: Key): void {
    const keyIdx = this.hashFunction(key);
    const linkedList = this.hashTable[keyIdx];
    if (!linkedList) return;
    const targetNode = this.searchInLinkedList(linkedList.head, key);
    if (!targetNode) return;
    this.remveNodeFromLinkedList(linkedList, targetNode);
  }
}

export default CustomMap;
