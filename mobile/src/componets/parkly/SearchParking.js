import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, Content, Text } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";

import { anyError } from "../../redux/actions";
import { BUTTON_COLOR } from "../../helpers/colors";

const white = "#ffffff";
const styles = StyleSheet.create({
  contentPadding: { paddingHorizontal: 10, paddingVertical: 20 },
  inputDate: {
    backgroundColor: white,
    marginRight: 10,
  },
  putOnBottom: { flex: 1, justifyContent: "flex-end" },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  whiteBackground: {
    backgroundColor: white,
  },
});

class SearchParking extends React.Component {
  static navigationOptions = { title: "Search parking" };

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

  setDateFrom(event, date) {
    this.setState(oldstate => ({
      dateFrom: date,
      dateToValid: !!(oldstate.dateTo && date <= oldstate.dateTo),
      showDateFromPicker: false,
      showTimeFromPicker: false,
    }));
  }

  setDateTo(event, date) {
    this.setState(oldstate => ({
      dateTo: date,
      dateToValid: !!(oldstate.dateFrom && oldstate.dateFrom <= date),
      showDateToPicker: false,
      showTimeToPicker: false,
    }));
  }

  setCity(event, city) {
    const cityPattern = /^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/;
    this.setState({
      city,
      cityValid: !!(cityPattern.test(city) && city.length >= 3),
    });
  }

  errorMessage(field) {
    switch (field) {
      case "City":
        return "City name incorrect";
      case "DateTo":
        return "Date to must be later than date from";
      default:
        return "";
    }
  }

  render() {
    const { showDateFromPicker, showTimeFromPicker, dateFrom, showDateToPicker, showTimeToPicker, dateTo } = this.state;
    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));

    const { navigation } = this.props;
    return (
      <Container>
        <Content style={styles.contentPadding}>
          <Title>City</Title>
          <TextInput
            mode="outlined"
            style={styles.whiteBackground}
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
            style={styles.putOnBottom}
            color={BUTTON_COLOR}
            disabled={!(this.state.cityValid && this.state.dateToValid)}
            onPress={() => navigation.push("ListParking")}
          >
            <Text>Search</Text>
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchParking);
