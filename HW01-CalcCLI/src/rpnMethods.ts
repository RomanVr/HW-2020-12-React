import _ from "lodash";

import { debugSymbols, debugOutputRPN, debugEval } from "./lib/logger";
import { levelOper, mathOper, argumentFunctions } from "./data";

const operands = new Map(levelOper);

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

  //получаем массив операндов и чисел
  const numberCurrent: string[] = [];
  const operandCurrent: string[] = [];
  const mathSymbols: string[] = [];
  for (const sing of wordsInExpression) {
    if (sing === "(" || sing === ")") {
      debugSymbols("operand '(' || ')'");
      if (!_.isEmpty(numberCurrent)) {
        mathSymbols.push(numberCurrent.join(""));
        numberCurrent.length = 0;
      }
      if (!_.isEmpty(operandCurrent)) {
        debugSymbols(`operandCurrent: ${operandCurrent.join()}`);
        mathSymbols.push(operandCurrent.join(""));
        operandCurrent.length = 0;
      }
      mathSymbols.push(sing);
    } else if (operands.has(sing)) {
      if (!_.isEmpty(numberCurrent)) {
        mathSymbols.push(numberCurrent.join(""));
        numberCurrent.length = 0;
      }
      const operandPrevios = operandCurrent.join("");
      const operandUnion = operandCurrent.join("") + sing;
      debugSymbols(`operand ${sing}, current: ${operandCurrent}`);
      if (operandPrevios.length === 0) {
        // Если предыдущий символ отсутствует - положить в стек
        debugSymbols(`1 -- operandPrevios ${operandPrevios} is Empty`);
        operandCurrent.push(sing);
      } else if (operands.has(operandUnion)) {
        // Если предыдущий + текущий есть - положить в символы
        debugSymbols(`2 -- operandUnion ${operandUnion} is operands`);
        mathSymbols.push(operandUnion);
        operandCurrent.length = 0;
      } else {
        // Если предыдущий + текущий нет - предыдущий положить в символы текущий положить в стек
        debugSymbols(
          `3 -- operandUnion ${operandUnion} not is operands, sing: ${sing} is operands`
        );
        mathSymbols.push(operandPrevios);
        operandCurrent.length = 0;
        operandCurrent.push(sing);
      }
    } else {
      debugSymbols(`number ${sing}`);
      if (!_.isEmpty(operandCurrent)) {
        debugSymbols(`operandCurrent: ${operandCurrent.join()}`);
        mathSymbols.push(operandCurrent.join(""));
        operandCurrent.length = 0;
      }
      numberCurrent.push(sing);
    }
  }
  if (!_.isEmpty(numberCurrent)) {
    mathSymbols.push(numberCurrent.join(""));
  }
  if (!_.isEmpty(operandCurrent)) {
    mathSymbols.push(operandCurrent.join(""));
  }
  debugSymbols(`mathSymbols: ${mathSymbols}`);
  return mathSymbols;
};

export const getOutputRPN = (mathSymbols: string[]): string[] => {
  const stackRPN: string[] = [];
  let lastElemInStack = "";
  const output: string[] = mathSymbols.reduce(
    (acc: string[], item: string, index: number): string[] => {
      debugOutputRPN(`!!!index item: ${index}`);
      if (item === "(") {
        stackRPN.push(item);
      } else if (item === ")") {
        // Выталкиваем из стека операции до достижения (
        let elem: string = stackRPN.pop() as string;
        while (elem !== "(") {
          acc.push(elem);
          elem = stackRPN.pop() as string;
        }
      } else if (operands.has(item)) {
        debugOutputRPN(`item: ${item} has operands: ${operands.has(item)}`);
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
        debugOutputRPN(`lastElemInStack: ${lastElemInStack}`);
        debugOutputRPN(`stackRPN: ${stackRPN}`);
      } else {
        debugOutputRPN(`item: ${item} typeof Number: ${typeof Number(item)}`);
        acc.push(item);
        debugOutputRPN(`output: ${acc}`);
      }
      if (index === mathSymbols.length - 1) {
        //Если последний элемент то stackRPN высвободить в output
        debugOutputRPN(`stackRPN: ${stackRPN}`);
        let elem = stackRPN.pop();
        while (elem) {
          debugOutputRPN(`elem: ${elem}`);
          acc.push(elem);
          elem = stackRPN.pop();
        }
      }
      return acc;
    },
    []
  );
  debugOutputRPN(`output finish: ${output}`);
  debugOutputRPN(`stackRPN finish: ${stackRPN}`);
  return output;
};

export const evalExpressionRPN = (outputRPN: string[]): number => {
  //Вычисление выражения----------------------------------------
  const stackEval: string[] = [];
  outputRPN.map((item: string): void => {
    if (operands.has(item)) {
      //операция
      debugEval(`item: ${item} has operands: ${operands.has(item)}`);
      // Определяем аргументы функции
      const countArgument: number = argumentFunctions.get(item) as number;
      const secondArg: number = Number(stackEval.pop()) as number;
      if (countArgument > 1) {
        const firstArg: number = Number(stackEval.pop()) as number;
        const result: string = (mathOper.get(item) as (
          arg1: number,
          arg2: number
        ) => number)(firstArg, secondArg).toString();
        stackEval.push(result);
      } else {
        const result: string = (mathOper.get(item) as (arg1: number) => number)(
          secondArg
        ).toString();
        stackEval.push(result);
      }
    } else {
      //операнд
      debugEval(`item: ${item} typeof Number: ${typeof Number(item)}`);
      stackEval.push(item);
    }
  });
  debugEval(`stackEval: ${stackEval}`);
  return Number(stackEval.pop());
};
