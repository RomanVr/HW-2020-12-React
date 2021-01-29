import _ from "lodash";
import { operands } from "./data";
import { levelOper } from "./data";
import { mathOper } from "./data";

export const getMathSymbols = (str: string): string[] => {
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

export const getOuputRPN = (mathSymbols: string[]): string[] => {
  const stackRPN: string[] = [];
  let lastElemInStack = "";

  const output: string[] = mathSymbols.reduce(
    (acc: string[], item: string, index: number): string[] => {
      // console.log(`!!!index item: ${index}`);
      if (index === mathSymbols.length - 1) {
        //Если последний элемент то положить в output и stackRPN высвободить в output
        // console.log(`Last elem: ${item}`);
        acc.push(item);
        // console.log(`stackRPN: ${stackRPN}`);
        let elem = stackRPN.pop();
        while (elem) {
          // console.log(`elem: ${elem}`);
          acc.push(elem);
          elem = stackRPN.pop();
        }
      } else if (operands.has(item)) {
        // console.log(`item: ${item} has operands: ${operands.has(item)}`);
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
        // console.log(`lastElemInStack: ${lastElemInStack}`);
        // console.log(`stackRPN: ${stackRPN}`);
      } else {
        //(typeof Number(item) === "number")
        // console.log(`item: ${item} typeof Number: ${typeof Number(item)}`);
        acc.push(item);
        // console.log(`output: ${acc}`);
      }
      return acc;
    },
    []
  );
  // console.log(`output finish: ${output}`);
  // console.log(`stackRPN finish: ${stackRPN}`);
  return output;
};

export const evalExpressionRPN = (outputRPN: string[]): number => {
  //Вычисление выражения----------------------------------------
  const stackEval: string[] = [];
  outputRPN.map((item: string): void => {
    if (operands.has(item)) {
      //операция
      // console.log(`item: ${item} has operands: ${operands.has(item)}`);
      const secondArg: number = Number(stackEval.pop()) as number;
      const firstArg: number = Number(stackEval.pop()) as number;
      const result: string = (mathOper.get(item) as (
        arg1: number,
        arg2: number
      ) => number)(firstArg, secondArg).toString();
      stackEval.push(result);
    } else {
      //операнд
      // console.log(`item: ${item} typeof Number: ${typeof Number(item)}`);
      stackEval.push(item);
    }
  });
  // console.log(`stackEval: ${stackEval}`);
  return Number(stackEval.pop());
};
