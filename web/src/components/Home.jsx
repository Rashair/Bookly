import React from "react";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import Bookings from "./Bookings";
import Login from "./Login";
import Forbidden from "./Forbidden";

class Home extends React.Component {
  render() {
    return (
      <div className="container h-100 text-center p-4">
        <h2> Bookly Admin </h2>
        <div className="row justify-content-center align-content-center mt-5">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/bookings" component={Bookings} />
            <Route path="/error" component={Forbidden} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Home);
