import "./easy1";
import "./easy2";

import { omit } from "./easy3";

interface Todo {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

const todo: Todo = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

const objOmit = omit(todo, "completed");

console.log(objOmit);
