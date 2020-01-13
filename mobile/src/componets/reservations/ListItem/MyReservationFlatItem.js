
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';

export default class MyReservationFlatItem extends React.Component {
   
    constructor(props){
        super(props);
    }

    render() {
      return (
        <View>
            <Image source={require('./assets/car.png')} />  {/* here will be custom icon */}
            <Text>{this.props.Flat.HotelName}</Text>
            <Text>{this.props.StartDate}</Text>
        </View>
      );
    }
  }