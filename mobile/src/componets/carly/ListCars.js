import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Container } from "native-base";
import { Card, Chip } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { CARLY_API_URL } from "../../helpers/constants";
import { anyError } from "../../redux/actions";
import { styles, themeColors } from "../../styles";

const innerStyles = StyleSheet.create({
  fontBold: { fontWeight: "bold" },
  sortingRow: { display: "flex", justifyContent: "space-around", marginBottom: 20 },
  wrapInSameColumn: { flexShrink: 1 },
});

class ListCars extends React.Component {
  static navigationOptions = { title: "Choose car, dear" };

  constructor(props) {
    super(props);

    const idCmp = (a, b) => a.dd - b.id;
    this.sortingTypes = {
      lowestPrice: {
        name: "Lowest price",
        cmp: (a, b) => {
          const res = a.price - b.price;
          return res === 0 ? idCmp(a, b) : res;
        },
      },
      highestPrice: {
        name: "Highest price",
        cmp: (a, b) => {
          const res = b.price - a.price;
          return res === 0 ? idCmp(a, b) : res;
        },
      },
    };
    const { cars } = this.props.navigation.state.params;
    const { city } = this.props.navigation.state.params;
    const { people } = this.props.navigation.state.params;
    this.state = {
      fetchUrl: this.props.navigation.getParam("url", ""),
      sortingType: this.sortingTypes.lowestPrice,
      cars_to_choose:[],
      cars,
      city,
      people,
      isLoading: true,
    };

    this.sortByType = this.sortParkingByType.bind(this);
  }

  componentDidMount() {
    const url = `${CARLY_API_URL}/cars`; // this.state.fetchUrl
    //console.log(`url ${this.state.fetchUrl}`);
    fetch(url)
      .then(
        response => {
          if (response.ok) {
            response.json().then(data => {
            
                console.log(data);
                var arr =data.filter(car => 
                  (this.state.cars.length!=0 ? this.state.cars.includes(car.model): true) &&  (this.state.city!=""?this.state.city==car.location:true) && this.state.people<=car.seats);
                 console.log(arr);
                  this.setState({ isLoading: false, cars_to_choose: arr });
              
             
              data.sort(this.state.sortingType.cmp);
             
            });
          } else {
            throw new Error(`Error fetching, status code: ${response.statusCode}`);
          }
        },
        error => this.props.anyError(error)
      )
      .catch(error => {
        this.props.anyError(error);
      });
  }

  sortParkingByType(cmp) {
    this.setState(prevState => {
      const cars_to_choose = [...prevState.cars_to_choose].sort(cmp);
      return { isLoading: false, cars_to_choose };
    });
  }

  createCardsList() {
    const { cars_to_choose } = this.state;
    const { navigation } = this.props;

    if (!cars_to_choose) {
      return <Text>Error</Text>;
    }

    return cars_to_choose.map(car => {
      return (
        <Card key={car.id} onPress={() => navigation.push("DetailsCar", { cars: car })}>
          <Card.Content>
          <Text style={styles.fontBold}>{car.model}</Text>
          <Text style={styles.fontBold}>{car.make}</Text>

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
    const sortingTypes = (
      <View style={[styles.contentRow, innerStyles.sortingRow]}>
        <Chip
          mode="outlined"
          selected={this.state.sortingType === this.sortingTypes.lowestPrice.name}
          onPress={() => this.sortParkingByType(this.sortingTypes.lowestPrice.cmp)}
        >
          <Text>Lowest price</Text>
        </Chip>
        <Chip
          mode="outlined"
          selected={this.state.sortingType === this.sortingTypes.highestPrice.name}
          onPress={() => this.sortParkingByType(this.sortingTypes.highestPrice.cmp)}
        >
          <Text>Highest price</Text>
        </Chip>
      </View>
    );

    const { isLoading } = this.state;
    return (
      <Container>
        <ScrollView contentContainerStyle={styles.container}>
          {sortingTypes}
          {isLoading ? <ActivityIndicator size="large" color={themeColors.primary} /> : this.createCardsList()}
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(null, mapDispatchToProps)(ListCars);