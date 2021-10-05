class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;
  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

class Trie {
  private trieRoot: TrieNode;
  constructor() {
    this.trieRoot = new TrieNode();
  }

  characterToIndex(letter: string) {
    return letter.charCodeAt(0) - 97;
  }

  insert(word: string) {
    const N = word.length;
    let trieCrawler = this.trieRoot;
    for (let idx = 0; idx < N; idx++) {
      const letter: string = word[idx];
      if (!trieCrawler.children.has(letter)) {
        trieCrawler.children.set(letter, new TrieNode());
      }

      trieCrawler = trieCrawler.children.get(letter);
    }

    trieCrawler.isEndOfWord = true;
  }

  search(word: string): boolean {
    const N = word.length;
    let trieCrawler = this.trieRoot;
    for (let idx = 0; idx < N; idx++) {
      const letter = word[idx];
      if (!trieCrawler.children.has(letter)) return false;
      trieCrawler = trieCrawler.children.get(letter);
    }

    return trieCrawler.isEndOfWord;
  }

  private getNodeIfExist(word: string): TrieNode {
    const N = word.length;
    let trieCrawler = this.trieRoot;

    for (let idx = 0; idx < N; idx++) {
      const letter = word[idx];
      if (!trieCrawler.children.has(letter)) return null;
      trieCrawler = trieCrawler.children.get(letter);
    }

    return trieCrawler;
  }
  private autoCompleteHelper(
    trieCrawler: TrieNode,
    currentWord: string,
    autocompleted: string[]
  ) {
    if (!trieCrawler) return;
    if (trieCrawler.isEndOfWord) {
      autocompleted.push(currentWord);
    }

    const mapIterator = trieCrawler.children.entries();
    let current = mapIterator.next();
    while (!current.done) {
      const [letter, newTrieNode] = current.value;
      this.autoCompleteHelper(newTrieNode, currentWord + letter, autocompleted);

      current = mapIterator.next();
    }
  }
  autoComplete(word: string): string[] {
    const trieNode = this.getNodeIfExist(word);
    if (!trieNode) return [];
    const autocompleted: string[] = [];
    this.autoCompleteHelper(trieNode, word, autocompleted);
    return autocompleted;
  }
}

export default Trie;
