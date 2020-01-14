
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import React from 'react'


export default class MyReservationParkingItem extends React.Component {
   
    constructor(props){
        super(props);
    }

    render() {
      return (
        <View>
            <Image source={require('./assets/car.png')} />  {/* here will be custom icon */}
            <Text>{this.props.DateFrom}</Text>
        </View>
      );
    }
  }