import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';
import MyReservationCarItem from './ListItem/MyReservationCarItem';
import MyReservationFlatItem from './ListItem/MyReservationFlatItem';
import MyReservationParkingItem from './ListItem/MyReservationParkingItem';


const DATA =  [ // temporary solution to display data
{
  type : "car",
  Car :{
    Model : " Skoda Fabia"
  },
  DateFrom : " today"
},
{
  type : "flat",
  DateFrom : "tommorow",
  Flat: {

  }
},
{
  type : "parking",
  DateFrom : "never",
  Paeking : {

  }
}
]; 
export default class MyReservationList extends React.Component {
  constructor(){
    this._renderItem = bind(this._renderItem);
  }

  _renderItem (item) {
    if(item.type === 'car'){
      return(
        <MyReservationCarItem Car = {item.Car} DateFrom ={item.DateFrom} onPress={() => this.props.navigation('MyReservationCarDetails',{car : item.Car })} />
      );
    }
    else if(item.type === 'flat'){
      return(
        <MyReservationFlatItem Flat = {item.Flat} DateFrom ={item.DateFrom} onPress={() => this.props.navigation('MyReservationFlatDetails',{flat : item.Flat })} />
      );
    }
    else if(item.type === 'parking'){
      return(
        <MyReservationParkingItem Parking={item.Parking} DateFrom={item.DateFrom} onPress={() =>this.props.navigation('MyReservationParkingDetails',{parking : item.Parking })} />
      );
    }
  }
   

  render() {
    return (
      <View style={styles.container}>
       <Text>Here will be reservation list !</Text>
       <ScrollView >
         <FlatList data={DATA} keyExtractor={item => item.id}
         renderItem={this._renderItem} />
       </ScrollView>
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