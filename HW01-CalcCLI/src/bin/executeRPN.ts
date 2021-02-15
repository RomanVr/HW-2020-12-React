import readline from "readline";

import execute from "../";

const RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to Calculator! Enter your expression:");

RL.on("line", (input) => {
  try {
    console.log(`Result: ${execute(input)}`);
  } catch (ex) {
    console.log(ex.message);
    console.log("Enter your expression:");
  }
});

RL.on("SIGINT", () => {
  RL.question("Are you sure you want to exit?", (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      console.log("Bye!");
      RL.close();
    } else {
      console.log("Enter your expression:");
    }
  });
});
