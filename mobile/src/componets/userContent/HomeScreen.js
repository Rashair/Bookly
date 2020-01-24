import React from "react";
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
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
