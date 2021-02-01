export const operands: Set<string> = new Set([
  "^",
  "!",
  "**",
  "+",
  "-",
  "*",
  "/",
]);

export const dot = ".";

export const levelOper: Map<string, number> = new Map([
  ["^", 1],
  ["!", 1],
  ["**", 1],
  ["*", 2],
  ["/", 2],
  ["+", 4],
  ["-", 4],
]);
export const argumentFunctions: Map<string, number> = new Map([
  ["**", 1],
  ["!", 1],
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
  ["^", (a: number, b: number): number => a ** b],
  ["*", (a: number, b: number): number => a * b],
  ["/", (a: number, b: number): number => a / b],
  ["+", (a: number, b: number): number => a + b],
  ["-", (a: number, b: number): number => a - b],
]);

function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }
  if (n > 170) {
    return Number.POSITIVE_INFINITY;
  }
  return factorial(n - 1) * n;
}
