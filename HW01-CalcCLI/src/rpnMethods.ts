import _ from "lodash";

import { debugSymbols, debugOutputRPN, debugEval } from "./lib/logger";
import { levelOper, mathOper, argumentFunction } from "./data";

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
    }, []);

  const numberCurrent: string[] = [];
  const operandcurrent: string[] = [];
  const mathSymbols: string[] = [];
  for (const sing of wordsInExpression) {
    if (sing === "(" || sing === ")") {
      debugSymbols("operand '(' || ')'");
      if (!_.isEmpty(numberCurrent)) {
        mathSymbols.push(numberCurrent.join(""));
        numberCurrent.length = 0;
      }
      if (!_.isEmpty(operandcurrent)) {
        debugSymbols(`operandcurrent: ${operandcurrent.join()}`);
        mathSymbols.push(operandcurrent.join(""));
        operandcurrent.length = 0;
      }
      mathSymbols.push(sing);
    } else if (operands.has(sing)) {
      if (!_.isEmpty(numberCurrent)) {
        mathSymbols.push(numberCurrent.join(""));
        numberCurrent.length = 0;
      }
      const operandPrevios = operandcurrent.join("");
      const operandUnion = operandcurrent.join("") + sing;
      debugSymbols(`operand ${sing}, current: ${operandcurrent}`);
      if (operandPrevios.length === 0) {
        debugSymbols(`1 -- operandPrevios ${operandPrevios} is Empty`);
        operandcurrent.push(sing);
      } else if (operands.has(operandUnion)) {
        debugSymbols(`2 -- operandUnion ${operandUnion} is OPERSNDS`);
        mathSymbols.push(operandUnion);
        operandcurrent.length = 0;
      } else {
        debugSymbols(
          `3 -- operandUnion ${operandUnion} not is OPERSNDS, sing: ${sing} is OPERSNDS`
        );
        mathSymbols.push(operandPrevios);
        operandcurrent.length = 0;
        operandcurrent.push(sing);
      }
    } else {
      debugSymbols(`number ${sing}`);
      if (!_.isEmpty(operandcurrent)) {
        debugSymbols(`operandcurrent: ${operandcurrent.join()}`);
        mathSymbols.push(operandcurrent.join(""));
        operandcurrent.length = 0;
      }
      numberCurrent.push(sing);
    }
  }
  if (!_.isEmpty(numberCurrent)) {
    mathSymbols.push(numberCurrent.join(""));
  }
  if (!_.isEmpty(operandcurrent)) {
    mathSymbols.push(operandcurrent.join(""));
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
        let elem: string = stackRPN.pop() as string;
        while (elem !== "(") {
          acc.push(elem);
          elem = stackRPN.pop() as string;
        }
      } else if (operands.has(item)) {
        debugOutputRPN(`item: ${item} has OPERSNDS: ${operands.has(item)}`);
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
  debugOutputRPN(`OUTPUT finish: ${output}`);
  debugOutputRPN(`stackRPN finish: ${stackRPN}`);
  return output;
};

export const evalExpressionRPN = (outputRPN: string[]): number => {
  const stackEval: string[] = [];
  outputRPN.map((item: string): void => {
    if (operands.has(item)) {
      debugEval(`item: ${item} has OPERSNDS: ${operands.has(item)}`);
      const COUNT_ARGUMENTS: number = argumentFunction.get(item) as number;
      const secondArg: number = Number(stackEval.pop()) as number;
      if (COUNT_ARGUMENTS > 1) {
        const firstArg: number = Number(stackEval.pop()) as number;
        const RESULT: string = (mathOper.get(item) as (
          arg1: number,
          arg2: number
        ) => number)(firstArg, secondArg).toString();
        stackEval.push(RESULT);
      } else {
        const RESULT: string = (mathOper.get(item) as (arg1: number) => number)(
          secondArg
        ).toString();
        stackEval.push(RESULT);
      }
    } else {
      debugEval(`item: ${item} typeof Number: ${typeof Number(item)}`);
      stackEval.push(item);
    }
  });
  debugEval(`stackEval: ${stackEval}`);
  return Number(stackEval.pop());
};
