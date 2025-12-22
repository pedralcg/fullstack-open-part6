import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

import App from "./App";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App store={store} />);
};

renderApp();
store.subscribe(renderApp);
