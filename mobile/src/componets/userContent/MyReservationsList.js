import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, FlatList, Image } from "react-native";
import {ListItem} from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Row, Container } from "native-base";
import { styles, themeColors} from '../../styles'
import { Paragraph } from "react-native-paper";
import {sendRequest} from '../../helpers/functions'

const DATA = [
  // temporary solution to display data
  {
    id: 1,
    type: "car",
    externalId: 1,
    startDateTime: "10=02-2020",
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


export default class MyReservationList extends React.Component {
  constructor(props) {
    super(props);
    this.openDetails = this.openDetails.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      reservations: [],
    };
  }

  componentDidMount() {
    // const ownerId = this.props.auth.id;

    // const bookingUrl = '${API_URL}/booking/user';
    // sendRequest(bookingUrl, 'get', { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, ownerId)
    //   .then(res => {
    //     if (res.ok) {
    //       response.json()
    //         .then(res => {
    //           console.log(res);
    //           this.setState({
    //             reservations: res
    //           })
    //         })
    //     }
    //   }
    //   )
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
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
    if(item.type=='car'){
      title= "Car reservation";
      imgsource = require("./assets/car.png");
    }
    if(item.type=='flat'){
      title="Flat reservation";
      imgsource = require("./assets/car.png");
    }
    if(item.type=='parking'){
      title="Parking reservation";
      imgsource = require("./assets/car.png");
    }
    return (
      <ListItem 
    title={title}
    subtitle={
      <View>
        <Text>{item.startDateTime} - {item.endDateTime}</Text>
      </View>} 
    leftAvatar={{source : imgsource}}
    onPress={()=>this.openDetails(item.externalId, item.type, item.id, item.active)}
    chevron
    />
    );
  }

  static navigationOptions = { title: "My reservations" };
  render() {
    return (
      <Container>
          <FlatList data={DATA} keyExtractor={item => item.id.toString()} renderItem={this.renderItem} />
      </Container>
    );
  }
}

