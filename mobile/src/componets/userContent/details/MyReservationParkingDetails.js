import { View } from "react-native";
import { Title, Headline } from "react-native-paper";
import React from "react";
import { connect } from "react-redux";
import { sendRequest } from "../../../helpers/functions";
import { styles } from "../../../styles";
import {
  PARKLY_API_URL,
  PARKLY_LOGIN_HEADER_KEY,
  PARKLY_TOKEN_HEADER_KEY,
  PARKLY_LOGIN_HEADER_VALUE,
} from "../../../helpers/constants";

class MyReservationParkingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DateFrom: "00 -00 -00Tjj",
      DateTo: "00 -00 -00Tjj",
      TotalCost: 1000,
      City: "New York",
      Street: "Park Avenue",
      StreetNumber: 55,
    };
  }

  componentDidMount() {
      const headers = {
        [PARKLY_LOGIN_HEADER_KEY]: [PARKLY_LOGIN_HEADER_VALUE],
        [PARKLY_TOKEN_HEADER_KEY]: this.props.parklyToken,
      };
      const URL = `${PARKLY_API_URL}/reservations/${this.props.FKid}`;
      sendRequest(URL, 'GET', headers)
      .then(response => {      
        if(response.ok){
          response.json()
          .then(res=>{

            this.setState({
              CreationDate: res.createdAt,
              DateFrom: res.dateFrom.toString(),
              DateTo: res.dateTo.toString(),
              TotalCost: res.totalCost,
              City: res.city,
              Street: res.street,
              StreetNumber: res.streetNumber,
            });
          });
        }
      })
      .catch(function(error) {
        console.log(error);
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
        <Headline>
          Parking Details
        </Headline>
        <View style={styles.container_reservationdetails}>   
        <View style={styles.contentRow}>
          <Title>Date from:</Title>
          <Title>{this.getDate(this.state.DateFrom)}</Title>
        </View>
        <View style={styles.contentRow}>
          <Title>Date to:</Title>
          <Title>{this.getDate(this.state.DateTo)}</Title>
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
          <Title>Total cost:</Title>
          <Title>{this.state.TotalCost} PLN</Title>
        </View>

        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    parklyToken: state.parklyToken,
  };
};
const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReservationParkingDetails);
