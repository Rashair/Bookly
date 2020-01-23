
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import React from 'react'

export default class MyReservationParkingDetails extends React.Component {
   
    constructor(props){
        super(props);

        this.state={
          DateFrom : null,
          DateTo: null,
          TotalCost =0,
          City : '',
          Street : '',
          StreetNumber :0
        };
    }

    componentDidMount(){
      const URL = "http://localhost:5000/car/reservations" + this.props.FKid; //?
      fetch(URL,
        {
          method: 'get',
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
          <Text>Parking details</Text>
          <Text>Date From : 20.02.2020 {/* this.state.DateFrom */}</Text>
          <Text>Date To: 25.02.2020 {/* this.state.DateTo */}</Text>
          <Text>City : New York {/* this.state.City */}</Text>
          <Text>Street : Park Avenue {/* this.state.Street */}</Text>
          <Text>Street number : 55 {/* this.state.StreetNumber */}</Text>
          <Text>Total cost ; 100 {/* this.state.TotalCost */}</Text>
        </View>
      );
    }
  }