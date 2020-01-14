import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { login } from "../../redux/thunk-functions";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://b3a59cf1.ngrok.io/cars").then(
      response => {
        if (response.ok) {
          console.log("ff");
          response.json().then(x => console.log(x));
        }
      },
      error => console.log("ff")
    );
    console.log("I am here");
  }

  componentDidUpdate() {
    if (this.props.auth) {
      // TODO: Home here
      this.props.navigation.navigate("SearchParking");
      return;
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
          <Button mode="contained" title="Next" onPress={e => navigation.navigate("SearchParking")}>
            Next
          </Button>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Please log in!</Text>
        <Button mode="contained" title="Log in" onPress={e => this.handleSubmit(e)}>
          Log in
        </Button>
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
