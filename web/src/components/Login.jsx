import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "../redux/thunk-functions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };

    this.loginChange = this.loginChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.auth === null) {
      return;
    }

    this.props.history.push("/bookings");
  }

  loginChange(e) {
    this.setState({ login: e.target.value });
  }

  passwordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // TODO: hash password
    const data = { login: this.state.login, password: this.state.password };
    this.props.login(data);
  }

  render() {
    const { auth } = this.props;

    if (auth !== null) {
      return <div className="w-50 text-center"> Hi {auth.first_name}!</div>;
    }

    return (
      <div className="w-50" onSubmit={this.handleSubmit}>
        <form className="form-signin">
          <h3 className="h3 mb-3 font-weight-normal">Please sign in</h3>
          <label htmlFor="inputLogin" className="sr-only">
            Login
          </label>
          <input
            type="text"
            id="inputLogin"
            className="form-control"
            placeholder="Login"
            required="required"
            onChange={this.loginChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required="required"
            onChange={this.passwordChange}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  login: name => dispatch(login(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
