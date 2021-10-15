/**
 * Экспортируйте фукнцию configureStore (именованный экспорт)
 *
 * Функция должна конфигурировать store со следующей логикой
 *
 * - в state есть два поля result / counter
 * type State = {
 *   result: number;
 *   counter: number;
 * }
 *
 * редьюсер должен поддерживать все операции, описанные в файле `./actionTypes.ts`
 * - ADD: добавление значения к state.result
 * - MULTIPLY: умножение state.result
 * - RESET: сброс state.result на 0
 *w
 * значение counter указывает на число выполненных операций
 * (увеличивается с каждой известной операцией)
 *
 * Тесты находятся в `./configureStore.test.ts`
 *
 * Используйте установленный пакет redux
 * (можете и свой redux написать, но это не обязательно)
 *
 * Фактически вам нужно написать редьюсер и подключить его к store
 */

// put your code heres
import * as actionTypes from "./actionTypes";

interface State {
  result: number;
  counter: number;
}
export type Store<State = any, Action = { type: string; payload?: number }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action
) => State;

const defaultSate = {
  result: 0,
  counter: 0,
};

export const reducer = (
  state: State = defaultSate,
  action: { type: any; payload: number }
) => {
  switch (action.type) {
    case actionTypes.ADD: {
      return {
        ...state,
        result: state.result + action.payload,
        counter: state.counter + 1,
      };
    }
    case actionTypes.RESET: {
      return {
        ...state,
        result: 0,
        counter: state.counter + 1,
      };
    }
    case actionTypes.MULTIPLY: {
      return {
        ...state,
        result: state.result * action.payload,
        counter: state.counter + 1,
      };
    }
  }
  return state;
};

export function configureStore<State, Action>(
  reducer: Reducer<State, Action>,
  state?: State = defaultSate
) {
  // const store = createStore(reducer);
  let callbacks: (() => void)[] = [];
  return {
    getState: () => state,
    dispatch: (action: Action) => {
      state = reducer(state, action);
      callbacks.forEach((callback) => callback());
    },
    subscribe: (cb: () => void) => {
      callbacks.push(cb);
      return () => {
        callbacks = callbacks.filter((f) => f != cb);
      };
    },
  };
}
