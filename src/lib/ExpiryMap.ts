/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Entry {
  [key: string]: any;
}
class ExpiryMap<K = any, V = Entry> {
  private readonly expiryProperty = "expiry";

  private printMap(map: Map<K, V>) {
    for (const entry of map) {
      console.log(JSON.stringify(entry));
    }

    console.log("*=========*");
  }
  public removeKeysAfterTimeout(map: Map<K, V>) {
    for (const entry of map) {
      const value = entry[1] as Record<string, any>;
      if (this.expiryProperty in value) {
        setTimeout(
          (entry) => {
            map.delete(entry[0]);
          },
          value[this.expiryProperty] as number,
          entry
        );
      }
    }

    setTimeout(() => {
      this.printMap(map);
    }, 500);

    setTimeout(() => {
      this.printMap(map);
    }, 1500);
  }
}

const exampleMap = new Map([
  ["key1", { data: "value1", expiry: 1000 }],
  ["key2", { data: "value2" }],
  ["key3", { data: "value2", expiry: 2000 }],
  ["key4", { data: "value4", expiry: 1500 }]
]);

new ExpiryMap().removeKeysAfterTimeout(exampleMap);
