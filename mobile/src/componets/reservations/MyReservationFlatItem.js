export default class MyReservationFlatItem extends React.Component {
   
    constructor(props){
        super(props);
    }

    render() {
      return (
        <View>
        <Text>{this.props.HotelName}</Text>
        <Text>{this.props.StartDate}</Text>
        </View>
      );
    }
  }