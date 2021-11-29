class KMP {
  private text: string;
  private pattern: string;

  constructor(text: string, pattern: string) {
    this.text = text;
    this.pattern = pattern;
  }

  getLongestCommonPrefix(prefix: string[], suffix: string[]): string {
    const map = new Map<string, number>();
    let longestLen = 0;
    let longestWord = "";

    for (const word of prefix) {
      map.set(word, 1);
    }

    for (const word of suffix) {
      if (map.has(word)) {
        if (word.length > longestLen) {
          longestLen = word.length;
          longestWord = word;
        }
      }
    }

    return longestWord;
  }
  computeLPSArray(): number[] {
    const N = this.pattern.length;
    const lps: number[] = Array.from({ length: N }, () => 0);
    const lpsWord: string[] = Array.from({ length: N }, () => "");
    const properPrefix = [];
    let suffix = [];
    let suffixMap = new Map<string, number>();
    let currentPrefix = "";
    let currentSuffix = "";
    for (let idx = 0; idx < N; idx++) {
      if (idx - 1 >= 0) {
        currentPrefix += this.pattern[idx - 1];
        properPrefix.push(currentPrefix);
      }

      currentSuffix = "";
      suffix = [];
      suffixMap = new Map<string, number>();

      // compute suffixes
      for (let jdx = idx; jdx >= 0; jdx--) {
        currentSuffix = this.pattern[jdx] + currentSuffix;
        if (!suffixMap.has(currentSuffix)) suffix.push(currentSuffix);
        suffixMap.set(currentSuffix, 1);
      }

      lpsWord[idx] = this.getLongestCommonPrefix(properPrefix, suffix);
      lps[idx] = lpsWord[idx].length;
    }

    // console.log(properPrefix);
    console.log(lpsWord);
    return lps;
  }
}

const kmp = new KMP("baaabaacaabaa", "aabaacaabaa");

const lps = kmp.computeLPSArray();
console.log(lps);

export default KMP;
