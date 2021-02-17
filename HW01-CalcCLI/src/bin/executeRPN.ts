import readline from "readline";

import execute from "../";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to Calculator! Enter your expression:");

rl.on("line", (input) => {
  try {
    console.log(`Result: ${execute(input)}`);
  } catch (ex) {
    console.log(ex.message);
    console.log("Enter your expression:");
  }
});

rl.on("SIGINT", () => {
  rl.question("Are you sure you want to exit?", (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      console.log("Bye!");
      rl.close();
    } else {
      console.log("Enter your expression:");
    }
  });
});
