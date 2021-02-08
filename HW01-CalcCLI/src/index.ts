import { isValidExpression } from "./checks";
import { getMathSymbols, getOutputRPN, evalExpressionRPN } from "./rpnMethods";

export default (expression: string): number => {
  if (isValidExpression(expression)) {
    const mathSymbols: string[] = getMathSymbols(expression);

    const ouputRPN: string[] = getOutputRPN(mathSymbols);

    const result = evalExpressionRPN(ouputRPN);

    return result;
  } else {
    throw new Error("Our expression is not valid!");
  }
};
