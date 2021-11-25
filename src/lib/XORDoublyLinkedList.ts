import BidirectionalMap from "./BidirectionalMap";

class XORDLLNode {
  public value: number;
  public xorAddressValue: number;

  constructor(value: number, xorAddressValue: number) {
    this.value = value;
    this.xorAddressValue = xorAddressValue;
  }
}

class XORDoublyLinkedList {
  private head: XORDLLNode;
  private addressMap: BidirectionalMap<XORDLLNode, number>;
  constructor() {
    this.head = null;
    this.addressMap = new BidirectionalMap<XORDLLNode, number>();
  }

  createNode(value: number): XORDLLNode {
    const newNode: XORDLLNode = new XORDLLNode(value, null);
    return newNode;
  }

  getAddressValueFromNode(node: XORDLLNode): number {
    return this.addressMap.hasKey(node) ? this.addressMap.getByKey(node) : 0;
  }

  getNodeFromAddressValue(value: number): XORDLLNode {
    return this.addressMap.hasValue(value)
      ? this.addressMap.getByValue(value)
      : null;
  }

  computeXOR(nodeA: XORDLLNode, nodeB: XORDLLNode): number {
    const addressNodeA = this.getAddressValueFromNode(nodeA);
    const addressNodeB = this.getAddressValueFromNode(nodeB);
    if (!addressNodeA && !addressNodeB)
      throw new Error("Both the nodes are null");
    console.log(`Operation =  ${addressNodeA} ^ ${addressNodeB}`);
    return addressNodeA ^ addressNodeB;
  }

  insert(value: number): void {
    const newNode = this.createNode(value);

    /**
     * n2 = {2, addr(0)} *head
     * {n2: 1}
     *
     * n5 = {5, addr(n2)}
     * {n2: 1, n5: 2}
     */
    const addressValue: number = this.addressMap.size() + 1;
    this.addressMap.set(newNode, addressValue);

    newNode.xorAddressValue = this.getAddressValueFromNode(this.head);
    console.log("Next node address = ", newNode.xorAddressValue);

    if (this.head !== null) {
      const currentHead = this.head;
      const nextNode = this.getNodeFromAddressValue(
        currentHead.xorAddressValue
      );

      if (nextNode) {
        const currentHeadXORAddress = this.computeXOR(newNode, nextNode);
        currentHead.xorAddressValue = currentHeadXORAddress;
        this.addressMap.set(
          currentHead,
          this.getAddressValueFromNode(currentHead)
        );
        this.addressMap.set(nextNode, currentHeadXORAddress);
      }
    }

    this.head = newNode;
  }

  printAddressMap(): void {
    this.addressMap.map.forEach((value, key) => {
      console.log(JSON.stringify(key) + " = " + value);
    });
  }

  print(): void {
    console.log("===============");
    let previousNode: XORDLLNode = null;
    let nextNode: XORDLLNode = null;
    let current: XORDLLNode = this.head;

    const valuesList = [];
    while (current != null) {
      valuesList.push(current.value);
      nextNode = this.getNodeFromAddressValue(
        this.computeXOR(
          previousNode,
          this.getNodeFromAddressValue(current.xorAddressValue)
        )
      );

      previousNode = current;
      current = nextNode;
    }

    console.log(valuesList);
  }
}

const xorDLL = new XORDoublyLinkedList();

xorDLL.insert(2);
xorDLL.insert(5);
// xorDLL.insert(7);

xorDLL.printAddressMap();
xorDLL.print();
export default XORDoublyLinkedList;
