// Plan
// [x] User can create a instance of CustomMap
// [x] Key can be "string" | "number"
// [x] hashFunction with Linkedlist support

class LinkedListNode<Key, Value> {
  public key: Key;
  public data: Value;
  public next: LinkedListNode<Key, Value>;

  constructor(mKey: Key, mData: Value) {
    this.key = mKey;
    this.data = mData;
    this.next = null;
  }
}

class CustomMap<Key, Value> {
  private readonly hashTable: Array<LinkedListNode<Key, Value> | null>;
  private readonly HASH_TABLE_SIZE: number;
  constructor() {
    this.HASH_TABLE_SIZE = 1000;
    this.hashTable = Array(this.HASH_TABLE_SIZE).fill(null);
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
    head: LinkedListNode<Key, Value>,
    nodeToInsert: LinkedListNode<Key, Value>
  ) {
    let runningNode = head;
    while (runningNode.next !== null) {
      runningNode = runningNode.next;
    }

    runningNode.next = nodeToInsert;
    return head;
  }

  private searchInLinkedList(head: LinkedListNode<Key, Value>, key: Key) {
    let runnerNode = head;
    while (runnerNode !== null) {
      if (runnerNode.key === key) return runnerNode.data;
      runnerNode = runnerNode.next;
    }
    return null;
  }

  put(key: Key, value: Value) {
    const keyIdx = this.hashFunction(key);
    let linkedListHead = this.hashTable[keyIdx];
    const currentNode = this.getLinkedListNode(key, value);
    if (!linkedListHead) {
      linkedListHead = currentNode;
    } else {
      linkedListHead = this.appendToLinkedList(linkedListHead, currentNode);
    }
    this.hashTable[keyIdx] = linkedListHead;
  }

  get(key: Key): Value {
    const keyIdx = this.hashFunction(key);
    const headNode = this.hashTable[keyIdx];
    if (!headNode) return null;
    return this.searchInLinkedList(headNode, key);
  }
}

export default CustomMap;
