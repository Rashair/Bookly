import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Row } from "native-base";
import { styles, themeColors} from '../../styles'
import { Paragraph } from "react-native-paper";

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

function MyReservationItem({ DateFrom, FKid, type, navigation }) {
  let image;
  // if(type === 'car'){
  image = <Image style={{width: 50, height: 50}} source={require("./assets/car.png")} />;
  // }
  return (
    <TouchableOpacity style={styles.marginBottomSmall} onPress={navigation} >
      <View style={styles.contentRow}>
      {image}
      <Paragraph>{DateFrom}</Paragraph>
      <Paragraph>{FKid}</Paragraph>
      </View>
    </TouchableOpacity>
  );
}

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
    //fetch
  }

  openDetails = (FKid, type, id) => {
    this.props.navigation.navigate("MyReservationDetails", {
      FKid: FKid,
      type: type,
      id: id,
    });
  };

  renderItem({ item }) {
    return (
      <MyReservationItem
        DateFrom={item.DateFrom}
        FKid={item.FKid}
        type={item.type}
        navigation={() => this.openDetails(item.FKid, item.type, item.id)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Here will be reservation list !</Text>
        <FlatList data={DATA} keyExtractor={item => item.id.toString()} renderItem={this.renderItem} />
      </View>
    );
  }
}

