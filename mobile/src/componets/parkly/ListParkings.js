import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Container, Content, Text } from "native-base";
import { Card, Chip } from "react-native-paper";

import { PARKLY_API_URL } from "../../helpers/constants";
import { anyError } from "../../redux/actions";

const styles = StyleSheet.create({
  md_paddingVertical: { paddingVertical: 20 },
  sortingRow: { display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
});

class ListParkings extends React.Component {
  static navigationOptions = { title: "Choose parking" };

  constructor(props) {
    super(props);

    this.sortingTypes = {
      highestPrice: "Highest price",
      lowestPrice: "Lowest price",
    };

    this.state = {
      // currentPage: 1,
      // parkingPerPage: 10,
      sortingType: this.sortingTypes.lowestPrice,
      isLoading: true,
      parking: null,
    };

    this.changeSortingType = this.changeSortingType.bind(this);
  }

  componentDidMount() {
    this.changeSortingType(this.sortingTypes.lowestPrice);
  }

  async changeSortingType(type) {
    this.setState({ isLoading: true });
    fetch(`${PARKLY_API_URL}/parking`).then(
      response => {
        if (response.ok) {
          response.json().then(json => this.setState({ sortingType: type, parking: json, isLoading: false }));
        } else {
          this.props.dispatch.anyError(`Error fetching, status code: ${response.statusCode}`);
        }
      },
      error => this.props.anyError(error)
    );
  }

  createCardsList() {
    if (!this.state.parking) {
      return <Text>Error</Text>;
    }

    return this.state.parking.map(parking => (
      <Card
        key={parking.id}
        onPress={() => {
          console.log("do sth");
        }}
      >
        <Card.Content>
          <Text>{parking.pricePerHour.toString()} PLN / h</Text>
          <Text>Location: {parking.location}</Text>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    const sortingTypes = (
      <View style={styles.sortingRow}>
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
        <Content style={styles.md_paddingVertical}>
          {sortingTypes}
          {isLoading ? <ActivityIndicator size="large" color="#00aaff" /> : this.createCardsList()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListParkings);
