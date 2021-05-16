// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any

import React from "react";
// type FIXME = any;

type getTypeDefaultProps<T> = T extends { defaultProps: infer U } ? U : unknown;
// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): getTypeDefaultProps<React.ComponentType<T>> => {
  return component.defaultProps;
};
