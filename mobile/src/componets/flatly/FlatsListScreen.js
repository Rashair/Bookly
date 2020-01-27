import { StyleSheet, View, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { Title, Chip, Paragraph } from "react-native-paper";
import React from "react";
import { FLATLY_API_URL } from "../../helpers/constants";
import { sendRequest } from "../../helpers/functions";
import { styles, themeColors } from "../../styles";

export default class FlatsListScreen extends React.Component {
  static navigationOptions = { title: "Choose accommodation" };

  constructor(props) {
    super(props);
    this.sortingTypes = {
      highestPrice: "Highest price",
      lowestPrice: "Lowest price",
      highestRating: "Highest rating",
    };

    this.state = {
      currentPage: 1,
      flatsPerPage: 10,
      sortingType: this.sortingTypes.lowestPrice,
      isLoading: false,
      flats: null,
      // flats:
      // [
      //     {
      //         id: 1,
      //         title: 'Cukrowa',
      //         price: 300,
      //         address: 'Cukrowa 18',
      //         city: 'Warszawa',
      //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //         rating: 4.3,
      //         roomNumber: 1,
      //         beds: 3,
      //         image: 'https://pracownia-projekty.dom.pl/images/36/wizualizacje_1_arc_dom_dla_ciebie_1_z_garazem_ce.jpg'
      //     },
      //     {
      //         id: 2,
      //         title: 'Zielony apartament',
      //         price: 450,
      //         address: 'Czajnikowa 11',
      //         city: 'Warszawa',
      //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //         rating: 4.7,
      //         roomNumber: 3,
      //         beds: 2,
      //         image: 'https://projektyzwizja.pl/media/cache/max_size/uploads/wyjatkowy-1/wyjatkowy1-front-1200_1507029951.jpeg'
      //     }
      // ]
    };
    this.changeSortingType = this.changeSortingType.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
    this.Item = this.Item.bind(this);
    // flat {id, type, cost/night, address, rating}
  }

  componentDidMount() {
    // fetch get flats
    return this.changeSortingType(this.sortingTypes.lowestPrice);
  }

  changeSortingType(type) {
    // DOROBIĆ RÓŻNE DZIAŁANIA DO RÓŻNYCH STATUSÓW ODPOWIEDZI
    // + PAGINACJA
    const URL = `${FLATLY_API_URL}/flats`;
    this.setState({ isLoading: true });
    sendRequest(URL, "GET" /* headers */)
      .then(response => {
        if (response.ok) {
          response.json().then(json => this.setState({ sortingType: type, flats: json, isLoading: false }));
        } else {
        }
      })
      .catch(function(error) {
        console.log(`There has been a problem with your fetch operation: ${error.message}`);
        throw error;
      });
  }

  goToDetails = flat => {
    this.props.navigation.navigate("FlatDetails", { flat });
  };

  Item({ item }) {
    return (
      <TouchableOpacity style={styles.marginBottomSmall} onPress={() => this.goToDetails(item)}>
        <Title>{item.title}</Title>
        <View style={styles.contentRow}>
          <Paragraph>{item.rating.toString()}</Paragraph>
          <Paragraph>{`${item.city}, ${item.address}`}</Paragraph>
          <Paragraph>{item.price.toString()} PLN</Paragraph>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      // przyciski do sortowania
      <Container>
        <View style={[styles.marginTopSmall, styles.contentRow]}>
          <Chip
            mode="outlined"
            selected={this.state.sortingType === this.sortingTypes.lowestPrice}
            onPress={() => this.changeSortingType(this.sortingTypes.lowestPrice)}
          >
            Lowest price
          </Chip>
          <Chip
            mode="outlined"
            selected={this.state.sortingType === this.sortingTypes.highestPrice}
            onPress={() => this.changeSortingType(this.sortingTypes.highestPrice)}
          >
            Highest price
          </Chip>
          <Chip
            mode="outlined"
            selected={this.state.sortingType === this.sortingTypes.highestRating}
            onPress={() => this.changeSortingType(this.sortingTypes.highestRating)}
          >
            Highest rating
          </Chip>
        </View>
        <View style={styles.container}>
          {this.state.isLoading ? (
            <ActivityIndicator size="large" color={themeColors.primary} />
          ) : (
            <FlatList data={this.state.flats} renderItem={this.Item} keyExtractor={item => item.id.toString()} />
          )}
        </View>
      </Container>
    );
  }
}
