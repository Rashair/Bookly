import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View, Button } from "react-native";
import { styles, themeColors} from '../../styles'
import { Container } from "native-base";

export default class HomeScreen extends React.Component {

  static navigationOptions = { title: "Bookly" };
  render() {

    const { navigate } = this.props.navigation;
    return (
      <Container>
      <View style={styles.container_modal}>
        <Button style={styles.button} title="My reservations" onPress={() => navigate("MyReservationsList")} />
        <Button style={styles.button} title="Find flat" onPress={() => navigate("FlatsList")} />
        <Button style={styles.button} title="Find car" />
        <Button style={styles.button} title="Find parking" />
      </View>
      </Container>
    );
  }
}

