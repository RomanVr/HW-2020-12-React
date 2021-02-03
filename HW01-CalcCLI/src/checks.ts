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
  // console.log(`input symbols: ${wordsInExpression}`);

  //символов>0
  if (wordsInExpression.length === 0) return false;

  for (const sign of wordsInExpression) {
    if (isNaN(Number(sign)) && (operands.has(sign) || sign === dot)) {
      console.log(`1-- sign: ${sign} is number: ${Number(sign)}`);
    } else if (!isNaN(Number(sign))) {
      console.log(`2-- sign: ${sign} is number: ${Number(sign)}`);
    } else {
      console.log(`3-- sign: ${sign} false`);
      return false;
    }
  }
  return true;
};
