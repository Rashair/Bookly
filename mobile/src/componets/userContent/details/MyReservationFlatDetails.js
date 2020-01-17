import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from "react-native";

export default class MyReservationFlatDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const URL = "http://localhost:5000/car"; //?
    fetch(URL,
      {
        method: 'post',
        headers: {
          //add token?
        },
        body: JSON.stringify({
          id : this.props.FKid
        })
      })
      .then(response => 
        {

        }
        )
      .catch(function(error) {
        console.log(error.message);
      });
  }

  render() {
    return (
      <View>
        <Text>Flat Deatils</Text>
      </View>
    );
  }
}
