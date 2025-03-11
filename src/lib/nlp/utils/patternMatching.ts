// Utility functions for pattern matching
export const findPatternMatches = (
  text: string,
  pattern: RegExp,
  type: string
): Array<{
  type: string;
  value: string;
  startPosition: number;
  endPosition: number;
}> => {
  const matches = [];
  let match;

  while ((match = pattern.exec(text)) !== null) {
    matches.push({
      type,
      value: match[0],
      startPosition: match.index,
      endPosition: match.index + match[0].length,
    });
  }

  return matches;
};

export const calculateConfidence = (
  matches: number,
  totalPatterns: number,
  contextBonus = 0
): number => {
  const baseConfidence = matches / totalPatterns;
  return Math.min(baseConfidence + contextBonus, 1);
};