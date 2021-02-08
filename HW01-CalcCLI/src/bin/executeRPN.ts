import execute from "../";
import question from "../question";

console.log("Welcome to Calculator!");
console.log("Enter 'exit' to exit the program");
const EXIT = "exit";
let expression = question();
while (expression !== EXIT) {
  try {
    console.log(`Result: ${execute(expression)}`);
  } catch (ex) {
    console.log(ex.message);
  }
  expression = question();
}
console.log("Bye!");
