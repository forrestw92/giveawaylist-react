import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

export function initializeStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      console.log("Replacing reducer");
      store.replaceReducer(require("./reducers").default);
    });
  }

  return store;
}
