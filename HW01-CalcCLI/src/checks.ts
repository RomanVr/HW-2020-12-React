import { operands } from "./data";
import { dot } from "./data";

export const isValidExpression = (str: string): boolean => {
  const wordsInExpression: string[] = str
    .trim()
    .split("")
    .reduce((acc: string[], item: string): string[] => {
      if (item !== " ") {
        acc.push(item);
      }
      return acc;
    }, []); // массив символов
  // console.log(wordsInExpression);

  //символов>0
  if (wordsInExpression.length === 0) return false;

  for (const sign of wordsInExpression) {
    if (
      typeof Number(sign) === "number" ||
      operands.has(sign) ||
      sign === dot
    ) {
      // console.log(`Has ${sign} in exp`);
    } else {
      return false;
    }
  }
  return true;
};
