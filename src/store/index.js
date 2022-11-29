import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers/index";

export const store = createStore(rootReducer, {});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
