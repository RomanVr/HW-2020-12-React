import _ from "lodash";

import { isValidExpression } from "./checks";
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
      // console.log(`operand ( || )`);
      if (!_.isEmpty(numberCurrent)) {
        mathSymbols.push(numberCurrent.join(""));
        numberCurrent.length = 0;
      }
      if (!_.isEmpty(operandCurrent)) {
        // console.log(`operandCurrent: ${operandCurrent.join()}`);
        mathSymbols.push(operandCurrent.join(""));
        operandCurrent.length = 0;
      }
      mathSymbols.push(sing);
    } else if (operands.has(sing)) {
      // console.log(`operand ${sing}`);
      if (!_.isEmpty(numberCurrent)) {
        mathSymbols.push(numberCurrent.join(""));
        numberCurrent.length = 0;
      }
      const operandPrevios = operandCurrent.join("");
      const operandUnion = operandCurrent.join("") + sing;
      if (operandPrevios.length === 0) {
        // Если предыдущий символ отсутствует - положить в стек
        // console.log(`1 -- operandPrevios ${operandPrevios} is Empty`);
        operandCurrent.push(sing);
      } else if (operands.has(operandUnion)) {
        // Если предыдущий + текущий есть - положить в символы
        // console.log(`2 -- operandUnion ${operandUnion} is operands`);
        mathSymbols.push(operandUnion);
        operandCurrent.length = 0;
      } else if (!operands.has(operandUnion) && operands.has(operandPrevios)) {
        // Если предыдущий + текущий отсутствует, а предыдущий есть - предыдущий положить в символы текущий положить в стек
        // console.log(
        //   `3 -- operandUnion: ${operandUnion} is not operands; operandPrevios: ${operandPrevios} is operands`
        // );
        mathSymbols.push(operandPrevios);
        operandCurrent.length = 0;
        operandCurrent.push(sing);
      } else {
        // Остался вариант предыдущий + текущий отсутствует - текущий положить в стек
        // console.log(`4 -- operandUnion: ${operandUnion} is not operands`);
        operandCurrent.push(sing);
      }
    } else {
      // console.log(`number ${sing}`);
      if (!_.isEmpty(operandCurrent)) {
        // console.log(`operandCurrent: ${operandCurrent.join()}`);
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
  // console.log(`mathSymbols: ${mathSymbols}`);
  return mathSymbols;
};

export const getOuputRPN = (mathSymbols: string[]): string[] => {
  const stackRPN: string[] = [];
  let lastElemInStack = "";
  const output: string[] = mathSymbols.reduce(
    (acc: string[], item: string, index: number): string[] => {
      // console.log(`!!!index item: ${index}`);
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
      if (index === mathSymbols.length - 1) {
        //Если последний элемент то stackRPN высвободить в output
        // console.log(`stackRPN: ${stackRPN}`);
        let elem = stackRPN.pop();
        while (elem) {
          // console.log(`elem: ${elem}`);
          acc.push(elem);
          elem = stackRPN.pop();
        }
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
      // console.log(`item: ${item} typeof Number: ${typeof Number(item)}`);
      stackEval.push(item);
    }
  });
  // console.log(`stackEval: ${stackEval}`);
  return Number(stackEval.pop());
};

export default (expression: string): number => {
  if (isValidExpression(expression)) {
    const mathSymbols: string[] = getMathSymbols(expression);
    // console.log(`mathSymbol: ${mathSymbols}`);

    const ouputRPN: string[] = getOuputRPN(mathSymbols);
    // console.log(`ouputRPN: ${ouputRPN}`);

    const result = evalExpressionRPN(ouputRPN);
    // console.log(`result: ${result}`);
    return result;
  } else {
    // console.log("Our expression is not valid!");
    throw new TypeError("Our expression is not valid!");
  }
};
