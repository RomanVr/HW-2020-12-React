export const operands: Set<string> = new Set(["+", "-", "*", "/"]);
export const dot = ".";

export const levelOper: Map<string, number> = new Map([
  ["*", 1],
  ["/", 1],
  ["+", 2],
  ["-", 2],
]);

export const mathOper: Map<
  string,
  (arg1: number, arg2: number) => number
> = new Map([
  ["*", (a: number, b: number): number => a * b],
  ["/", (a: number, b: number): number => a / b],
  ["+", (a: number, b: number): number => a + b],
  ["-", (a: number, b: number): number => a - b],
]);
