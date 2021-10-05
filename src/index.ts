// import BidirectionalMap from "./lib/BidirectionalMap";
import CustomMap from "./lib/CustomMap";
import Trie from "./lib/Trie";
// const bidirectionalMap = new BidirectionalMap<unknown, string>();

// bidirectionalMap.set("ping", "pong");
// bidirectionalMap.set(1, "world");

// console.log(bidirectionalMap.getByKey("ping"));
// console.log(bidirectionalMap.getByKey(1));
// console.log(bidirectionalMap.hasValue("not-found"));

// Time Complexity generally for get,put,remove its O(1)
// In worst case
// put: O(1)
// get: O(N)
// remove: O(N)
// const customMap = new CustomMap<string, unknown>();

// console.time("set a key");
// customMap.put("hello-world😃", "world");
// console.timeEnd("set a key");
// customMap.put("world", "hello");
// console.time("get a key");
// console.log(customMap.get("hello-world😃"));
// console.timeEnd("get a key");
// console.log(customMap.get("world"));

// customMap.put("hello", "world");
// customMap.put("pranjal", "agnihotri");
// customMap.put("p1ranjal", "agnihotri");
// customMap.put("p1r3njal", "agnihotri");
// customMap.put("p1r3nja5l", "agnihotri");
// console.log(customMap.get("hello"));
// customMap.remove("hello");
// console.log(customMap.get("hello"));

const trie = new Trie();

trie.insert("this");
trie.insert("current");
trie.insert("world");
trie.insert("cool");
trie.insert("java");
trie.insert("javascript");
trie.insert("javascriptshop");
trie.insert("javascriptlove");

// console.log(trie.search("World"));
// console.log(trie.search("hello"));
console.log(trie.autoComplete("java"));
