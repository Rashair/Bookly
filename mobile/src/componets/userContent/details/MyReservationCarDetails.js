import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Title, Headline, Paragraph } from "react-native-paper";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";
import {styles} from '../../../styles'
import {sendRequest, createQueryParams} from '../../../helpers/functions'
import {TOKEN_HEADER_KEY, CARLY_API_URL} from '../../../helpers/constants'

class MyReservationCarDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      Car : {},
      DateFrom : '00 -00 -00Tjj' ,
      DateTo: '00 -00 -00Tjj',
      Cost :0,
      StatusType : null
    }
  }

  componentDidMount() {
    const url = `${CARLY_API_URL}/reservations/${this.props.FKid}`;
    const headers = {
      Authorization: this.props.carlyToken,
    };

    sendRequest(url, "GET", headers)
      .then(result => {
        if (result.ok) {
          result.json().then(res => {
              this.setState({
                Car: res.carDTO,
                DateFrom : res.dateFrom,
                DateTo: res.dateTo,
                Cost: res.cost
              })
            })
        }
      }
      )
      .catch(function (error) {
        console.log(error.message);
        this.props.anyError(error);
      });

  }

  getDate(datestring){
    let date = datestring.split('-');
    let day = date[2].split('T')[0];
    return day+'/'+date[1]+'/'+date[0];
    }

  render() {
    return (
      <View>
        <Headline>Car reservation</Headline>        
        <View style={styles.container_reservationdetails}>
        <View style={styles.contentRow}>
          <Title>Date from : </Title>
          <Title> {this.getDate(this.state.DateFrom)}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Date to : </Title>
          <Title>{this.getDate(this.state.DateTo)}</Title>
        </View>
        <Title style={styles.marginBottomSmall}>
          Car details:
        </Title>
        <View style={styles.contentRow}>
          <Title>Make:</Title>
          <Title>{this.state.Car.make} </Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Model:</Title>
          <Title>{this.state.Car.model}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Seats:</Title>
          <Title>{this.state.Car.seats}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Year of production:</Title>
          <Title>{this.state.Car.year}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Licence:</Title>
          <Title>{this.state.Car.licence}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Location:</Title>
          <Title>{this.state.Car.location}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Total cost:</Title>
          <Title>{this.state.Car.price} PLN</Title>
        </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state ) => {
  return {
    carlyToken : state.carlyToken
  };
};
const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReservationCarDetails);