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
    FKid: 1,
    DateFrom: " today",
  },
  {
    id: 2,
    type: "flat",
    DateFrom: "tommorow",
    FKid: 2,
  },
  {
    id: 3,
    type: "parking",
    DateFrom: "never",
    FKid: 3,
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
    const URL = "BookingDetails/" + this.props.FKid; //?
    // sendRequest(URL, 'get', '')
    //   .then(response => {
    //     if(response.ok){
    //       response.json()
    //       .then(res=>{
    //         console.log(res);
    //         this.setState({
    //           reservations : res
    //         })
    //       })
    //     }
    //     }
    //     )
    //   .catch(function(error) {
    //     console.log(error.message);
    //   });
  }

  openDetails = (FKid, type, id) => {
    this.props.navigation.navigate("MyReservationDetails", {
      FKid: FKid,
      type: type,
      id: id,
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
    subtitle={item.DateFrom}
    leftAvatar={{source : imgsource}}
    onPress={()=>this.openDetails(item.FKid, item.type, item.id)}
    chevron
    />
    );
  }

  static navigationOptions = { title: "My reservations" };
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <FlatList data={DATA} keyExtractor={item => item.id.toString()} renderItem={this.renderItem} />
        </View>
      </Container>
    );
  }
}

