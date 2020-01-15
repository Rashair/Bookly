import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";
import { login } from "../../redux/thunk-functions";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

class LoginScreen extends React.Component {
  componentDidMount() {
    fetch("http://b3a59cf1.ngrok.io/cars").then(
      response => {
        if (response.ok) {
          response.json().then(x => console.log(x));
        }
      },
      error => console.log(`error${error}`)
    );
    console.log("I am here");
  }

  componentDidUpdate() {
    if (this.props.auth) {
      // TODO: Home here
      this.props.navigation.push("SearchParking");
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { login, password } = { login: "malostkowys", password: "blabla" };
    const randomMsg = utf16.parse("Keep it secret. Keep it safe");
    const hashDigest = sha3(password + randomMsg);
    const hash = Base64.stringify(hmacSHA512(hashDigest, login));

    const data = { login, password: hash };
    this.props.login(data);
  }

  render() {
    const { auth, navigation } = this.props;
    if (auth) {
      return (
        <View style={styles.container}>
          <Text>Hi {auth.firstName}</Text>
          <Button mode="contained" title="Next" onPress={() => navigation.navigate("SearchParking")} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Please log in!</Text>
        <Button mode="contained" title="Log in" onPress={e => this.handleSubmit(e)} />
      </View>
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
