/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const expiryProperty = "expiry";

interface Entry {
  [key: string]: any;
}

const expiryMap = <K = any, V = Entry>(map: Map<K, V>) => {
  for (const entry of map) {
    const value = entry[1] as Record<string, any>;
    if (expiryProperty in value) {
      setTimeout(
        (entry) => {
          map.delete(entry[0]);
        },
        value[expiryProperty] as number,
        entry
      );
    }
  }

  const printMap = () => {
    for (const entry of map) {
      console.log(JSON.stringify(entry));
    }

    console.log("*=========*");
  };

  setTimeout(() => {
    printMap();
  }, 500);

  setTimeout(() => {
    printMap();
  }, 1500);
};

const exampleMap = new Map([
  ["key1", { data: "value1", expiry: 1000 }],
  ["key2", { data: "value2" }],
  ["key3", { data: "value2", expiry: 2000 }]
]);

console.log(expiryMap(exampleMap));
