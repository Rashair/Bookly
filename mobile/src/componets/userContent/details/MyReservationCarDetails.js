import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from "react-native";
import React from "react";

export default class MyReservationCarDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      Car : {},
      BookingUserInfo : {},
      Comment : '',
      DateFrom : null ,
      DateTo: null,
      StatusType : null
    }
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
        <Text>Car reservation</Text>
        <Text>User : Gal Anonim {/* {this.state.BookingUserInfo.Name} {this.state.BookingUserInfo.Surname} */}</Text>
        <Text>Date from : 20-15-2020 {/* {this.state.DateFrom} */}</Text>
        <Text>Date to : 25-15-2020 {/* {this.state.DateTo} */}</Text>
        <Text>Car details</Text>
        <Text>Make : Skoda {/* {this.state.Car.Make} */}</Text>
        <Text>Model : Fabia {/*{this.state.Car.Model}*/}</Text>
        <Text>Seats : 4 {/*{this.state.Car.Seats}*/}</Text>
        <Text>Year of production : 1999 {/*{this.state.Car.Year}*/}</Text>
        <Text>Number of doors : 4 {/*{this.state.Car.Doors}*/}</Text>
        <Text>License : None {/*{this.state.Car.License}*/}</Text>
        <Text>Location : Nice {/*{this.state.Car.Location}*/}</Text>
        <Text>Extra comments : Nothing to add {/* {this.state.Comment} */}</Text>
      </View>
    );
  }
}
