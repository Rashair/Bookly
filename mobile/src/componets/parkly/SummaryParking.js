import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, Text, BackHandler } from "react-native";
import { Container } from "native-base";
import { Headline, Button } from "react-native-paper";
import { Table, Row } from "react-native-table-component";
import { ScrollView } from "react-native-gesture-handler";

import { LocalDateTime, DateTimeFormatter, nativeJs } from "@js-joda/core";
import { anyError } from "../../redux/actions";
import { styles, themeColors } from "../../styles";

const innerStyles = StyleSheet.create({
  content: {
    backgroundColor: themeColors.background,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fontBold: { fontWeight: "700" },
  row: { alignItems: "flex-start", flexDirection: "row" },
  rowText: {
    fontSize: 16,
    letterSpacing: 0.15,
    lineHeight: 30,
    marginVertical: 2,
    opacity: 0.87,
  },
});

class SummaryParking extends React.Component {
  static navigationOptions = { title: "Summary", headerLeft: () => null };

  constructor(props) {
    super(props);

    const { summaryData } = this.props.navigation.state.params;
    this.state = { ...summaryData };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    const { parking, totalCost, dateFrom, dateTo, firstName, lastName, email } = this.state;
    const dateFromFormatted = LocalDateTime.from(nativeJs(dateFrom)).format(
      DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")
    );
    const dateToFormatted = LocalDateTime.from(nativeJs(dateTo)).format(
      DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")
    );

    const { navigation } = this.props;

    return (
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={innerStyles.content}>
          <Headline>Parking</Headline>
          <Table>
            <Row
              style={innerStyles.row}
              textStyle={[innerStyles.rowText, innerStyles.fontBold, styles.marginBottomBig]}
              flexArr={[0, 30, 5]}
              data={["", `${parking.location}\nWorking hours: ${parking.opens}:00 - ${parking.closes}:00`, ""]}
            />
            <Row
              style={innerStyles.row}
              textStyle={innerStyles.rowText}
              flexArr={[30, 30]}
              data={["Reservation date :", `${dateFromFormatted} - ${dateToFormatted}`]}
            />
            <Row textStyle={innerStyles.rowText} flexArr={[30, 30]} data={["Total cost:", `${totalCost} PLN`]} />
            <Row textStyle={innerStyles.rowText} flexArr={[30, 30]} data={["Reserver:", `${firstName} ${lastName}`]} />
            <Row
              style={innerStyles.row}
              textStyle={innerStyles.rowText}
              flexArr={[30, 30]}
              data={["Contact e-mail:", `${email}`]}
            />
          </Table>

          <View style={[styles.contentColumn, styles.marginTopSmall]}>
            <Button
              mode="contained"
              color={themeColors.primary}
              style={[styles.button, styles.marginBottomSmall]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </Button>
            <Button
              mode="contained"
              color={themeColors.primary}
              style={styles.button}
              onPress={() => navigation.navigate("MyReservationsList")}
            >
              <Text style={styles.buttonText}>Your reservations</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});
export default connect(null, mapDispatchToProps)(SummaryParking);
