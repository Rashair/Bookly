import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Title, Paragraph, Headline } from 'react-native-paper';
import {sendRequest} from '../../../helpers/functions'
import {styles} from '../../../styles'

export default class MyReservationFlatDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      Description : 'test',
      People :10,
      StartDate : '20.02.2020',
      EndDate: '27.02.2020',
      Title: ' My new Flat',
      Beds: 10,
      Price: 1000,
      City: 'Paris',
      Address: 'La Rue',
      Country: 'France'
    }
  }

  componentDidMount() {
    const URL = "BookingDetails/" + this.props.FKid; //?
    // sendRequest(URL, 'get', '')
    //   .then(response => {
    //     if(response.ok){
    //       response.json()
    //       .then(res=>{
    //         this.setState({
    //           Description: res.description,
    //           People: res.people,
    //           StartDate: res.start_date.toString(),
    //           EndDate: res.end_date.toString(),
    //           Title: res.title,
    //           Beds: res.beds,
    //           Price: res.price,
    //           City: res.city,
    //           Address: res.address,
    //           Country: res.country
    //         })
    //       })
    //     }
    //     }
    //     )
    //   .catch(function(error) {
    //     console.log(error.message);
    //   });
  }

  render() {
    return (
      <View>
        <Headline>
          {this.state.Title}
        </Headline>
        <Text>
          {this.state.Country} , {this.state.City}, {this.state.Address}
        </Text>
        <View style={[styles.contentColumn, styles.marginBottomSmall]}>
          <Title>Description</Title>
          <Paragraph>{this.state.Description}</Paragraph>
        </View>
        <View style={styles.contentRow}>
          <Title>Beds</Title>
          <Title>{this.state.Beds}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Date from:</Title>
          <Title>{this.state.StartDate}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Date to:</Title>
          <Title>{this.state.EndDate}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Price</Title>
          <Title>{this.state.Price} PLN / night</Title>
        </View>
      </View>
    );
  }
}
