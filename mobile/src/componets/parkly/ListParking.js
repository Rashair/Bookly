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

    this.sortingTypes = {
      highestPrice: "Highest price",
      lowestPrice: "Lowest price",
    };

    this.state = {
      parking: null,
      sortingType: this.sortingTypes.lowestPrice,
      // currentPage: 1,
      // parkingPerPage: 10,
      isLoading: true,
    };

    this.changeSortingType = this.changeSortingType.bind(this);
  }

  componentDidMount() {
    this.changeSortingType(this.sortingTypes.lowestPrice);
  }

  changeSortingType(type) {
    this.setState({ isLoading: true });
    fetch(`${PARKLY_API_URL}/parking`).then(
      response => {
        if (response.ok) {
          response.json().then(json => {
            json.forEach(parkingSpace => {
              /* eslint-disable no-param-reassign */
              parkingSpace.location = `${parkingSpace.street} ${parkingSpace.streetNumber}, ${parkingSpace.city}`;
            });
            this.setState({ sortingType: type, parking: json, isLoading: false });
          });
        } else {
          this.props.dispatch.anyError(`Error fetching, status code: ${response.statusCode}`);
        }
      },
      error => this.props.anyError(error)
    );
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

export default connect(null, mapDispatchToProps)(ListParking);
