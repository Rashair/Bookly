import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View, Button } from "react-native";

export default class LoginScreen extends React.Component {
  componentDidMount() {
    fetch("http://af5cb023.ngrok.io/employees").then(
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Please log in!</Text>
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
