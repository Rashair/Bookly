import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View, Button } from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button title="My reservations" onPress={() => navigate("MyReservationsList")} />
        <Button title="Find flat" onPress={() => navigate("FlatsList")} />
        <Button title="Find car" />
        <Button title="Find parking" />
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
