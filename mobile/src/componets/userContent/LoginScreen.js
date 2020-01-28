import React from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import { Container, Content } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

import { white } from "react-native-paper/lib/commonjs/styles/colors";
import { login } from "../../redux/thunk-functions";

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: white,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

class LoginScreen extends React.Component {
  static navigationOptions = { title: "Login, dear!" };

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
    };
  }

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.navigation.navigate("Home");
    }
  }

  setLogin(login) {
    // will be useful if login will contain @
    //  login.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
    this.setState({
      login, // ,
      loginValid: login.length > 0,
    });
  }

  setPassword(password) {
    this.setState({
      password,
      passwordValid: password.length >= 6,
    });
  }

  errorMessage(field) {
    switch (field) {
      case "Login":
        return "Login name incorrect";
      case "Password":
        return "Please, enter password";
      default:
        return "";
    }
  }

  handleSubmit() {
    // TODO: Check if password and login valid here (user may not changed it)

    const { login, password } = this.state;
    const randomMsg = utf16.parse("Keep it secret. Keep it safe");
    const hashDigest = sha3(password + randomMsg);
    const hash = Base64.stringify(hmacSHA512(hashDigest, login));

    const data = { login, password: hash };
    // For this to work, you must change API_URL in helpers/constants to your ngrok url
    this.props.login(data);
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Title>Login</Title>
          <TextInput
            mode="outlined"
            style={styles.backgroundWhite}
            onChangeText={text => this.setLogin(text)}
            value={this.state.login}
          />
          <HelperText type="error" visible={!this.state.loginValid}>
            {this.errorMessage("Login")}
          </HelperText>

          <Title>Password</Title>
          <TextInput
            secureTextEntry
            mode="outlined"
            style={styles.backgroundWhite}
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
            <Text> Login</Text>
          </Button>
        </Content>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
