export interface Token {
  value: string;
  type: 'word' | 'number' | 'punctuation' | 'whitespace';
  position: number;
}

export class Tokenizer {
  private static readonly PATTERNS = {
    word: /[a-zA-Z]+/,
    number: /\d+/,
    punctuation: /[.,!?;]/,
    whitespace: /\s+/
  };

  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let currentPosition = 0;

    while (currentPosition < text.length) {
      let matched = false;
      const remainingText = text.slice(currentPosition);

      for (const [type, pattern] of Object.entries(Tokenizer.PATTERNS)) {
        const match = remainingText.match(pattern);
        if (match && match.index === 0) {
          tokens.push({
            value: match[0],
            type: type as Token['type'],
            position: currentPosition
          });
          currentPosition += match[0].length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        currentPosition++;
      }
    }

    return tokens;
  }
}