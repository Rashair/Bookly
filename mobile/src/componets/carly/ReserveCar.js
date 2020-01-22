import React from "react";
import { connect } from "react-redux";

import { ScrollView, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Text } from "native-base";
import { Title, Button, TextInput, HelperText } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";

import { white, redA700 } from "react-native-paper/lib/commonjs/styles/colors";
import { sendRequest } from "../../helpers/functions";
import { anyError } from "../../redux/actions";
import { BUTTON_COLOR } from "../../helpers/colors";
import { CARLY_API_URL } from "../../helpers/constants";

const styles = StyleSheet.create({
  button: {
    height: 54,
    justifyContent: "center",
  },
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 20,
  },
  helper: {
    color: redA700,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  input: {
    backgroundColor: white,
    fontSize: 18,
    height: 40,
  },
  putOnBottom: { flex: 1, justifyContent: "flex-end" },
  row: {
    flexDirection: "row",
  },
});

const currDate = new Date();
const ONE_HOUR_IN_MINUTES = 60 * 60;

class ReserveCar extends React.Component {
  static navigationOptions = { title: "Make reservation" };

  constructor(props) {
    super(props);
    const { cars } = this.props.navigation.state.params;
    const { dates } = this.props;

    this.state = {
      cars,
      firstName: "",
      lastName: "",
      email: "",
      dateFrom: dates.from,
      dateTo: dates.to,
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      dateToValid: true,
    };

    this.setFirstName = this.setFirstName.bind(this);
    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setFirstName(name) {
    const namePattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]+$/;
    this.setState({
      firstName: name,
      firstNameValid: namePattern.test(name),
    });
  }

  setLastName(lastName) {
    const lastNamePattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]+$/;
    this.setState({
      lastName,
      lastNameValid: lastNamePattern.test(lastName),
    });
  }

  setEmail(email) {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      email,
      emailValid: emailPattern.test(email),
    });
  }

  setDateFrom(e, date) {
    if (!date) {
      this.setState({ showDateFromPicker: false, showTimeFromPicker: false });
      return;
    }

    this.setState(oldstate => ({
      dateFrom: date,
      dateToValid: this.validateDateTo(date, oldstate.dateFrom),
      showDateFromPicker: false,
      showTimeFromPicker: false,
    }));
  }

  setDateTo(e, date) {
    if (!date) {
      this.setState({ showDateToPicker: false, showTimeToPicker: false });
      return;
    }

    this.setState(oldstate => ({
      dateTo: date,
      dateToValid: this.validateDateTo(oldstate.dateFrom, date),
      showDateToPicker: false,
      showTimeToPicker: false,
    }));
  }

  validateDateTo(dateFrom, dateTo) {
    return Boolean(dateFrom && dateTo && parseInt((dateTo - dateFrom) / 1000, 10) >= ONE_HOUR_IN_MINUTES);
  }

  errorMessage(field) {
    switch (field) {
      case "FirstName":
        return "First name cannot be empty and may contain only letters";
      case "LastName":
        return "Last name cannot be empty and may contain only letters";
      case "Email":
        return "Email address is incorrect";
      case "DateTo":
        return "Date to must be later than date from by at least 1 hour";
      default:
        return null;
    }
  }

  handleSubmit() {
    const { dateFrom, dateTo } = this.state;
    const dateToValid = this.validateDateTo(dateFrom, dateTo);
    if (!dateToValid) {
      this.setState({ dateToValid });
      return;
    }

    // TODO: request here + body here
    const url = `${CARLY_API_URL}/reservations/`;
    const data = {};
    sendRequest(url, "POST", {}, data).then();

    // this.props.searchByDate({ from: dateFrom, to: dateTo });
    // this.props.navigation.push("ListParking");
  }

  render() {
    const { firstName, firstNameValid, lastName, lastNameValid, email, emailValid, cars } = this.state;
    const {
      showDateFromPicker,
      showTimeFromPicker,
      dateFrom,
      showDateToPicker,
      showTimeToPicker,
      dateTo,
      dateToValid,
    } = this.state;
    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const getPrice = () => {
      const timeInMinutes = parseInt((dateTo - dateFrom) / 1000 / 60, 10);
      const timeInHours = Math.ceil((timeInMinutes - 4) / 60);
      return cars.pricePerHour * timeInHours;
    };

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView contentContainerStyle={styles.inner} behavior="padding">
          <Title>First name</Title>
          <View>
            <TextInput
              mode="outlined"
              theme={{
                colors: { primary: firstNameValid ? BUTTON_COLOR : redA700, underlineColor: "transparent" },
              }}
              style={styles.input}
              onChangeText={text => this.setFirstName(text)}
              value={firstName}
            />
            {!firstNameValid && (
              <HelperText style={styles.helper} type="error">
                {this.errorMessage("FirstName")}
              </HelperText>
            )}
          </View>

          <Title>Last name</Title>
          <TextInput
            mode="outlined"
            theme={{
              colors: { primary: lastNameValid ? BUTTON_COLOR : redA700, underlineColor: "transparent" },
            }}
            style={styles.input}
            onChangeText={text => this.setLastName(text)}
            value={lastName}
          />
          {!lastNameValid && (
            <HelperText style={styles.helper} type="error">
              {this.errorMessage("LastName")}
            </HelperText>
          )}

          <Title>Email</Title>
          <TextInput
            mode="outlined"
            theme={{
              colors: { primary: emailValid ? BUTTON_COLOR : redA700, underlineColor: "transparent" },
            }}
            style={styles.input}
            onChangeText={text => this.setEmail(text)}
            value={email}
          />
          {!emailValid && (
            <HelperText style={styles.helper} type="error">
              {this.errorMessage("Email")}
            </HelperText>
          )}

          <View>
            <Title>From</Title>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateFromPicker: true })}>
                <TextInput mode="flat" style={styles.input} value={dateFromFormatted} editable={false} />
                {showDateFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateFrom}
                    mode="date"
                    display="calendar"
                    onChange={this.setDateFrom}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeFromPicker: true })}>
                <TextInput mode="flat" style={styles.input} value={timeFromFormatted} editable={false} />
                {showTimeFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
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
                <TextInput mode="flat" style={styles.input} value={dateToFormatted} editable={false} />
                {showDateToPicker && (
                  <DateTimePicker
                    minimumDate={dateFrom}
                    value={dateTo}
                    mode="date"
                    display="calendar"
                    onChange={this.setDateTo}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeToPicker: true })}>
                <TextInput mode="flat" style={styles.input} value={timeToFormatted} editable={false} />
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
            {!this.state.dateToValid && <HelperText type="error">{this.errorMessage("DateTo")}</HelperText>}
          </View>

          <Title style={styles.inner}>Price: {getPrice()}</Title>
          <View style={styles.putOnBottom}>
            <Button
              style={styles.button}
              color={BUTTON_COLOR}
              mode="contained"
              disabled={
                !(
                  firstName &&
                  lastName &&
                  email &&
                  dateFrom &&
                  dateTo &&
                  firstNameValid &&
                  lastNameValid &&
                  emailValid &&
                  dateToValid
                )
              }
              onPress={this.handleSubmit}
            >
              <Text>Make reservation</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  return {
    dates: state.dates,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReserveCar);