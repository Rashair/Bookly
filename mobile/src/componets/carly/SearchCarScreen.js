import { StyleSheet, View } from "react-native";
import { Container, Header, Content, DatePicker, Text } from "native-base";
import { TextInput, Subheading, List, Card, HelperText, Title, Chip, Button, Picker } from "react-native-paper";
import React from "react";
import { AuthSession } from "expo";
import CustomMultiPicker from "react-native-multiple-select-list";






export default class SearchCarScreen extends React.Component {

  static navigationOptions = { title: "Find your perfect car!" };
  constructor(props) {
    super(props);

    this.showPeoplePicker = false;
    this.showDateFromPicker = false;
    this.showDateToPicker = false;

    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setPeople = this.setPeople.bind(this);


    this.state = {
      city: "",
      dateFrom: null,
      dateTo: null,
      car: 1,
      cityValid: true,
      dateToValid: true,
      carValid: true,
      formValid: false,
      cars: [],
      carsMap: [],
      isLoading: true
    };
  }
  setDateFrom(date) {
    this.setState({
      dateFrom: date,
      dateToValid: this.state.dateTo && date <= this.state.dateTo ? true : false,
    });
  }
  setDateTo(date) {
    this.setState({
      dateTo: date,
      dateToValid: this.state.dateFrom && this.state.dateFrom <= date ? true : false,
    });
  }
  setCity(city) {
    const cityPattern = /^[a-zA-z][a-zA-z][a-zA-z ]*$/;
    this.setState({
      city: city,
      cityValid: cityPattern.test(city) && city.length >= 3 ? true : false,
    });
  }
  setPeople(car) {
    this.setState({
      car: car,
      carValid: car ? true : false,
    });
  }

  createChip(i) {
    return (
      <Chip mode="outlined" selected={this.state.car === i ? true : false} onPress={() => this.setPeople(i)}>
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
    //Url should be variable
    fetch('http://814e452c.ngrok.io/cars')
      .then(res => res.json())
      .then((data) => {
        
        const arr = [];
        data.forEach((car) => arr[car.id] = car.model);
        console.log(arr);
        this.setState({ cars: data, carsMap: arr })

      });
  }



  render() {
    const userList = this.state.carsMap;

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

          <Title>From</Title>
          <DatePicker
            value={this.state.dateFrom}
            minimumDate={new Date()}
            onDateChange={date => this.setDateFrom(date)}
          />

          <Title>To</Title>
          <DatePicker
            style={{ border: "solid 2px black" }}
            value={this.state.dateTo}
            minimumDate={new Date()}
            onDateChange={date => this.setDateTo(date)}
          />
          <HelperText type="error" visible={!this.state.dateToValid}>
            {this.errorMessage("DateTo")}
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
            search={true} // should show search bar
            multiple={true} //
            placeholder={"Search"}
            placeholderTextColor={'#fff'}
            returnValue={"label"} // label or value
            callback={(res) => { console.log(res) }} // callback, array of selected items
            rowBackgroundColor={"#eee"}
            rowHeight={40}
            rowRadius={5}
            searchIconName="ios-checkmark"
            searchIconColor="red"
            searchIconSize={30}
            iconColor={"#8500dd"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            scrollViewHeight={130}
          //selected={["Tom", "Christin"]} // list of options which are selected by default
          />
          <HelperText type="error" visible={!this.state.carValid}>
            {this.errorMessage("Car")}
          </HelperText>


          <Button
            mode="contained"
            disabled={!(this.state.cityValid && this.state.dateTo && this.state.carValid)}
            onPress={() => Alert.alert("Simple Button pressed")}>
            Search
          </Button>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
