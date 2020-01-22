import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Container, Text } from "native-base";
import { Card, Chip } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { CARLY_API_URL } from "../../helpers/constants";
import { ACTIVITY_INDICATOR_COLOR } from "../../helpers/colors";
import { anyError } from "../../redux/actions";

const styles = StyleSheet.create({
  fontBold: { fontWeight: "bold" },
  md_paddingVertical: { paddingVertical: 15 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  sortingRow: { display: "flex", justifyContent: "space-around", marginBottom: 20 },
  wrapInSameColumn: { flexShrink: 1 },
});

class ListCars extends React.Component {
  static navigationOptions = { title: "Choose car,baby :P" };

  constructor(props) {
    super(props);
    const { cars } = this.props.navigation.state.params;
    const { city } = this.props.navigation.state.params;
    const { people } = this.props.navigation.state.params;

    console.log( this.props.navigation.state.params);
    this.sortingTypes = {
      highestPrice: "Highest price",
      lowestPrice: "Lowest price",
    };
 
    
  
    this.state = {
      cars_to_choose:[],
      cars,
      city,
      people,
      sortingType: this.sortingTypes.lowestPrice,
      isLoading: true,
    };

    this.changeSortingType = this.changeSortingType.bind(this);
  }

  componentDidMount() {
    this.changeSortingType(this.sortingTypes.lowestPrice);
  }

  changeSortingType(type) {
   
    this.setState({ isLoading: true });
    fetch(`${CARLY_API_URL}/cars`)
    .then(res => res.json())
    .then(data => {
    
      var arr =data.filter(car => 
        (this.state.cars.length==0 ? this.state.cars.includes(car.model): true) &&  (this.state.city!=""?this.state.city==car.location:true) && this.state.people<=car.seats);
    
      this.setState({ all_cars: data, cars_to_choose: arr ,isLoading:false});
    });
  }

  createCardsList() {
    const { cars_to_choose } = this.state;
    const { carse } = this.state;

    const { navigation } = this.props;
 
    if (!cars_to_choose) {
      return <Text>Error</Text>;
    }

    return cars_to_choose.map(car => {
      return (
        <Card key={car.id} onPress={() => navigation.push("DetailsCar", { cars: car })}>
          <Card.Content>
          <Text style={styles.fontBold}>{car.model}</Text>
          <Text>Seats: {car.seats.toString()}</Text>
            <Text>Price: {car.price.toString()} PLN / h</Text>
            <View style={styles.row}>
              <Text>Location: </Text>
              <Text style={styles.wrapInSameColumn}>{car.location}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    });
  }
  render() {
    console.log("fdsfsdfsd");
    console.log(this.state.cars_to_choose);

    const sortingTypes = (
      <View style={[styles.row, styles.sortingRow]}>
        <Chip
          mode="outlined"
          selected={this.state.sortingType === this.sortingTypes.lowestPrice}
          onPress={() => this.changeSortingType(this.sortingTypes.lowestPrice)}
        >
          <Text>Lowest price</Text>
        </Chip>
        <Chip
          mode="outlined"
          selected={this.state.sortingType === this.sortingTypes.highestPrice}
          onPress={() => this.changeSortingType(this.sortingTypes.highestPrice)}
        >
          <Text>Highest price</Text>
        </Chip>
      </View>
    );

    const { isLoading } = this.state;
    return (
      <Container>
        <ScrollView contentContainerStyle={styles.md_paddingVertical}>
          {sortingTypes}
          {isLoading ? <ActivityIndicator size="large" color={ACTIVITY_INDICATOR_COLOR} /> : this.createCardsList()}
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(null, mapDispatchToProps)(ListCars);
