import { StyleSheet, View } from "react-native";
import { Container, Header, Content, DatePicker, Text } from "native-base";
import { TextInput, Subheading, List, Card, HelperText, Title, Chip, Button, Picker } from "react-native-paper";
import React from "react";
import { AuthSession } from "expo";
import CustomMultiPicker from "react-native-multiple-select-list";
import { CARLY_API_URL } from "../../helpers/constants";
import { styles, themeColors } from "../../styles";

export default class SearchCarScreen extends React.Component {
  static navigationOptions = { title: "Find your perfect car!" };

  constructor(props) {
    super(props);

    this.showPeoplePicker = false;
    this.setCity = this.setCity.bind(this);
    this.setPeople = this.setPeople.bind(this);

    this.state = {
      city: "",
      people: 1,
      cityValid: true,
      dateToValid: true,
      carValid: true,
      formValid: false,
      all_cars: [],
      carsMap: [],
      isLoading: true,
      cars: [],
    };
  }

  setCity(city) {
    const cityPattern = /^[a-zA-z][a-zA-z][a-zA-z ]*$/;
    this.setState({
      city,
      cityValid: !!(cityPattern.test(city) || city.length == 1),
    });
  }

  setPeople(people) {
    this.setState({
      people,
      carValid: !!people,
    });
  }

  setSelectedCars(car) {
    this.setState({
      cars: car,
    });
  }

  createChip(i) {
    return (
      <Chip mode="outlined" selected={this.state.people === i} onPress={() => this.setPeople(i)}>
        {i.toString()}
      </Chip>
    );
  }

  errorMessage(field) {
    switch (field) {
      case "City":
        return "City name incorrect";
      case "DateTo":
        return "Date to must be later than date from";
      case "Cars":
        return "Please, choose number of people in the car";
    }
  }

  componentDidMount() {
    fetch(`${CARLY_API_URL}/cars`)
      .then(res => res.json())
      .then(data => {
        const arr = [];
        data.forEach(car => (arr[car.id] = car.model));

        this.setState({ all_cars: data, carsMap: arr });
      });
  }

  render() {
    const userList = this.state.carsMap.filter(car => typeof car !== "undefined");

    console.log(userList);
    const { navigation } = this.props;
    const { all_cars } = this.state;
    const { cars, city, people } = this.state;

    return (
      <Container>
        <Content style={{ paddingVertical: 0, paddingHorizontal: 10 }}>
          <Title>City</Title>
          <TextInput
            mode="outlined"
            style={{ backgroundColor: "white" }}
            onChangeText={text => this.setCity(text)}
            value={this.state.city}
          />
          <HelperText type="error" visible={!this.state.cityValid}>
            {this.errorMessage("City")}
          </HelperText>

          <Title>People</Title>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            {this.createChip(1)}
            {this.createChip(2)}
            {this.createChip(3)}
            {this.createChip(4)}
            {this.createChip(5)}
            {this.createChip(6)}
            {this.createChip(7)}
            {this.createChip(8)}
            {this.createChip(9)}
          </View>

          <CustomMultiPicker
            options={userList}
            search // should show search bar
            multiple //
            returnValue="label" // label or value
            callback={car => this.setSelectedCars(car)} // callback, array of selected items
            rowBackgroundColor="#eee"
            rowHeight={50}
            rowRadius={5}
            searchIconName="ios-checkmark"
            searchIconColor="red"
            searchIconSize={30}
            iconColor="#8500dd"
            iconSize={30}
            searchIconName="ios-add-circle-outline"
            selectedIconName="ios-checkmark-circle-outline"
            unselectedIconName="ios-add-circle-outline"
            scrollViewHeight={250}
            fixedHeight={false}
            selected={["Tom", "Christin"]} // list of options which are selected by default
          />
          <HelperText type="error" visible={!this.state.carValid}>
            {this.errorMessage("Car")}
          </HelperText>

          <Button
            mode="contained"
            disabled={!this.state.carValid}
            onPress={() => navigation.push("ListCars", { cars, city, people })}
          >
            Search
          </Button>
        </Content>
      </Container>
    );
  }
}
