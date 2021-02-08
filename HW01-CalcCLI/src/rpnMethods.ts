import _ from "lodash";

import { debugSymbols, debugOutputRPN, debugEval } from "./lib/logger";
import { LEVEL_OPER, MATH_OPER, ARGUMENT_FUNCTIONS } from "./data";

const OPERANDS = new Map(LEVEL_OPER);

export const getMathSymbols = (str: string): string[] => {
  const WORDS_IN_EXPRESSION: string[] = str
    .trim()
    .split("")
    .reduce((acc: string[], item: string): string[] => {
      if (item !== " ") {
        acc.push(item);
      }
      return acc;
    }, []);

  const NUMBER_CURRENT: string[] = [];
  const OPERAND_CURRENT: string[] = [];
  const MATH_SYMBOLS: string[] = [];
  for (const SING of WORDS_IN_EXPRESSION) {
    if (SING === "(" || SING === ")") {
      debugSymbols("operand '(' || ')'");
      if (!_.isEmpty(NUMBER_CURRENT)) {
        MATH_SYMBOLS.push(NUMBER_CURRENT.join(""));
        NUMBER_CURRENT.length = 0;
      }
      if (!_.isEmpty(OPERAND_CURRENT)) {
        debugSymbols(`OPERAND_CURRENT: ${OPERAND_CURRENT.join()}`);
        MATH_SYMBOLS.push(OPERAND_CURRENT.join(""));
        OPERAND_CURRENT.length = 0;
      }
      MATH_SYMBOLS.push(SING);
    } else if (OPERANDS.has(SING)) {
      if (!_.isEmpty(NUMBER_CURRENT)) {
        MATH_SYMBOLS.push(NUMBER_CURRENT.join(""));
        NUMBER_CURRENT.length = 0;
      }
      const OPERAND_PREVIOS = OPERAND_CURRENT.join("");
      const OPERAND_UNION = OPERAND_CURRENT.join("") + SING;
      debugSymbols(`operand ${SING}, current: ${OPERAND_CURRENT}`);
      if (OPERAND_PREVIOS.length === 0) {
        debugSymbols(`1 -- OPERAND_PREVIOS ${OPERAND_PREVIOS} is Empty`);
        OPERAND_CURRENT.push(SING);
      } else if (OPERANDS.has(OPERAND_UNION)) {
        debugSymbols(`2 -- OPERAND_UNION ${OPERAND_UNION} is OPERSNDS`);
        MATH_SYMBOLS.push(OPERAND_UNION);
        OPERAND_CURRENT.length = 0;
      } else {
        debugSymbols(
          `3 -- OPERAND_UNION ${OPERAND_UNION} not is OPERSNDS, SING: ${SING} is OPERSNDS`
        );
        MATH_SYMBOLS.push(OPERAND_PREVIOS);
        OPERAND_CURRENT.length = 0;
        OPERAND_CURRENT.push(SING);
      }
    } else {
      debugSymbols(`number ${SING}`);
      if (!_.isEmpty(OPERAND_CURRENT)) {
        debugSymbols(`OPERAND_CURRENT: ${OPERAND_CURRENT.join()}`);
        MATH_SYMBOLS.push(OPERAND_CURRENT.join(""));
        OPERAND_CURRENT.length = 0;
      }
      NUMBER_CURRENT.push(SING);
    }
  }
  if (!_.isEmpty(NUMBER_CURRENT)) {
    MATH_SYMBOLS.push(NUMBER_CURRENT.join(""));
  }
  if (!_.isEmpty(OPERAND_CURRENT)) {
    MATH_SYMBOLS.push(OPERAND_CURRENT.join(""));
  }
  debugSymbols(`MATH_SYMBOLS: ${MATH_SYMBOLS}`);
  return MATH_SYMBOLS;
};

export const getOutputRPN = (MATH_SYMBOLS: string[]): string[] => {
  const STACK_RPN: string[] = [];
  let lastElemInStack = "";
  const OUTPUT: string[] = MATH_SYMBOLS.reduce(
    (acc: string[], item: string, index: number): string[] => {
      debugOutputRPN(`!!!index item: ${index}`);
      if (item === "(") {
        STACK_RPN.push(item);
      } else if (item === ")") {
        let elem: string = STACK_RPN.pop() as string;
        while (elem !== "(") {
          acc.push(elem);
          elem = STACK_RPN.pop() as string;
        }
      } else if (OPERANDS.has(item)) {
        debugOutputRPN(`item: ${item} has OPERSNDS: ${OPERANDS.has(item)}`);
        if (lastElemInStack === "") {
          STACK_RPN.push(item);
          lastElemInStack = item;
        } else {
          const LEVEL_LAST_OPER: number = LEVEL_OPER.get(
            lastElemInStack
          ) as number;
          const levelCurrentOper: number = LEVEL_OPER.get(item) as number;
          if (levelCurrentOper < LEVEL_LAST_OPER) {
            STACK_RPN.push(item);
            lastElemInStack = item;
          } else {
            let elem: string = _.last(STACK_RPN) as string;
            let levelElem: number = LEVEL_OPER.get(elem) as number;
            while (elem && levelElem < levelCurrentOper) {
              acc.push(STACK_RPN.pop() as string);
              elem = _.last(STACK_RPN) as string;
              levelElem = LEVEL_OPER.get(elem) as number;
            }
            STACK_RPN.push(item);
            lastElemInStack = item;
          }
        }
        debugOutputRPN(`lastElemInStack: ${lastElemInStack}`);
        debugOutputRPN(`STACK_RPN: ${STACK_RPN}`);
      } else {
        debugOutputRPN(`item: ${item} typeof Number: ${typeof Number(item)}`);
        acc.push(item);
        debugOutputRPN(`OUTPUT: ${acc}`);
      }
      if (index === MATH_SYMBOLS.length - 1) {
        debugOutputRPN(`STACK_RPN: ${STACK_RPN}`);
        let elem = STACK_RPN.pop();
        while (elem) {
          debugOutputRPN(`elem: ${elem}`);
          acc.push(elem);
          elem = STACK_RPN.pop();
        }
      }
      return acc;
    },
    []
  );
  debugOutputRPN(`OUTPUT finish: ${OUTPUT}`);
  debugOutputRPN(`STACK_RPN finish: ${STACK_RPN}`);
  return OUTPUT;
};

export const evalExpressionRPN = (OUTPUTRPN: string[]): number => {
  const STACK_EVAL: string[] = [];
  OUTPUTRPN.map((item: string): void => {
    if (OPERANDS.has(item)) {
      debugEval(`item: ${item} has OPERSNDS: ${OPERANDS.has(item)}`);
      const COUNT_ARGUMENTS: number = ARGUMENT_FUNCTIONS.get(item) as number;
      const SECOND_ARG: number = Number(STACK_EVAL.pop()) as number;
      if (COUNT_ARGUMENTS > 1) {
        const FIRST_ARG: number = Number(STACK_EVAL.pop()) as number;
        const RESULT: string = (MATH_OPER.get(item) as (
          arg1: number,
          arg2: number
        ) => number)(FIRST_ARG, SECOND_ARG).toString();
        STACK_EVAL.push(RESULT);
      } else {
        const RESULT: string = (MATH_OPER.get(item) as (
          arg1: number
        ) => number)(SECOND_ARG).toString();
        STACK_EVAL.push(RESULT);
      }
    } else {
      debugEval(`item: ${item} typeof Number: ${typeof Number(item)}`);
      STACK_EVAL.push(item);
    }
  });
  debugEval(`STACK_EVAL: ${STACK_EVAL}`);
  return Number(STACK_EVAL.pop());
};
