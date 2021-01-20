import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import allReducer from "./reducers";
import { Provider } from "react-redux";
import Routes from "./routes";

function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

const persistedState = loadFromSessionStorage();
const store = createStore(
  allReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
store.subscribe(() => saveToSessionStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
