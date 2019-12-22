import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../redux/reducers";
import Bookings from "./Bookings";

const store = createStore(rootReducer, {}, composeWithDevTools());

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" />
        <Route path="/bookings">
          <Bookings />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
