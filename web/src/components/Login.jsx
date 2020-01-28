import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import { login } from "../redux/thunk-functions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
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

    const { login, password } = this.state;
    const randomMsg = utf16.parse("Keep it secret. Keep it safe");
    const hashDigest = sha3(password + randomMsg);
    const hash = Base64.stringify(hmacSHA512(hashDigest, login));

    const data = { login: this.state.login, password: hash };
    this.props.login(data);
  }

  render() {
    const { auth } = this.props;

    if (auth !== null) {
      return <div className="w-50 text-center"> Hi {auth.firstName}!</div>;
    }

    return (
      <div className="w-50" onSubmit={this.handleSubmit}>
        <form className="form-signin">
          <h3 className="h3 mb-4 font-weight-normal">Please sign in</h3>
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
            className="form-control mt-2"
            placeholder="Password"
            required="required"
            onChange={this.passwordChange}
          />
          <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
