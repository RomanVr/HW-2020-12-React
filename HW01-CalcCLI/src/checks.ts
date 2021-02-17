import { operands } from "./data";
import { DOT } from "./data";

export const isValidExpression = (str: string): boolean => {
  const wordsInExpression: string[] = str
    .trim()
    .split("")
    .reduce((acc: string[], item: string): string[] => {
      if (item !== " ") {
        acc.push(item);
      }
      return acc;
    }, []);

  if (wordsInExpression.length === 0) return false;
  for (const sign of wordsInExpression) {
    if (isNaN(Number(sign)) && (operands.has(sign) || sign === DOT)) {
    } else if (!isNaN(Number(sign))) {
    } else {
      return false;
    }
  }
  return true;
};
