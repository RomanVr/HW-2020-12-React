import {
  compose,
  concat,
  fromPairs,
  join,
  KeyValuePair,
  last,
  map,
  prop,
  reduce,
  split,
  toPairs,
} from "ramda";

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = compose(
  prop("name"),
  reduce<Team, Team>(
    (acc, elem) => {
      if (elem && acc.score < elem.score) return elem;
      return acc;
    },
    { name: "", score: 0 }
  )
);

// Задание 2
export type QsObj = Record<string, string | number | boolean | unknown>;

export const createQs = compose(
  concat("?"),
  join("&"),
  map(join("=")),
  toPairs
);

// Задание 3

export const parseQs = compose(
  fromPairs,
  map(split("=")) as (
    list: readonly string[]
  ) => Array<KeyValuePair<string, string>>,
  split("&"),
  last,
  split("?")
);
