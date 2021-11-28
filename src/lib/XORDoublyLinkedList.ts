import * as crypto from "crypto";

/* eslint-disable no-console */
/**
 * You can't implement a proper XOR linked list in JavaScript, because you can't access an object's memory address.

  There's not really a practical reason to do this in JavaScript, either. From what I understand, the only benefit of an XOR linked list is a slightly reduced memory footprint. The amount of memory you would save with such a structure in JavaScript is offset by the overhead of the objects themselves.
 */
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
  private addressMap: Map<XORDLLNode, number>;
  private valueMap: Map<number, XORDLLNode>;

  constructor() {
    this.head = null;
    this.addressMap = new Map<XORDLLNode, number>();
    this.valueMap = new Map<number, XORDLLNode>();
  }

  createNode(value: number): XORDLLNode {
    const newNode: XORDLLNode = new XORDLLNode(value, null);
    return newNode;
  }

  generateAddress(): number {
    return crypto.randomInt(2, 1000000);
  }
  getAddressValueFromNode(node: XORDLLNode): number {
    return this.addressMap.has(node) ? this.addressMap.get(node) : 0;
  }

  getNodeFromAddressValue(value: number): XORDLLNode {
    return this.valueMap.has(value) ? this.valueMap.get(value) : null;
  }

  computeXOR(nodeA: XORDLLNode, nodeB: XORDLLNode, isPrinting = false): number {
    const addressNodeA = this.getAddressValueFromNode(nodeA);
    const addressNodeB = this.getAddressValueFromNode(nodeB);
    if (!addressNodeA && !addressNodeB)
      throw new Error("Both the nodes are null");
    if (isPrinting)
      console.log(
        `Operation =  ${addressNodeA} ^ ${addressNodeB} = ${
          addressNodeA ^ addressNodeB
        }`
      );
    return addressNodeA ^ addressNodeB;
  }

  addNodeToMap(node: XORDLLNode, genAddressValue = 0): void {
    const addressValue = genAddressValue || this.generateAddress();
    // console.log({ addressValue, genAddressValue });
    this.addressMap.set(node, addressValue);
    this.valueMap.set(addressValue, node);
  }

  insert(value: number): void {
    const newNode = this.createNode(value);
    // add this node to Map, so address is generated
    this.addNodeToMap(newNode);

    // returns addressValue or 0 if head is NULL
    newNode.xorAddressValue = this.getAddressValueFromNode(this.head);

    if (this.head !== null) {
      const currentHead = this.head;
      const nextNode = this.getNodeFromAddressValue(
        currentHead.xorAddressValue
      );

      if (nextNode) {
        const nextNodeAddressValue = this.computeXOR(newNode, nextNode);

        // delete nextNode from addressMap and valueMap
        this.addressMap.delete(nextNode);
        this.valueMap.delete(currentHead.xorAddressValue);

        // recreate nextNode with nextNodeAddressValue address in addressMap and valueMap
        this.addNodeToMap(nextNode, nextNodeAddressValue);

        // delete head from addressMap and valueMap then add it back with nextNodeAddressValue should be attached on the head
        this.addressMap.delete(currentHead);
        this.valueMap.delete(newNode.xorAddressValue);

        currentHead.xorAddressValue = nextNodeAddressValue;
        this.addNodeToMap(currentHead, newNode.xorAddressValue);
      }
    }

    this.head = newNode;
  }

  printAddressMap(): void {
    console.log("===============");
    this.addressMap.forEach((value, key) => {
      console.log(JSON.stringify(key) + " = " + value);
    });
    console.log("===============");
  }

  print(): void {
    let previousNode: XORDLLNode = null;
    let nextNode: XORDLLNode = null;
    let current: XORDLLNode = this.head;

    const valuesList = [];
    while (current != null) {
      valuesList.push(current.value);
      nextNode = this.getNodeFromAddressValue(
        this.computeXOR(
          previousNode,
          this.getNodeFromAddressValue(current.xorAddressValue),
          true
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
xorDLL.insert(7);
xorDLL.insert(8);

xorDLL.printAddressMap();
xorDLL.print();
export default XORDoublyLinkedList;
