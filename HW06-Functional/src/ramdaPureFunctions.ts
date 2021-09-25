import {
  compose, prop, reduce,
  //...
} from "ramda";

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = compose(prop('name'), reduce(acc, elem) => {
  
});

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = compose(/* ... */);

// Задание 3
export const parseQs = compose(/* ... */);
