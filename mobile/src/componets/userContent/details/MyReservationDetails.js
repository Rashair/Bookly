import { View, Modal, Button } from "react-native";
import {Container, Text} from 'native-base'
import React from "react";
import MyReservationCarDetails from "./MyReservationCarDetails";
import MyReservationFlatDetails from "./MyReservationFlatDetails";
import MyReservationParkingDetails from "./MyReservationParkingDetails";
import { ScrollView } from "react-native-gesture-handler";
import {styles} from '../../../styles'
import { Title } from "react-native-paper";

export default class MyReservationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);

    this.state = {
      modalVisible: false,
    };
  }
  setModalVisible(value) {
    this.setState({ modalVisible: value });
  }

  cancelReservation() {
    this.setState({ modalVisible: false });
    let fkid = this.props.navigation.getParam("FKid");
    let type = this.props.navigation.getParam("type");
    let id = this.props.navigation.getParam("id");
    let result;
    if (type === "car") {
      result = this.cancelCarReservation(fkid, id);
    } else if (type === "flat") {
      result = this.cancelFlatReservation(fkid);
    } else {
      result = this.cancelParkingReservation(fkid, id);
    }
  }
  cancelCarReservation(fkid, id) {
    // const carlyUrl = '${API_URL}/reservations/';
    // sendRequest(carlyUrl, 'delete', { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, fkid)
    //   .then(res => {
    //     if (res.ok) {
    //       response.json()
    //         .then(res => {
    //           return this.cancelReservationInBookly(id);
    //         })
    //     }
    //   }
    //   )
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  }
  cancelParkingReservation(fkid, id) {
    // const parklyUrl = '${API_URL}/reservations/';
    // sendRequest(parklyUrl, 'delete', { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, fkid)
    //   .then(res => {
    //     if (res.ok) {
    //       response.json()
    //         .then(res => {
    //           return this.cancelReservationInBookly(id);
    //         })
    //     }
    //   }
    //   )
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  }
  cancelFlatReservation(fkid) {
    //chyba brak
  }
  cancelReservationInBookly(id) {

    // const bookingUrl = '${API_URL}/booking/';
    // sendRequest(bookingUrl, 'delete', { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, id)
    //   .then(res => {
    //     if (res.ok) {
    //       response.json()
    //         .then(res => {
    //           if(res.deleted == true){
    //             this.props.navigation.navigate("MyReservationsList");
    // }           
    //         })
    //     }
    //   }
    //   )
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  }

  static navigationOptions = { title: "Reservation Details" };
  render() {
    let body;
    let type= this.props.navigation.getParam("type");
    let fkid = this.props.navigation.getParam("FKid");
    if (type === "car") {
      body = <MyReservationCarDetails FKid={fkid} />;
    } else if (type === "flat") {
      body = <MyReservationFlatDetails FKid={fkid } />;
    } else if (type === "parking") {
      body = <MyReservationParkingDetails FKid={fkid} />;
    }
    let button;
    if(this.props.navigation.getParam("isActive")==true){
      button=<Button
      onPress={() => {
        this.setModalVisible(true);
      }} title="Cancel reservation"
    />;
    }
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.container_modal}>
              <Title>Do you want to cancel that reservation? This reservation won't be visible anymore.</Title>
              <Button style={styles.button}
                onPress={() => {
                  this.cancelReservation();
                }}
                mode="contained"
                title="Yes"
              />
              <Button style={styles.button}
                onPress={() => {
                  this.setModalVisible(false);
                }}
                title="No"
              />
          </View>
        </Modal>
        
        <ScrollView contentContainerStyle={styles.container_reservationdetailsmain}>
          {body}
          <View style={styles.button_bottompage}>
          {button} 
          </View>         
        </ScrollView>
      </Container>
    );
  }
}


