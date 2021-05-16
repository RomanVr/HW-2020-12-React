import "./level1/easy1";
import "./level1/easy2";
import { omit } from "./level1/easy3";

import "./level2/medium1";
import "./level2/medium2";
import "./level2/medium3";

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
