import React from "react";
import { connect } from "react-redux";

import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Text, Alert } from "react-native";
import { Title, Button, TextInput, HelperText, Headline } from "react-native-paper";

import { Table, Row } from "react-native-table-component";

import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { sendRequest, combineDateAndTime } from "../../helpers/functions";
import { anyError } from "../../redux/actions";
import { CARLY_API_URL, API_URL, TOKEN_HEADER_KEY } from "../../helpers/constants";
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

const ONE_HOUR_IN_MINUTES = 60 * 60;

class ReserveCar extends React.Component {
  static navigationOptions = { title: "Make reservation" };

  constructor(props) {
    super(props);
    const { cars } = this.props.navigation.state.params;
    const { dates } = this.props;

    const { firstName, lastName, email } = this.props.auth;
    const { carlyToken } = this.props;
    this.state = {
      cars,
      carlyToken,
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
      return;
    }

    const oldDate = this.state.dateFrom;
    const newDate = combineDateAndTime(date ?? oldDate, time ?? oldDate);
    this.setState(oldstate => ({
      dateFrom: newDate,
      dateToValid: this.validateDateTo(newDate, oldstate.dateTo),
    }));
  }

  setDateTo(date, time) {
    if (!date && !time) {
      return;
    }

    const oldDate = this.state.dateTo;
    const newDate = combineDateAndTime(date ?? oldDate, time ?? oldDate);
    this.setState(oldstate => ({
      dateTo: newDate,
      dateToValid: this.validateDateTo(oldstate.dateFrom, newDate),
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
    const { cars, dateFrom, dateTo } = this.state;
    const timeInMinutes = parseInt((dateTo - dateFrom) / 1000 / 60, 10);
    const timeInHours = Math.ceil((timeInMinutes - 4) / 60);
    return cars.price * timeInHours;
  }

  handleSubmit() {
    const { cars, firstName, lastName, email, dateFrom, dateTo } = this.state;
    const dateToValid = this.validateDateTo(dateFrom, dateTo);
    if (!dateToValid) {
      this.setState({ dateToValid });
      return;
    }

    this.setState({ isFetching: true });
    const url = `${CARLY_API_URL}/reservations`;
    const ownerId = this.props.auth.id;
    const data = {
      carId: cars.id,
      name: firstName,
      surname: lastName,
      fromDate: dateFrom.toISOString(),
      toDate: dateTo.toISOString(),
      email,
    };

    const headers = {
      Authorization: this.state.carlyToken,
    };

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
        const externalBookingId = responseJson;
        const bookingData = {
          owner: {
            id: ownerId,
          },
          start_date_time: dateFrom.toISOString(),
          end_date_time: dateTo.toISOString(),
          type: "CAR",
          external_id: externalBookingId,
        };
        const bookingUrl = `${API_URL}/booking/`;
        return sendRequest(bookingUrl, "POST", { [TOKEN_HEADER_KEY]: this.props.auth.securityToken }, bookingData);
      })
      .then(
        booklyResponse => {
          if (booklyResponse.ok) {
            const summaryData = { cars, totalCost: this.getTotalPrice(), dateFrom, dateTo, firstName, lastName, email };
            this.props.navigation.navigate("SummaryCar", { summaryData });
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
      dateFrom,

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
      Alert.alert("Confirm reservation", "Dear, are you sure that you want to reserve this car?", submitButtons);

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

          <Headline>Time of reservation:</Headline>

          <Table>
            <Row data={["  "]} />
            <Row
              style={innerStyles.row}
              textStyle={[innerStyles.input]}
              flexArr={[-2, 30, 5]}
              data={["  ", `From: ${dateFromFormatted}- ${timeFromFormatted}:00`, ""]}
            />
            <Row
              style={innerStyles.row}
              textStyle={innerStyles.input}
              flexArr={[-2, 2, 30]}
              data={["  ", `To: ${dateToFormatted} - ${timeToFormatted}:00`]}
            />
          </Table>
          <Title style={innerStyles.inner}>Price: {this.getTotalPrice() < 0 ? 0 : this.getTotalPrice()}</Title>
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
    carlyToken: state.carlyToken,
  };
};

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReserveCar);
