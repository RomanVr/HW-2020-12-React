export const operands: Set<string> = new Set([
  "^",
  "!",
  "**",
  "+",
  "-",
  "*",
  "/",
  "(",
  ")",
  "s",
  "i",
  "n",
  "o",
  "c",
  "t",
  "a",
  "f",
  "b",
]);

export const DOT = ".";

export const levelOper: Map<string, number> = new Map([
  ["^", 1],
  ["!", 1],
  ["**", 1],
  ["sin", 1],
  ["cos", 1],
  ["tan", 1],
  ["fib", 1],
  ["*", 2],
  ["/", 2],
  ["+", 4],
  ["-", 4],
]);
export const argumentFunction: Map<string, number> = new Map([
  ["**", 1],
  ["!", 1],
  ["sin", 1],
  ["cos", 1],
  ["tan", 1],
  ["fib", 1],
  ["^", 2],
  ["*", 2],
  ["/", 2],
  ["+", 2],
  ["-", 2],
]);
export const mathOper: Map<
  string,
  (arg1: number, arg2: number) => number
> = new Map([
  ["**", (a: number): number => a * a],
  ["!", factorial],
  ["sin", Math.sin],
  ["cos", Math.cos],
  ["tan", Math.tan],
  ["fib", fib],
  ["^", (a: number, b: number): number => a ** b],
  ["*", (a: number, b: number): number => a * b],
  ["/", (a: number, b: number): number => a / b],
  ["+", (a: number, b: number): number => a + b],
  ["-", (a: number, b: number): number => a - b],
]);

function factorial(n: number): number {
  if (n == 0 || n == 1) {
    return 1;
  }
  if (n > 170) {
    return Number.POSITIVE_INFINITY;
  }
  return factorial(n - 1) * n;
}

const fib2 = (n: number): number[] => {
  if (n == 0) {
    return [0, 1];
  } else {
    const [prev, next] = fib2(n - 1);
    return [next, prev + next];
  }
};

function fib(n: number): number {
  return fib2(n)[0];
}
