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
      console.log(`!!!index item: ${index}`);
      if (index === mathSymbols.length - 1) {
        //Если последний элемент то положить в output и stackRPN высвободить в output
        console.log(`Last elem: ${item}`);
        acc.push(item);
        console.log(`stackRPN: ${stackRPN}`);
        let elem = stackRPN.pop();
        while (elem) {
          console.log(`elem: ${elem}`);
          acc.push(elem);
          elem = stackRPN.pop();
        }
      } else if (operands.has(item)) {
        console.log(`item: ${item} has operands: ${operands.has(item)}`);
        if (lastElemInStack === "") {
          stackRPN.push(item);
          lastElemInStack = item;
        } else {
          const levelLastOper: number = levelOper.get(
            lastElemInStack
          ) as number;
          const levelCurrentOper: number = levelOper.get(item) as number;
          if (levelCurrentOper < levelLastOper) {
            stackRPN.push(item);
            lastElemInStack = item;
          } else {
            //выталкиваем все операции уровень которых меньше текущей
            let elem: string = _.last(stackRPN) as string;
            let levelElem: number = levelOper.get(elem) as number;
            while (elem && levelElem < levelCurrentOper) {
              acc.push(stackRPN.pop() as string);
              elem = _.last(stackRPN) as string;
              levelElem = levelOper.get(elem) as number;
            }
            stackRPN.push(item);
            lastElemInStack = item;
          }
        }
        console.log(`lastElemInStack: ${lastElemInStack}`);
        console.log(`stackRPN: ${stackRPN}`);
      } else {
        //(typeof Number(item) === "number")
        console.log(`item: ${item} typeof Number: ${typeof Number(item)}`);
        acc.push(item);
        console.log(`output: ${acc}`);
      }
      return acc;
    },
    []
  );

  console.log(`output finish: ${output}`);
  console.log(`stackRPN finish: ${stackRPN}`);

  //Вычисление выражения----------------------------------------
  const stackEval: string[] = [];
  const mathOper: Map<string, (arg1: number, arg2: number) => number> = new Map(
    [
      ["*", (a: number, b: number): number => a * b],
      ["/", (a: number, b: number): number => a / b],
      ["+", (a: number, b: number): number => a + b],
      ["-", (a: number, b: number): number => a - b],
    ]
  );
  output.map((item: string): void => {
    if (operands.has(item)) {
      //операция
      console.log(`item: ${item} has operands: ${operands.has(item)}`);
      const firstArg: number = Number(stackEval.pop()) as number;
      const secondArg: number = Number(stackEval.pop()) as number;
      const result: string = (mathOper.get(item) as (
        arg1: number,
        arg2: number
      ) => number)(firstArg, secondArg).toString();
      stackEval.push(result);
    } else {
      //операнд
      console.log(`item: ${item} typeof Number: ${typeof Number(item)}`);
      stackEval.push(item);
    }
  });

  return Number(stackEval.pop());
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
