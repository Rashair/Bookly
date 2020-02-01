import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { TextInput, HelperText, Title, Chip, Button } from "react-native-paper";
import React from "react";
import CustomMultiPicker from "react-native-multiple-select-list";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CARLY_API_URL } from "../../helpers/constants";
import { anyError, searchByDate } from "../../redux/actions";
import { combineDateAndTime } from "../../helpers/functions";

const currDate = new Date();

const innerStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

class SearchCarScreen extends React.Component {
  static navigationOptions = { title: "Find your perfect car!" };

  constructor(props) {
    super(props);

    this.showPeoplePicker = false;
    this.setCity = this.setCity.bind(this);
    this.setPeople = this.setPeople.bind(this);
    const { carlyToken } = this.props;
    const datePlusminutes = new Date(currDate);
    // datePlusminutes.setMinutes(currDate.getMinutes());
    const datePlushour2 = new Date(currDate);
    datePlushour2.setHours(currDate.getHours() + 1);
    this.state = {
      carlyToken,
      city: "",
      people: 1,
      dateToValid: true,
      carValid: true,
      carsMap: [],
      cars: [],
      dateFrom: datePlusminutes,
      dateTo: datePlushour2,
      showDateFromPicker: false,
      showTimeFromPicker: false,
      showDateToPicker: false,
      showTimeToPicker: false,
    };

    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.fetchCars = this.fetchCars.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // if(this.state.dateFrom!=this.state.dateTo)
    this.fetchCars(this.state.dateFrom, this.state.dateTo);
  }

  setDateFrom(date, time) {
    if (!date && !time) {
      this.setState({ showDateFromPicker: false, showTimeFromPicker: false });
      return;
    }

    const oldDate = this.state.dateFrom;
    const newDate = combineDateAndTime(date ?? oldDate, time ?? oldDate);
    this.setState(oldstate => ({
      dateFrom: newDate,
      dateToValid: this.validateDateTo(newDate, oldstate.dateTo),
      showDateFromPicker: false,
      showTimeFromPicker: false,
    }));

    this.fetchCars(newDate, this.state.dateTo);
  }

  setDateTo(date, time) {
    if (!date && !time) {
      this.setState({ showDateToPicker: false, showTimeToPicker: false });
      return;
    }

    const oldDate = this.state.dateTo;
    const newDate = combineDateAndTime(date ?? oldDate, time ?? oldDate);
    const dateToValid = this.validateDateTo(this.state.dateFrom, newDate);
    if (dateToValid) {
      this.fetchCars(this.state.dateFrom, newDate);

      this.setState(oldstate => ({
        dateTo: newDate,
        dateToValid: this.validateDateTo(oldstate.dateFrom, newDate),
        showDateToPicker: false,
        showTimeToPicker: false,
      }));
    }
  }

  validateDateTo(dateFrom, dateTo) {
    const ONE_HOUR = 60 * 60;
    return Boolean(dateFrom && dateTo && parseInt((dateTo - dateFrom) / 1000, 10) >= ONE_HOUR);
  }

  setCity(city) {
    this.setState({
      city,
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

      default:
        return null;
    }
  }

  fetchCars(dateFrom, dateTo) {
    fetch(`${CARLY_API_URL}/cars?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: this.state.carlyToken,
      },
    })
      .then(res => res.json())
      .then(data => {
        const arr = [];

        data.content.forEach(car => (arr[car.id] = car.make));
        const unique = [...new Set(arr)];
        this.setState({ carsMap: unique });
      });
  }

  handleSubmit() {
    const { cars, people, city, dateFrom, dateTo } = this.state;

    const dateToValid = this.validateDateTo(dateFrom, dateTo);
    if (!dateToValid) {
      this.setState({ dateToValid });
      return;
    }

    this.props.searchByDate({ from: dateFrom, to: dateTo });
    this.props.navigation.push("ListCars", { cars, city, people, dateFrom, dateTo });
  }

  render() {
    const userList = this.state.carsMap.filter(car => typeof car !== "undefined");
    const { dateFrom, dateTo, showDateFromPicker, showDateToPicker, showTimeFromPicker, showTimeToPicker } = this.state;

    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));
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
          <View>
            <Title>From</Title>
            <View style={innerStyles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateFromPicker: true })}>
                <TextInput mode="flat" style={innerStyles.inputDate} value={dateFromFormatted} editable={false} />
                {showDateFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateFrom}
                    mode="date"
                    display="calendar"
                    onChange={(e, date) => this.setDateFrom(date)}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeFromPicker: true })}>
                <TextInput mode="flat" style={innerStyles.inputDate} value={timeFromFormatted} editable={false} />
                {showTimeFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateFrom}
                    mode="time"
                    display="clock"
                    onChange={(e, time) => this.setDateFrom(null, time)}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Title>To</Title>
            <View style={innerStyles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateToPicker: true })}>
                <TextInput mode="flat" style={innerStyles.inputDate} value={dateToFormatted} editable={false} />
                {showDateToPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateTo}
                    mode="date"
                    display="calendar"
                    onChange={(e, date) => this.setDateTo(date)}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeToPicker: true })}>
                <TextInput mode="flat" style={innerStyles.inputDate} value={timeToFormatted} editable={false} />
                {showTimeToPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateTo}
                    mode="time"
                    display="clock"
                    onChange={(e, time) => this.setDateTo(null, time)}
                  />
                )}
              </TouchableOpacity>
            </View>
            {!this.state.dateToValid && <HelperText type="error">{this.errorMessage("DateTo")}</HelperText>}
          </View>
          <CustomMultiPicker
            options={userList}
            search // should show search bar
            multiple //
            returnValue="label" // label or value
            callback={car => this.setSelectedCars(car)} // callback, array of selected items
            rowBackgroundColor="#eee"
            rowHeight={43}
            rowRadius={5}
            searchIconName="ios-checkmark"
            searchIconColor="red"
            searchIconSize={30}
            iconColor="#8500dd"
            iconSize={30}
            selectedIconName="ios-checkmark-circle-outline"
            unselectedIconName="ios-add-circle-outline"
            scrollViewHeight={250}
            fixedHeight={false}
            // selected={["Tom", "Christin"]} // list of options which are selected by default
          />
          <HelperText type="error" visible={!this.state.carValid}>
            {this.errorMessage("Car")}
          </HelperText>

          <Button mode="contained" disabled={!this.state.carValid} onPress={this.handleSubmit}>
            Search
          </Button>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state /* , ownProps */) => {
  return {
    carlyToken: state.carlyToken,
  };
};
const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
  searchByDate: dates => dispatch(searchByDate(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCarScreen);
