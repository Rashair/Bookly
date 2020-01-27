import React from "react";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./src/redux/reducers";
import AppContainer from "./src/AppContainer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
