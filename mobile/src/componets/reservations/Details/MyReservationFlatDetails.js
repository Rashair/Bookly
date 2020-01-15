
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import React from 'react'

export default class MyReservationFlatDetails extends React.Component {
   
    constructor(props){
        super(props);
        this.cancelReservation = this.cancelReservation.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);

        this.state ={
          modalVisible : false
        }
    }
    setModalVisible(value){
      this.setState({modalVisible : value});
    }

    cancelReservation(){
      this.setState({modalVisible : false});
    }

    render() {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Do you want to cancel that reservation?</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.cancelReservation();
                  }}>
                  <Text>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
           


            {/* <Text>{this.props.getParam('Car', 'No car selected').Model}</Text> just to test passing params */}
            <TouchableHighlight onPress={() => {this.setModalVisible(true)}} >
              <Text>Cancel reservation</Text>
            </TouchableHighlight>
            {/* <Button title="Go back" onPress={() => this.props.navigation.goBack()} /> */}
        </View>
      );
    }
  }