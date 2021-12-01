class KMP {
  private text: string;
  private pattern: string;

  constructor(text: string, pattern: string) {
    this.text = text;
    this.pattern = pattern;
  }

  computeLPSArray(): number[] {
    const N = this.pattern.length;
    const lps: number[] = new Array(N).fill(0);
    let idx = 1;
    let len = 0;

    while (idx < N) {
      if (this.pattern[idx] === this.pattern[len]) {
        lps[idx] = len + 1;
        idx += 1;
        len += 1;
      } else {
        if (len != 0) len = lps[len - 1];
        else idx += 1;
      }
    }

    return lps;
  }
}

const kmp = new KMP("baaabaacaabaa", "aaabaacaabaa");

const lps = kmp.computeLPSArray();
console.log(lps);

export default KMP;

// aaabaacaabaa
// a {} {a }0
// aa {a} {a, aa} 1
// aaa {a, aa} {a, aa, aaa} 2
// aaab {a, aa, aaa} {b, ab, aab, aaab} 0
// aaaba {a, aa, aaa, aaab} {a, ba, aba, aaba} 1
