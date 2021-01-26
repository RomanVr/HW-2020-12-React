import readlineSync from "readline-sync";
import _ from "lodash";

export const sum = (a: number, b: number): number => a + b;

const operands: Set<string> = new Set(["+", "-", "*", "/"]);
const dot = ".";

//Problem 'Has 22+ in exp'
const isValidExpression = (str: string): boolean => {
  const wordsInExpression: string[] = str
    .trim()
    .split("")
    .reduce((acc: string[], item: string): string[] => {
      if (item !== " ") {
        acc.push(item);
      }
      return acc;
    }, []); // массив символов
  console.log(wordsInExpression);

  //символов>0
  if (wordsInExpression.length === 0) return false;

  for (const sign of wordsInExpression) {
    if (
      typeof Number(sign) === "number" ||
      operands.has(sign) ||
      sign === dot
    ) {
      console.log(`Has ${sign} in exp`);
    } else {
      return false;
    }
  }
  return true;
};

const toSetOfMathSymbols = (str: string): string[] => {
  const wordsInExpression: string[] = str
    .trim()
    .split("")
    .reduce((acc: string[], item: string): string[] => {
      if (item !== " ") {
        acc.push(item);
      }
      return acc;
    }, []); // массив символов

  //получаем массив операндов и аргументов
  const word: string[] = [];
  const mathSymbols: string[] = [];
  for (const sing of wordsInExpression) {
    if (operands.has(sing)) {
      if (!_.isEmpty(word)) {
        mathSymbols.push(word.join(""));
        word.length = 0;
      }
      mathSymbols.push(sing);
    } else {
      word.push(sing);
    }
  }
  if (!_.isEmpty(word)) {
    mathSymbols.push(word.join(""));
  }
  return mathSymbols;
};

const levelOper: Map<string, number> = new Map([
  ["*", 1],
  ["/", 1],
  ["+", 2],
  ["-", 2],
]);
const evalExpression = (mathSymbols: string[]): number => {
  const stackRPN: string[] = [];
  let lastElemInStack = "";
  const output: string[] = mathSymbols.reduce(
    (acc: string[], item: string, index: number): string[] => {
      //Если последний элемент то положить в output и stackRPN высвободить в output
      if (index === mathSymbols.length - 1) {
        acc.push(item);
        if (stackRPN.length !== 0) {
          stackRPN.reverse().map((elem: string) => acc.push(elem));
        }
      } else if (typeof Number(item) === "number") {
        acc.push(item);
      } else if (lastElemInStack === "") {
        stackRPN.push(item);
        lastElemInStack = item;
      } else {
        const levelLastElem: number = levelOper.get(lastElemInStack) as number;
        const levelCurrentOper: number = levelOper.get(item) as number;
        if (levelCurrentOper < levelLastElem) {
          stackRPN.push(item);
        } else {
          acc.push(stackRPN.pop() as string);
          stackRPN.push(item);
        }
      }
      return acc;
    },
    []
  );
  const stackEval: string[] = [];

  return 0;
};

console.log("Welcome to Calculator!");
const expression: string = readlineSync.question("Enter expression: ");

console.log(`you enter expression:${expression}`);

console.log(expression.split(""));

if (isValidExpression(expression)) {
  const mathSymbols: string[] = toSetOfMathSymbols(expression);
  console.log(`mathSymbol: ${mathSymbols}`);
  console.log(`result: ${evalExpression(mathSymbols)}`);
} else {
  console.log("Our expression is not valid!");
}
