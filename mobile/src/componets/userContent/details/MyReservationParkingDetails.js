
import { View,} from 'react-native';
import { Title, Paragraph, Headline } from 'react-native-paper';
import React from 'react';
import  {sendRequest} from '../../../helpers/functions';
import {styles} from '../../../styles'

export default class MyReservationParkingDetails extends React.Component {
   
    constructor(props){
        super(props);

        this.state={
          DateFrom : '20.02.2020',
          DateTo: '25.02.2020',
          TotalCost: 1000,
          City : 'New York',
          Street : 'Park Avenue',
          StreetNumber :55
        };
    }

    componentDidMount(){
      const URL = "/reservations/" + this.props.FKid; //?
      // sendRequest(URL, 'get', '')
    //   .then(response => {
    //     if(response.ok){
    //       response.json()
    //       .then(res=>{
    //         this.setState({
    //           CreationDate :  res.createdAt,
    //           DateFrom: res.dateFrom.toString(),
    //           DateTo: res.dateTo.toString(),
    //           TotalCost: res.totalCost,
    //           City: res.city,
    //           Street: res.street,
    //           StreetNumber: res.streetNumber
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
          Parking Details
        </Headline>
        <View style={styles.container_reservationdetails}>   
        <View style={styles.contentRow}>
          <Title>Date from:</Title>
          <Title>{this.state.DateFrom}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Date to:</Title>
          <Title>{this.state.DateTo}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>City:</Title>
          <Title>{this.state.City}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Street:</Title>
          <Title>{this.state.Street}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Street number:</Title>
          <Title>{this.state.StreetNumber}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Price</Title>
          <Title>{this.state.TotalCost} PLN / night</Title>
        </View>
        </View>
      </View>
      );
    }
  }