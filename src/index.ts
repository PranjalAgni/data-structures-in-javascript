import BidirectionalMap from "./lib/BidirectionalMap";

const bidirectionalMap = new BidirectionalMap<unknown, string>();

bidirectionalMap.set("ping", "pong");
bidirectionalMap.set(1, "world");

console.log(bidirectionalMap.getByKey("ping"));
console.log(bidirectionalMap.getByKey(1));
console.log(bidirectionalMap.hasValue("not-found"));
