
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import React from 'react'
import MyReservationCarDetails from './MyReservationCarDetails';
import MyReservationFlatDetails from './MyReservationFlatDetails';
import MyReservationParkingDetails from './MyReservationParkingDetails';

export default class MyReservationDetails extends React.Component {
   
    constructor(props){
        super(props);
        // this.cancelReservation = this.cancelReservation.bind(this);
        // this.setModalVisible = this.setModalVisible.bind(this);

        this.state ={
          modalVisible : false
        }
    }
   
    render() {
        let body;
        if(this.props.navigation.getParam('type')==='car'){
           
                body = <MyReservationCarDetails FKid = {this.props.navigation.getParam('FKid')} />
        }
        else if(this.props.navigation.getParam('type')==='flat'){
               body =  <MyReservationFlatDetails FKid = {this.props.navigation.getParam('FKid')} />
        }
        else if (this.props.navigation.getParam('type')==='parking'){
                body =<MyReservationParkingDetails FKid = {this.props.navigation.getParam('FKid')} />
        }
        return(
            <View>
                {body}   
                </View>
        );   
    }
  }