import readline from "readline";

import executeSTD, { executeRPN } from "../";
import { debugExecute } from "../lib/logger";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const MENU = "menu";
const menu = `Выберите вариант вычесления:\n
  1 - обычный вариант\n
  2 - RPN вариант\n
  3 - Exit\n`;

console.log("Добро пожаловать в калькулятор!\n");

let execute: (input: string) => number;
const answerFun = (answer: string) => {
  switch (answer) {
    case "1":
      execute = executeSTD;
      debugExecute("executeSTD");
      console.log("Стандартные вычисления, введите выражение:");
      break;
    case "2":
      execute = executeRPN;
      debugExecute("executeRPN");
      console.log("Вычисления RPN, введите выражение:");
      break;
    default:
      rl.close();
  }
};

rl.question(menu, answerFun);

rl.on("line", (input) => {
  debugExecute("on - line");
  try {
    console.log(`Result: ${execute(input)}`);
  } catch (ex) {
    console.log(ex.message);
  }
  console.log("Введите выражение:");
});

rl.on("SIGINT", () => {
  rl.question("Are you sure you want to exit or menu?", (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      console.log("Bye!");
      rl.close();
    } else if (answer == MENU) {
      rl.question(menu, answerFun);
    } else {
      console.log("Введите выражение:");
    }
  });
});
