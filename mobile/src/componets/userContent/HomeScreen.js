import React from "react";
import { StyleSheet, View, Button } from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button title="My reservations" onPress={() => navigate("MyReservationsList")} />
        <Button title="Find flat" onPress={() => navigate("SearchFlat")} />
        <Button title="Find car" onPress={() => navigate("SearchCar")} />
        <Button title="Find parking" onPress={() => navigate("SearchParking")} />
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
