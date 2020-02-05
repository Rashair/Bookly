import React from "react";
import { connect } from "react-redux";

import { Text, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Container } from "native-base";
import { sendRequest, createQueryParams } from "../../helpers/functions";
import { API_URL, TOKEN_HEADER_KEY } from "../../helpers/constants";

class MyReservationList extends React.Component {
  constructor(props) {
    super(props);
    this.openDetails = this.openDetails.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      reservations: [],
    };
  }

  componentDidMount(){
    const params = createQueryParams({ userDetails: this.props.auth.securityToken });
    const bookingUrl = `${API_URL}/booking/user?${params.toString()}`;
    sendRequest(bookingUrl, 'GET', { [TOKEN_HEADER_KEY]: this.props.auth.securityToken })
      .then(res => {
        if (res.ok) {
          res.json().then(res => {
              this.setState({
              reservations: res,
            });
          });
        }
      })
      .catch(function (error) {
        console.log(error.message);
        this.props.anyError(error);
      });
  }

  getDate(datestring){
  let date= new Date(datestring);
  return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
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
    if(item.type=='CAR'){
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
        <Text>{this.getDate(item.start_date_time)} - {this.getDate(item.end_date_time)}</Text>
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
const mapStateToProps = (state ) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReservationList);