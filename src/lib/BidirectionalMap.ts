class BidirectionalMap<Key, Value> {
  private readonly map: Map<Key, Value>;
  private readonly inverseMap: Map<Value, Key>;
  constructor() {
    // initalize our maps
    this.map = new Map();
    this.inverseMap = new Map();
  }

  getByKey(key: Key): Value {
    return this.map.get(key);
  }

  set(key: Key, value: Value) {
    this.map.set(key, value);
    this.inverseMap.set(value, key);
  }

  getByValue(value: Value) {
    return this.inverseMap.get(value);
  }

  hasKey(key: Key) {
    return this.map.has(key);
  }

  hasValue(value: Value) {
    return this.inverseMap.has(value);
  }

  deleteByKey(key: Key) {
    if (!this.hasKey(key)) return;
    const value: Value = this.map.get(key);
    this.delete(key, value);
  }

  deleteByValue(value: Value) {
    if (!this.hasValue(value)) return;
    const key: Key = this.inverseMap.get(value);
    this.delete(key, value);
  }

  private delete(key: Key, value: Value) {
    this.map.delete(key);
    this.inverseMap.delete(value);
  }
}

export default BidirectionalMap;
