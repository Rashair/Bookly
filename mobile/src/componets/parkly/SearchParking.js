import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, Content, Text } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";

class SearchParking extends React.Component {
  static navigationOptions = { title: "Find parking" };
  constructor(props) {
    super(props);

    this.state = {
      showDateFromPicker: false,
      showTimeFromPicker: false,
      showDateToPicker: false,
      showTimeToPicker: false,
      city: "",
      dateFrom: new Date(),
      dateTo: new Date(),
      cityValid: true,
      dateToValid: true,
    };

    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  setDateFrom(date) {
    this.setState({
      dateFrom: date,
      dateToValid: this.state.dateTo && date <= this.state.dateTo ? true : false,
      showDateFromPicker: false,
      showTimeFromPicker: false,
    });
  }
  setDateTo(date) {
    this.setState({
      dateTo: date,
      dateToValid: this.state.dateFrom && this.state.dateFrom <= date ? true : false,
      showDateToPicker: false,
      showTimeToPicker: false,
    });
  }

  setCity(city) {
    const cityPattern = /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/;
    this.setState({
      city: city,
      cityValid: cityPattern.test(city) && city.length >= 3 ? true : false,
    });
  }

  errorMessage(field) {
    switch (field) {
      case "City":
        return "City name incorrect";
      case "DateTo":
        return "Date to must be later than date from";
    }
  }

  render() {
    const { showDateFromPicker, showTimeFromPicker, dateFrom, showDateToPicker, showTimeToPicker, dateTo } = this.state;
    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));

    return (
      <Container>
        <Content style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
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
          <View>
            <Title>From</Title>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateFromPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={dateFromFormatted} />
                {showDateFromPicker && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={dateFrom}
                    mode="date"
                    display="calendar"
                    onChange={this.setDateFrom}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeFromPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={timeFromFormatted} editable={false} />
                {showTimeFromPicker && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={dateFrom}
                    mode="time"
                    display="clock"
                    onChange={this.setDateFrom}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Title>To</Title>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateToPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={dateToFormatted} editable={false} />
                {showDateToPicker && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={dateTo}
                    mode="date"
                    display="calendar"
                    onChange={this.setDateTo}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeToPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={timeToFormatted} editable={false} />
                {showTimeToPicker && (
                  <DateTimePicker
                    minimumDate={dateFrom}
                    value={dateTo}
                    mode="time"
                    display="clock"
                    onChange={this.setDateTo}
                  />
                )}
              </TouchableOpacity>
            </View>
            <HelperText type="error" visible={!this.state.dateToValid}>
              {this.errorMessage("DateTo")}
            </HelperText>
          </View>

          <Button
            mode="contained"
            disabled={!(this.state.cityValid && this.state.dateToValid)}
            onPress={() => console.log("Simple Button pressed")}
          >
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
  row: {
    flex: 1,
    flexDirection: "row",
  },
  inputDate: {
    backgroundColor: "#ffffff",
    marginRight: 10,
  },
});

export default connect(null, null)(SearchParking);
