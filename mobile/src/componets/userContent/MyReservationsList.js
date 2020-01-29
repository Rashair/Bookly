import React from "react";
import {connect} from 'react-redux'

import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import {ListItem} from 'react-native-elements'
import { Row, Container } from "native-base";
import { styles, themeColors} from '../../styles';
import {sendRequest, createQueryParams} from '../../helpers/functions'
import {API_URL, TOKEN_HEADER_KEY} from '../../helpers/constants'


const DATA = [
  // temporary solution to display data
  {
    id: 1,
    type: "car",
    externalId: 1,
    startDateTime: "10-02-2020",
    active : false,
    endDateTime : '20-02-2020'
  },
  {
    id: 2,
    type: "flat",
    startDateTime: "02-01-2020",
    externalId: 2,
    active : true,
    endDateTime : '20-02-2020'
  },
  {
    id: 3,
    type: "parking",
    startDateTime: "19-12-2019",
    externalId: 3,
    active : true,
    endDateTime : '20-02-2020'
  },
];


  class MyReservationList extends React.Component {
  constructor(props) {
    super(props);
    this.openDetails = this.openDetails.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      reservations: [],
    };
  }
  componentDidMount() {
    const params = createQueryParams({ userDetails: this.props.auth.securityToken });
    const bookingUrl = `${API_URL}/booking/user?${params.toString()}`;
    sendRequest(bookingUrl, 'GET', { [TOKEN_HEADER_KEY]: this.props.auth.securityToken })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(res => {
              this.setState({
                reservations: res
              })
            })
        }
      }
      )
      .catch(function (error) {
        //console.log(error);
        console.log(error.message);
      });
  }

  openDetails = (FKid, type, id, active) => {
    this.props.navigation.navigate("MyReservationDetails", {
      FKid: FKid,
      type: type,
      id: id,
      isActive : active
    });
  };

  renderItem({ item }) {
    let title;
    let imgsource;
    if(item.type=='cAR'){
      title= "Car reservation";
      imgsource = require("./assets/car.png");
    }
    if(item.type=='FLAT'){
      title="Flat reservation";
      imgsource = require("./assets/home.jpg");
    }
    if(item.type=='PARKING_SPACE'){
      title="Parking reservation";
      imgsource = require("./assets/parking.png");
    }
    return (
      <ListItem 
    title={title}
    subtitle={
      <View>
        <Text>{item.start_date_time} - {item.end_date_time}</Text>
      </View>} 
    leftAvatar={{source : imgsource, rounded: false}}
    onPress={()=>this.openDetails(item.external_id, item.type, item.id, item.active)}
    chevron
    />
    );
  }

  static navigationOptions = { title: "My reservations" };
  render() {
    return (
      <Container>
          <FlatList data={this.state.reservations} keyExtractor={item => item.id.toString()} renderItem={this.renderItem} />
      </Container>
    );
  }
}
const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(MyReservationList);