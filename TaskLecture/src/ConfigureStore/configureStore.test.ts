import { configureStore, reducer, Store } from "./configureStore";
import * as actionTypes from "./actionTypes";

describe("configureStore", () => {
  it("is a function", () => {
    expect(configureStore).toBeInstanceOf(Function);
  });

  describe("has an interface:", () => {
    let store: Store;
    beforeEach(() => (store = configureStore(reducer)));

    it("returns store instance", () => {
      expect(store).toBeTruthy();
      expect(store.getState).toBeInstanceOf(Function);
      expect(store.dispatch).toBeInstanceOf(Function);
      expect(store.subscribe).toBeInstanceOf(Function);
    });

    it("defines correct initial state", () => {
      expect(store.getState()).toEqual({
        result: 0,
        counter: 0,
      });
    });

    describe("store operates with result", () => {
      it(`it handles ${actionTypes.ADD} action`, () => {
        store.dispatch({
          type: actionTypes.ADD,
          payload: 5,
        });
        expect(store.getState()).toMatchObject({
          result: 5,
        });
        store.dispatch({
          type: actionTypes.ADD,
          payload: -2,
        });
        expect(store.getState()).toMatchObject({
          result: 3,
        });
        store.dispatch({
          type: actionTypes.ADD,
          payload: 0,
        });
        expect(store.getState()).toMatchObject({
          result: 3,
        });
      });
      it(`it handles ${actionTypes.RESET} action`, () => {
        store.dispatch({
          type: actionTypes.ADD,
          payload: 5,
        });
        expect(store.getState()).toMatchObject({
          result: 5,
        });
        store.dispatch({
          type: actionTypes.RESET,
        });
        expect(store.getState()).toMatchObject({
          result: 0,
        });
      });
      it(`it handles ${actionTypes.MULTIPLY} action`, () => {
        store.dispatch({
          type: actionTypes.ADD,
          payload: 1,
        });
        expect(store.getState()).toMatchObject({
          result: 1,
        });
        store.dispatch({
          type: actionTypes.MULTIPLY,
          payload: 3,
        });
        expect(store.getState()).toMatchObject({
          result: 3,
        });
        store.dispatch({
          type: actionTypes.MULTIPLY,
          payload: 2,
        });
        expect(store.getState()).toMatchObject({
          result: 6,
        });
      });
      it(`it handles mix of actions`, () => {
        store.dispatch({
          type: actionTypes.ADD,
          payload: 1,
        });
        expect(store.getState()).toMatchObject({
          result: 1,
        });
        store.dispatch({
          type: actionTypes.MULTIPLY,
          payload: 3,
        });
        expect(store.getState()).toMatchObject({
          result: 3,
        });
        store.dispatch({
          type: actionTypes.ADD,
          payload: 2,
        });
        expect(store.getState()).toMatchObject({
          result: 5,
        });
        store.dispatch({
          type: actionTypes.RESET,
        });
        expect(store.getState()).toMatchObject({
          result: 0,
        });
        store.dispatch({
          type: actionTypes.MULTIPLY,
          payload: 3,
        });
        expect(store.getState()).toMatchObject({
          result: 0,
        });
      });
      it(`it handles unknown actions action`, () => {
        store.dispatch({
          type: actionTypes.ADD,
          payload: 5,
        });
        expect(store.getState()).toMatchObject({
          result: 5,
        });
        store.dispatch({
          type: "Some unknown action " + Date.now(),
          payload: -2,
        });
        expect(store.getState()).toMatchObject({
          result: 5,
        });
      });
    });
    describe("store operates with counter", () => {
      const knownActions = [
        actionTypes.ADD,
        actionTypes.MULTIPLY,
        actionTypes.RESET,
      ];
      it("calculates all known operations", () => {
        knownActions.forEach((type, index) => {
          store.dispatch({
            type: type,
            payload: Date.now(),
          });
          expect(store.getState()).toMatchObject({
            counter: index + 1,
          });
        });
      });
      it("ignores unknown operations", () => {
        knownActions.forEach((type, index) => {
          store.dispatch({
            type: type,
            payload: Date.now(),
          });
          expect(store.getState()).toMatchObject({
            counter: index + 1,
          });
          store.dispatch({
            type: "Some uknown type " + Math.random(),
          });
          expect(store.getState()).toMatchObject({
            counter: index + 1,
          });
        });
      });
    });

    it("does not mutate state", () => {
      const states = [store.getState()];
      let state;
      store.dispatch({
        type: actionTypes.ADD,
        payload: 1,
      });
      state = store.getState();
      expect(states.indexOf(state)).toBe(-1);
      states.push(state);

      store.dispatch({
        type: actionTypes.MULTIPLY,
        payload: 3,
      });
      state = store.getState();
      expect(states.indexOf(state)).toBe(-1);
      states.push(state);
    });

    it("calls subscribers on every change", () => {
      const subscriber1 = jest.fn();
      const subscriber2 = jest.fn();
      store.subscribe(subscriber1);
      store.subscribe(subscriber2);

      store.dispatch({
        type: actionTypes.ADD,
        payload: 1,
      });
      store.dispatch({
        type: actionTypes.MULTIPLY,
        payload: 3,
      });
      expect(subscriber1).toHaveBeenCalledTimes(2);
      expect(subscriber2).toHaveBeenCalledTimes(2);
    });
  });
});
