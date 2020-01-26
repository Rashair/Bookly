import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import {Button} from 'react-native-paper'
import { styles, themeColors} from '../../styles'
import { Container } from "native-base";

export default class HomeScreen extends React.Component {

  static navigationOptions = { title: "Bookly" };
  render() {

    const { navigate } = this.props.navigation;
    return (
      <Container>
      <View style={styles.container_modal}>
        <Button style={styles.button} color={themeColors.primary} mode="contained" onPress={() => navigate("MyReservationsList")}>My reservations</Button>
        <Button style={styles.button} color={themeColors.primary} mode="contained" onPress={() => navigate("FlatsList")}>Find flat</Button>
        <Button style={styles.button} color={themeColors.primary} mode="contained" >Find car</Button>
        <Button style={styles.button} color={themeColors.primary} mode="contained" >Find car</Button>
      </View>
      </Container>
    );
  }
}

