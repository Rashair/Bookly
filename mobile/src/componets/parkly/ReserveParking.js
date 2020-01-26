import React from "react";
import { connect } from "react-redux";

import { ScrollView, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Text, Alert } from "react-native";
import { Title, Button, TextInput, HelperText } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { sendRequest, combineDateAndTime } from "../../helpers/functions";
import { anyError } from "../../redux/actions";
import { PARKLY_API_URL, API_URL, TOKEN_HEADER_KEY } from "../../helpers/constants";
import { styles, themeColors } from "../../styles";

const innerStyles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.background,
    padding: 20,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  input: {
    backgroundColor: themeColors.background,
    fontSize: 18,
    height: 40,
  },
  row: {
    flexDirection: "row",
  },
});

const currDate = new Date();
const ONE_HOUR_IN_MINUTES = 60 * 60;

class ReserveParking extends React.Component {
  static navigationOptions = { title: "Make reservation" };

  constructor(props) {
    super(props);
    const { parking } = this.props.navigation.state.params;
    const { dates } = this.props;
    const { firstName, lastName, email } = this.props.auth;

    this.state = {
      parking,
      firstName,
      lastName,
      email,
      dateFrom: dates.from,
      dateTo: dates.to,
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      dateToValid: true,
      isFetching: false,
    };

    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
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

  getTotalPrice() {
    const { parking, dateFrom, dateTo } = this.state;
    const timeInMinutes = parseInt((dateTo - dateFrom) / 1000 / 60, 10);
    const timeInHours = Math.ceil((timeInMinutes - 4) / 60);
    return parking.pricePerHour * timeInHours;
  }

  handleSubmit() {
    const { parking, firstName, lastName, email, dateFrom, dateTo } = this.state;
    const dateToValid = this.validateDateTo(dateFrom, dateTo);
    if (!dateToValid) {
      this.setState({ dateToValid });
      return;
    }

    this.setState({ isFetching: true });
    const url = `${PARKLY_API_URL}/parking`; // reservations/`;
    const ownerId = this.props.auth.id;
    const data = {
      parkingId: parking.id,
      city: parking.city,
      street: parking.street,
      streetNumber: parking.streetNumber,
      totalCost: this.getTotalPrice(),
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    };
    const headers = {}; // Auth headers here
    sendRequest(url, "POST", headers, data)
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Error sending data to parkly, status code: ${response.status}`);
        },
        error => this.props.anyError(error)
      )
      .then(responseJson => {
        const externalBookingId = responseJson.id;
        const bookingData = {
          owner: {
            id: ownerId,
          },
          start_date_time: dateFrom.toISOString(),
          end_date_time: dateTo.toISOString(),
          type: "PARKING_SPACE",
          external_id: externalBookingId,
        };
        const bookingUrl = `${API_URL}/booking/`;
        return sendRequest(bookingUrl, "POST", { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, bookingData);
      })
      .then(
        booklyResponse => {
          if (booklyResponse.ok) {
            const summaryData = { parking, totalCost: data.totalCost, dateFrom, dateTo, firstName, lastName, email };
            this.props.navigation.navigate("SummaryParking", { summaryData });
          } else {
            throw new Error(`Error sending data to bookly, status code: ${booklyResponse.status}`);
          }
        },
        error => this.props.anyError(error)
      )
      .catch(error => {
        this.setState({ isFetching: false });
        this.props.anyError(error);
      });
  }

  render() {
    const { firstName, firstNameValid, lastName, lastNameValid, email, emailValid, isFetching } = this.state;
    const {
      showDateFromPicker,
      showTimeFromPicker,
      dateFrom,
      showDateToPicker,
      showTimeToPicker,
      dateTo,
      dateToValid,
    } = this.state;
    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));

    const submitButtons = [
      { text: "Cancel", onPress: () => {} },
      { text: "Yes", onPress: () => this.handleSubmit() },
    ];
    const confirmationAlert = () =>
      Alert.alert("Confirm reservation", "Are you sure that you want to reserve this parking?", submitButtons);

    return (
      <ScrollView style={innerStyles.container}>
        <KeyboardAvoidingView contentContainerStyle={innerStyles.inner} behavior="padding">
          <Title>First name</Title>
          <View>
            <TextInput
              mode="outlined"
              theme={{
                colors: {
                  primary: firstNameValid ? themeColors.primary : themeColors.danger,
                  underlineColor: "transparent",
                },
              }}
              style={innerStyles.input}
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
              colors: {
                primary: lastNameValid ? themeColors.primary : themeColors.danger,
                underlineColor: "transparent",
              },
            }}
            style={innerStyles.input}
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
            autoCompleteType="email"
            autoCapitalize="none"
            theme={{
              colors: { primary: emailValid ? themeColors.primary : themeColors.danger, underlineColor: "transparent" },
            }}
            style={innerStyles.input}
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
            <View style={innerStyles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateFromPicker: true })}>
                <TextInput mode="flat" style={innerStyles.input} value={dateFromFormatted} editable={false} />
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
                <TextInput mode="flat" style={innerStyles.input} value={timeFromFormatted} editable={false} />
                {showTimeFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateFrom}
                    mode="time"
                    display="clock"
                    onChange={(e, date) => this.setDateFrom(null, date)}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Title>To</Title>
            <View style={innerStyles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateToPicker: true })}>
                <TextInput mode="flat" style={innerStyles.input} value={dateToFormatted} editable={false} />
                {showDateToPicker && (
                  <DateTimePicker
                    minimumDate={dateFrom}
                    value={dateTo}
                    mode="date"
                    display="calendar"
                    onChange={(e, date) => this.setDateTo(date)}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeToPicker: true })}>
                <TextInput mode="flat" style={innerStyles.input} value={timeToFormatted} editable={false} />
                {showTimeToPicker && (
                  <DateTimePicker
                    minimumDate={dateFrom}
                    value={dateTo}
                    mode="time"
                    display="clock"
                    onChange={(e, date) => this.setDateTo(null, date)}
                  />
                )}
              </TouchableOpacity>
            </View>
            {!this.state.dateToValid && <HelperText type="error">{this.errorMessage("DateTo")}</HelperText>}
          </View>

          <Title style={innerStyles.inner}>Price: {this.getTotalPrice()}</Title>
          <View style={styles.contentToEnd}>
            <Button
              style={styles.button}
              color={themeColors.primary}
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
                  dateToValid &&
                  !isFetching
                )
              }
              onPress={confirmationAlert}
            >
              <Text style={styles.buttonText}>Make reservation</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReserveParking);
