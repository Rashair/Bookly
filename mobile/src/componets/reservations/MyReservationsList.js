import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import MyReservationCarItem from './ListItem/MyReservationCarItem';
//import MyReservationFlatItem from './ListItem/MyReservationFlatItem';
///import MyReservationParkingItem from './ListItem/MyReservationParkingItem';

function MyReservationCarItem ({DateFrom}) {
  return (
    <View>
        {/* <Image source={require('./assets/car.png')} />  here will be custom icon */}
        <Text>{DateFrom}</Text>
    </View>
  );
}

function MyReservationFlatItem ({DateFrom}) {
  return (
    <TouchableOpacity>
        {/* <Image source={require('./assets/car.png')} />  here will be custom icon */}
        <Text>{DateFrom}</Text>
    </TouchableOpacity>
  );
}

function MyReservationItem ({DateFrom, FKid, type, navigation}) {
  let image;
  if(type === 'car'){
    image = <Image />
  }
  return (
    <TouchableOpacity onPress={navigation}>
      {/* {image} */}
        <Text>{DateFrom}</Text>
        <Text>{FKid}</Text>
    </TouchableOpacity>
  );
}

const DATA =  [ // temporary solution to display data
{
  id :1,
  type : 'car',
  FKid:1,
  DateFrom : " today"
},
{
  id:2,
  type : 'flat',
  DateFrom : "tommorow",
 FKid :2
},
{
  id:3,
  type : 'parking',
  DateFrom : "never",
  FKid : 3
 
}
]; 
export default class MyReservationList extends React.Component {
  constructor(props){
    super(props);
    this.openDetails = this.openDetails.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  openDetails = (FKid, type) => {
    this.props.navigation.navigate("MyReservationDetails",
    {
      FKid: FKid,
      type : type,
    });
  };

  renderItem ({item}) {
      return(
        <MyReservationItem DateFrom={item.DateFrom} FKid={item.FKid} type={item.type} navigation={()=>this.openDetails(item.FKid, item.type)} />
      );
  }
   

  render() {
    return (
      <View style={styles.container}>
       <Text>Here will be reservation list !</Text>
         <FlatList data={DATA} keyExtractor={(item) => item.toString()}
         renderItem={this.renderItem} />
        <Button title="Go back to Home"
        onPress={()=> this.props.navigation.goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});