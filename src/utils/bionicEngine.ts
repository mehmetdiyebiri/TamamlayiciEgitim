export interface BionicWord {
  prefix: string;
  suffix: string;
  full: string;
}

export function formatBionicText(text: string): BionicWord[] {
  const words = text.split(/(\s+)/); // Boşlukları ve kelimeleri ayır
  return words.map(word => {
    if (/^\s+$/.test(word)) {
      return { prefix: '', suffix: word, full: word };
    }
    const len = word.length;
    let highlightLen = 1;
    if (len >= 4 && len <= 6) highlightLen = 2;
    else if (len >= 7 && len <= 9) highlightLen = 3;
    else if (len >= 10) highlightLen = Math.ceil(len * 0.35);

    return {
      prefix: word.slice(0, highlightLen),
      suffix: word.slice(highlightLen),
      full: word
    };
  });
}
