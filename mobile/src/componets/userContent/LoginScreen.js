import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

class LoginScreen extends React.Component {
  componentDidMount() {
    fetch("http://b3a59cf1.ngrok.io/cars").then(
      response => {
        if (response.ok) {
          console.log("ff");
          response.json().then(x => console.log(x));
        }
      },
      error => console.log(error)
    );
    console.log("I am here");
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Please log in!</Text>
        <Button title="Log in" onPress={() => navigate('HomeScreen')} />
      </View>
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
