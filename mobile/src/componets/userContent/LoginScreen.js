import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import { Container, Header, Content, DatePicker, Text, Picker, Form } from "native-base";
import { TextInput, Subheading, List, Card, HelperText, Title, Chip, Button } from "react-native-paper";

import { login } from "../../redux/thunk-functions";

class LoginScreen extends React.Component {
  static navigationOptions = { title: "Login, dear!:P" };
  constructor(props) {
    super(props);

    this.setPassword = this.setPassword.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      login: "",
      password: "",
      loginValid: true,
      passwordValid: true,
      formValid: false,
    };
  }

  setLogin(login) {
    //will be useful if login will contain @
    //  login.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
    this.setState({
      login: login, //,
      loginValid: login.length > 0 ? true : false,
    });
    console.log(login);
  }

  setPassword(password) {
    this.setState({
      password: password,
      passwordValid: password.length >= 6 ? true : false,
    });
  }
  errorMessage(field) {
    switch (field) {
      case "Login":
        return "Login name incorrect";
      case "Password":
        return "Please, enter password";
    }
  }
  componentDidMount() {}

  handleSubmit() {
    // e.preventDefault();

    const { login, password } = this.state;
    const randomMsg = utf16.parse("Keep it secret. Keep it safe");
    const hashDigest = sha3(password + randomMsg);
    const hash = Base64.stringify(hmacSHA512(hashDigest, login));

    const data = { login: login, password: hash };
    // For this to work, you must change API_URL in helpers/constants to your ngrok url
    this.props.login(data);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
          <Title>Login</Title>
          <TextInput
            mode="outlined"
            style={{ backgroundColor: "white" }}
            onChangeText={text => this.setLogin(text)}
            value={this.state.login}
          />
          <HelperText type="error" visible={!this.state.loginValid}>
            {this.errorMessage("Login")}
          </HelperText>
          <Title>Password</Title>
          <TextInput
            secureTextEntry={true}
            style={styles.default}
            mode="outlined"
            style={{ backgroundColor: "white" }}
            onChangeText={text => this.setPassword(text)}
            value={this.state.password}
          />
          <HelperText type="error" visible={!this.state.passwordValid}>
            {this.errorMessage("Password")}
          </HelperText>

          <Button
            mode="contained"
            disabled={!(this.state.loginValid && this.state.passwordValid)}
            onPress={this.handleSubmit}
          >
            > Login
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
