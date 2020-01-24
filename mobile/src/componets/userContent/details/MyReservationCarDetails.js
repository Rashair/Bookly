import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from "react-native";
import React from "react";
import { Title, Headline, Paragraph } from "react-native-paper";
import {styles} from '../../../styles'

export default class MyReservationCarDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      Car : {},
      BookingUserInfo : {},
      Comment : '',
      DateFrom : null ,
      DateTo: null,
      Cost :0,
      StatusType : null
    }
  }

  componentDidMount() {
    const URL = "http://localhost:5000/car/reservations/"+this.props.FKid; //?
    // fetch(URL,
    //   {
    //     method: 'get',
    //     headers: {
    //       //add token?
    //     },
    //     body: JSON.stringify({
    //       id : this.props.FKid
    //     })
    //   })
    //   .then(response => 
    //     {

    //     }
    //     )
    //   .catch(function(error) {
    //     console.log(error.message);
    //   });
  }

  render() {
    return (
      <View>
        <Headline>Car reservation</Headline>
        <View style={styles.contentRow}>
          <Title>Date from : </Title>
          <Paragraph>20-15-2020 {/* {this.state.DateFrom} */}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Date to : </Title>
          <Paragraph>25-15-2020 {/* {this.state.DateTo} */}</Paragraph>
        </View>
        <Text style={styles.marginBottomSmall}>
          Car details:
        </Text>
        <View style={styles.contentRow}>
          <Title>Make:</Title>
          <Paragraph>Skoda {/* {this.state.Car.Make} */}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Model:</Title>
          <Paragraph>Fabia {/*{this.state.Car.Model}*/}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Seats:</Title>
          <Paragraph>4 {/*{this.state.Car.Seats}*/}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Year of production:</Title>
          <Paragraph>1999 {/*{this.state.Car.Year}*/}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Number of doors:</Title>
          <Paragraph>4 {/*{this.state.Car.Doors}*/}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>License:</Title>
          <Paragraph>None {/*{this.state.Car.License}*/}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Location:</Title>
          <Paragraph>Nice {/*{this.state.Car.Location}*/}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Total cost:</Title>
          <Paragraph>100 $ {/*{this.state.Cost}*/}</Paragraph>
        </View>
      </View>
    );
  }
}
