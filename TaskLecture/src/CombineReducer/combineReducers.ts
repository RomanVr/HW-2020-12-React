// put your code here

interface Action<T = any> {
  type: T;
}

interface AnyAction extends Action {
  [extraProps: string]: any;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [k in keyof S]: Reducer<S[k], A>;
};

export function combineReducers<S>(
  config: ReducersMapObject<S, any>
): Reducer<S> {
  return (state: S | undefined, action: any) => {
    const objectKeys = Object.keys(config);

    const obj = {} as S;
    for (let i = 0; i < objectKeys.length; i += 1) {
      const key = objectKeys[i] as keyof typeof config;
      const value = config[key](state?.[key], action);
      obj[key] = value;
    }

    return obj;
  };
}
