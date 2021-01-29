import readlineSync from "readline-sync";

import { isValidExpression } from "./checks";
import { getMathSymbols, getOuputRPN, evalExpressionRPN } from "./executeRPN";

export const sum = (a: number, b: number): number => a + b;

console.log("Welcome to Calculator!");
const expression: string = readlineSync.question("Enter expression: ");

// console.log(`you enter expression:${expression}`);

if (isValidExpression(expression)) {
  const mathSymbols: string[] = getMathSymbols(expression);
  // console.log(`mathSymbol: ${mathSymbols}`);

  const ouputRPN: string[] = getOuputRPN(mathSymbols);
  // console.log(`ouputRPN: ${ouputRPN}`);

  console.log(`result: ${evalExpressionRPN(ouputRPN)}`);
} else {
  console.log("Our expression is not valid!");
}
