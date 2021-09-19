// import BidirectionalMap from "./lib/BidirectionalMap";

// const bidirectionalMap = new BidirectionalMap<unknown, string>();

// bidirectionalMap.set("ping", "pong");
// bidirectionalMap.set(1, "world");

// console.log(bidirectionalMap.getByKey("ping"));
// console.log(bidirectionalMap.getByKey(1));
// console.log(bidirectionalMap.hasValue("not-found"));

import CustomMap from "./lib/CustomMap";
const customMap = new CustomMap<string, unknown>();

// console.time("set a key");
// customMap.put("hello-world😃", "world");
// console.timeEnd("set a key");
// customMap.put("world", "hello");
// console.time("get a key");
// console.log(customMap.get("hello-world😃"));
// console.timeEnd("get a key");
// console.log(customMap.get("world"));

customMap.put("hello", "world");
customMap.put("pranjal", "agnihotri");
customMap.put("p1ranjal", "agnihotri");
customMap.put("p1r3njal", "agnihotri");
customMap.put("p1r3nja5l", "agnihotri");
console.log(customMap.get("p1r3njal"));
customMap.remove("p1r3njal");
console.log(customMap.get("p1r3njal"));
