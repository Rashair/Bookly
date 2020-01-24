import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from "react-native";
import { Container } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";

import { anyError, searchByDate } from "../../redux/actions";
import { createQueryParams, combineDateAndTime } from "../../helpers/functions";
import { PARKLY_API_URL } from "../../helpers/constants";
import { styles, themeColors } from "../../styles";

const innerStyles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: themeColors.background,
  },
  contentContainer: {
    alignItems: "stretch",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputDate: {
    backgroundColor: themeColors.background,
    height: 45,
    marginBottom: 10,
    marginRight: 10,
    marginTop: 0,
  },
  row: {
    flexDirection: "row",
  },
});
const currDate = new Date();

class SearchParking extends React.Component {
  static navigationOptions = { title: "Search parking" };

  constructor(props) {
    super(props);

    const datePlusHour = new Date(currDate);
    datePlusHour.setHours(currDate.getHours() + 1);
    this.state = {
      showDateFromPicker: false,
      showTimeFromPicker: false,
      showDateToPicker: false,
      showTimeToPicker: false,
      city: "",
      dateFrom: currDate,
      dateTo: datePlusHour,
      cityValid: true,
      dateToValid: true,
    };

    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.setCity = this.setCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  setDateTo(date, time) {
    if (!date && !time) {
      this.setState({ showDateToPicker: false, showTimeToPicker: false });
      return;
    }

    const oldDate = this.state.dateTo;
    const newDate = combineDateAndTime(date ?? oldDate, time ?? oldDate);
    this.setState(oldstate => ({
      dateTo: newDate,
      dateToValid: this.validateDateTo(oldstate.dateFrom, newDate),
      showDateToPicker: false,
      showTimeToPicker: false,
    }));
  }

  validateDateTo(dateFrom, dateTo) {
    const ONE_HOUR = 60 * 60;
    return Boolean(dateFrom && dateTo && parseInt((dateTo - dateFrom) / 1000, 10) >= ONE_HOUR);
  }

  setCity(city) {
    this.setState({
      city,
      cityValid: this.validateCity(city),
    });
  }

  validateCity(city) {
    const cityPattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]{3,}$/;
    return Boolean(cityPattern.test(city));
  }

  errorMessage(field) {
    switch (field) {
      case "City":
        return "City name incorrect";
      case "DateTo":
        return "Date to must be later than date from by at least 1 hour";
      default:
        return "";
    }
  }

  handleSubmit() {
    const { city, dateFrom, dateTo } = this.state;
    const cityValid = this.validateCity(city);
    const dateToValid = this.validateDateTo(dateFrom, dateTo);
    if (!cityValid || !dateToValid) {
      this.setState({ cityValid, dateToValid });
      return;
    }

    this.props.searchByDate({ from: dateFrom, to: dateTo });
    const params = createQueryParams({ city, dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() });
    const url = `${PARKLY_API_URL}/reservations/find-parkings?${params.toString()}`;
    this.props.navigation.navigate("ListParking", { url });
  }

  render() {
    const { showDateFromPicker, showTimeFromPicker, dateFrom, showDateToPicker, showTimeToPicker, dateTo } = this.state;
    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));

    return (
      <Container>
        <ScrollView style={styles.container} contentContainerStyle={innerStyles.contentContainer}>
          <Title>City</Title>
          <TextInput
            mode="outlined"
            style={innerStyles.backgroundColor}
            onChangeText={text => this.setCity(text)}
            value={this.state.city}
          />
          {!this.state.cityValid && <HelperText type="error">{this.errorMessage("City")}</HelperText>}
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

          <View style={styles.contentToEnd}>
            <Button
              mode="contained"
              color={themeColors.primary}
              style={[styles.button, styles.marginTopBig]}
              disabled={!(this.state.cityValid && this.state.dateToValid)}
              onPress={this.handleSubmit}
            >
              <Text style={styles.buttonText}>Search</Text>
            </Button>
          </View>
        </ScrollView>
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
  searchByDate: dates => dispatch(searchByDate(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParking);
