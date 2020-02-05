import { View, Modal } from "react-native";
import { Button, Title } from "react-native-paper";
import { Container } from "native-base";
import React from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import MyReservationCarDetails from "./MyReservationCarDetails";
import MyReservationFlatDetails from "./MyReservationFlatDetails";
import MyReservationParkingDetails from "./MyReservationParkingDetails";
import { styles, themeColors } from "../../../styles";
import {
  API_URL,
  CARLY_API_URL,
  PARKLY_API_URL,
  TOKEN_HEADER_KEY,
  PARKLY_LOGIN_HEADER_KEY,
  PARKLY_LOGIN_HEADER_VALUE,
  PARKLY_TOKEN_HEADER_KEY,
} from "../../../helpers/constants";

import { sendRequest } from "../../../helpers/functions";

class MyReservationDetails extends React.Component {
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
    const fkid = this.props.navigation.getParam("FKid");
    const type = this.props.navigation.getParam("type");
    const id = this.props.navigation.getParam("id");
    let result;
    if (type === "CAR") {
      result = this.cancelCarReservation(fkid, id);
    } else if (type === "FLAT") {
      result = this.cancelFlatReservation(fkid);
    } else {
      result = this.cancelParkingReservation(fkid, id);
    }
  }

  cancelCarReservation(fkid, id) {
    const headers = {
      Authorization: this.props.carlyToken,
    };
    const carlyUrl = `${CARLY_API_URL}/reservations/${fkid}`;
    sendRequest(carlyUrl, 'delete', headers)
      .then(res => {
        if (res.ok) {
          return this.cancelReservationInBookly(id);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  cancelParkingReservation(fkid, id) {
    const headers = {
      [PARKLY_LOGIN_HEADER_KEY]: [PARKLY_LOGIN_HEADER_VALUE],
      [PARKLY_TOKEN_HEADER_KEY]: this.props.parklyToken,
    };
    const URL = `${PARKLY_API_URL}/reservations/${fkid}`;
    sendRequest(URL, "DELETE", headers)
      .then(response => {
        if (response.ok) {
          return this.cancelReservationInBookly(id);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  cancelFlatReservation(fkid) {
    // chyba brak
  }

  cancelReservationInBookly(id) {
    const bookingUrl = `${API_URL}/booking/${id}`;
    sendRequest(bookingUrl, "delete", { [TOKEN_HEADER_KEY]: this.props.auth.securityToken })
      .then(response => {
        if (response.ok) {
          response.json().then(res => {
            if (res.deleted == true) {
              this.props.navigation.navigate("MyReservationsList");
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error.message);
        this.props.anyError(error);
      });
  }

  // eslint-disable-next-line react/sort-comp
  static navigationOptions = { title: "Reservation Details" };

  render() {
    let body;
    const type = this.props.navigation.getParam("type");
    const fkid = this.props.navigation.getParam("FKid");
    if (type === "CAR") {
      body = <MyReservationCarDetails FKid={fkid} />;
    } else if (type === "FLAT") {
      body = <MyReservationFlatDetails FKid={fkid} />;
    } else if (type === "PARKING_SPACE") {
      body = <MyReservationParkingDetails FKid={fkid} />;
    }
    let button;
    if (this.props.navigation.getParam("isActive") == true) {
      button=<Button
        color={themeColors.primary}
        style={styles.button}
          mode="contained"
        onPress={() => {
        this.setModalVisible(true);
          }}
        >
          Cancel reservation
        </Button>
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
            <Button
              color={themeColors.danger}
              style={styles.button}
              onPress={() => {
                this.cancelReservation();
              }}
              mode="contained"
            >
              Yes
            </Button>
            <Button
              color={themeColors.secondary}
              mode="contained"
              style={styles.button}
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              No
            </Button>
          </View>
        </Modal>

        <ScrollView contentContainerStyle={styles.container_reservationdetailsmain}>
          {body}
          <View style={styles.button_bottompage}>{button}</View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    parklyToken: state.parklyToken,
    carlyToken: state.carlyToken,
    flatlyToken: state.flatlyToken,
  };
};
const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyReservationDetails);
