import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./AppContainer";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
