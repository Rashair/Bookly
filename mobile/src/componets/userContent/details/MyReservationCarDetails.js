import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableHighlight, Modal } from "react-native";
import React from "react";
import { Title, Headline, Paragraph } from "react-native-paper";
import {styles} from '../../../styles'
import {sendRequest, createQueryParams} from '../../helpers/functions'
import {API_URL, TOKEN_HEADER_KEY, CARLY_API_URL} from '../../helpers/constants'

export default class MyReservationCarDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      Car : {},
      Comment : '',
      DateFrom : null ,
      DateTo: null,
      Cost :0,
      StatusType : null
    }
  }

  componentDidMount() {
    const params = createQueryParams({ id: this.props.FKid });
    const url = `${CARLY_API_URL}/reservations?${params.toString()}`;
    sendRequest(url, 'GET', { [TOKEN_HEADER_KEY]: this.props.carlyToken })
      .then(res => {
        console.log(res);
        if (res.ok) {
          res.json()
            .then(res => {
              this.setState({
                Car: res.car,
                Comment : res.comment,
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

  render() {
    return (
      <View>
        <Headline>Car reservation</Headline>        
        <View style={styles.container_reservationdetails}>
        <View style={styles.contentRow}>
          <Title>Date from : </Title>
          <Title> {this.state.DateFrom}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Date to : </Title>
          <Title>{this.state.DateTo}</Title>
        </View>
        <Text style={styles.marginBottomSmall}>
          Car details:
        </Text>
        <View style={styles.contentRow}>
          <Title>Make:</Title>
          <Title>{this.state.Car.Make} }</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Model:</Title>
          <Title>{this.state.Car.Model}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Seats:</Title>
          <Title>{this.state.Car.Seats}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Year of production:</Title>
          <Title>{this.state.Car.Year}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Number of doors:</Title>
          <Title>{this.state.Car.Doors}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>License:</Title>
          <Title>{this.state.Car.License}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Location:</Title>
          <Title>{this.state.Car.Location}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Total cost:</Title>
          <Title>{this.state.Cost} PLN</Title>
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