import readlineSync from "readline-sync";

export default (): string => {
  console.log("Welcome to Calculator!");
  const expression: string = readlineSync.question("Enter expression: ");

  // console.log(`you enter expression:${expression}`);
  return expression;
};
