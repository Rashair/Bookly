import { View, ActivityIndicator, FlatList, TouchableOpacity, Text } from "react-native";
import { Container } from "native-base";
import { Title, Chip, Paragraph } from "react-native-paper";
import React from "react";
import { connect } from "react-redux";
import { sendRequest } from "../../helpers/functions";
import { anyError } from "../../redux/actions";
import { styles, themeColors } from "../../styles";

class FlatsListScreen extends React.Component {
  static navigationOptions = { title: "Choose accommodation" };

  constructor(props) {
    super(props);

    this.sortingTypes = {
      dateStart: "date-start",
      price: "price",
      rating: "rating",
    };

    this.city = this.props.navigation.getParam("city");
    this.beds = this.props.navigation.getParam("beds");
    this.url = this.props.navigation.getParam("url");

    this.state = {
      // currentPage: 1,
      // flatsPerPage: 10,
      sortingDir: null,
      sortingType: this.sortingTypes.dateStart,
      isLoading: false,
      flats: null,
    };
    this.changeSortingType = this.changeSortingType.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
    this.Item = this.Item.bind(this);
    // flat {id, type, cost/night, address, rating}
  }

  componentDidMount() {
    // fetch get flats
    return this.changeSortingType(this.sortingTypes.dateStart, null);
  }

  changeSortingType(type, dir = this.sortingDir) {
    // For real server
    // const paramsObj =
    // {
    //     city: this.city,
    //     start_date: this.props.dates.from,
    //     end_date: this.props.dates.to,
    //     beds: this.beds,
    //     sort: type,
    //     dir: dir
    // }
    // const params = createQueryParams(paramsObj)
    // const url = `${this.url}/${params.toString()}`

    // For mockserver
    const { url } = this;
    console.log(url);

    this.setState({ isLoading: true });
    sendRequest(url, "GET")
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => this.setState({ sortingType: type, sortingDir: dir, flats: json, isLoading: false }));
        } else {
          throw new Error(`Error fetching, status code: ${response.statusCode}`);
        }
      })
      .catch(error => {
        this.props.anyError(`There has been a problem with your fetch operation: ${error.message}`);
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
          <Paragraph>
            <Text>{item.rating.toString()}</Text>
          </Paragraph>
          <Paragraph>
            <Text>{`${item.city}, ${item.address}`} </Text>
          </Paragraph>
          <Paragraph>
            <Text>{item.price.toString()} PLN </Text>
          </Paragraph>
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
            selected={this.state.sortingType === this.sortingTypes.dateStart}
            onPress={() => this.changeSortingType(this.sortingTypes.dateStart, "asc")}
          >
            <Text> Earliest</Text>
          </Chip>
          <Chip
            mode="outlined"
            selected={this.state.sortingType === this.sortingTypes.rating}
            onPress={() => this.changeSortingType(this.sortingTypes.rating, "desc")}
          >
            <Text>Best rating</Text>
          </Chip>
          <Chip
            mode="outlined"
            selected={this.state.sortingType === this.sortingTypes.price}
            onPress={() => this.changeSortingType(this.sortingTypes.price, "asc")}
          >
            <Text>Lowest price</Text>
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

const mapStateToProps = (state /* , ownProps */) => {
  return {
    date: state.date,
  };
};

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlatsListScreen);
