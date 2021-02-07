import readlineSync from "readline-sync";

export default (): string => {
  const expression: string = readlineSync.question("Enter expression: ");
  return expression;
};
