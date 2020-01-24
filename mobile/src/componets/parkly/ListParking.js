import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Container, Text } from "native-base";
import { Card, Chip } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { PARKLY_API_URL } from "../../helpers/constants";
import { ACTIVITY_INDICATOR_COLOR } from "../../helpers/colors";
import { anyError } from "../../redux/actions";

const styles = StyleSheet.create({
  fontBold: { fontWeight: "bold" },
  md_paddingVertical: { paddingVertical: 15 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  sortingRow: { display: "flex", justifyContent: "space-around", marginBottom: 20 },
  wrapInSameColumn: { flexShrink: 1 },
});

class ListParking extends React.Component {
  static navigationOptions = { title: "Choose parking" };

  constructor(props) {
    super(props);

    const idCmp = (a, b) => a.dd - b.id;
    this.sortingTypes = {
      lowestPrice: {
        name: "Lowest price",
        cmp: (a, b) => {
          const res = a.pricePerHour - b.pricePerHour;
          return res === 0 ? idCmp(a, b) : res;
        },
      },
      highestPrice: {
        name: "Highest price",
        cmp: (a, b) => {
          const res = b.pricePerHour - a.pricePerHour;
          return res === 0 ? idCmp(a, b) : res;
        },
      },
    };

    this.state = {
      fetchUrl: this.props.navigation.getParam("url", ""),
      sortingType: this.sortingTypes.lowestPrice,
      parking: null,
      isLoading: true,
    };

    this.sortByType = this.sortParkingByType.bind(this);
  }

  componentDidMount() {
    const url = `${PARKLY_API_URL}/parking`; // this.state.fetchUrl
    console.log(`url ${this.state.fetchUrl}`);
    fetch(url)
      .then(response => {
        if (response.ok) {
          response.json().then(responseJson => {
            responseJson.forEach(parkingSpace => {
              /* eslint-disable no-param-reassign */
              parkingSpace.location = `${parkingSpace.street} ${parkingSpace.streetNumber}, ${parkingSpace.city}`;
            });
            responseJson.sort(this.state.sortingType.cmp);
            this.setState({ isLoading: false, parking: responseJson });
          });
        } else {
          throw new Error(`Error fetching, status code: ${response.statusCode}`);
        }
      })
      .catch(error => {
        this.props.anyError(error);
      });
  }

  sortParkingByType(cmp) {
    this.setState(prevState => {
      const parking = [...prevState.parking].sort(cmp);
      return { isLoading: false, parking };
    });
  }

  createCardsList() {
    const { parking } = this.state;
    const { navigation } = this.props;

    if (!parking) {
      return <Text>Error</Text>;
    }

    return parking.map(parkingSpace => {
      return (
        <Card key={parkingSpace.id} onPress={() => navigation.push("DetailsParking", { parking: parkingSpace })}>
          <Card.Content>
            <Text style={styles.fontBold}>Parking {parkingSpace.id}</Text>
            <Text>Price: {parkingSpace.pricePerHour.toString()} PLN / h</Text>
            <View style={styles.row}>
              <Text>Location: </Text>
              <Text style={styles.wrapInSameColumn}>{parkingSpace.location}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    const sortingTypes = (
      <View style={[styles.row, styles.sortingRow]}>
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

export default connect(null, mapDispatchToProps)(ListParking);