import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, Text } from "react-native";
import { Container } from "native-base";
import { Headline, Button } from "react-native-paper";
import { Table, Row } from "react-native-table-component";

import { ScrollView } from "react-native-gesture-handler";
import { anyError } from "../../redux/actions";
import { BUTTON_COLOR } from "../../helpers/colors";

const white = "#ffffff";
const styles = StyleSheet.create({
  button: {
    height: 54,
    justifyContent: "center",
  },
  content: {
    alignItems: "stretch",
    backgroundColor: white,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fontBold: { fontWeight: "700" },
  putOnBottom: { flex: 1, justifyContent: "flex-end" },
  row: { alignItems: "flex-start", flexDirection: "row", marginBottom: 20 },
  rowText: {
    fontSize: 20,
    letterSpacing: 0.15,
    lineHeight: 30,
    marginVertical: 2,
    opacity: 0.87,
  },
});

class DetailsParking extends React.Component {
  static navigationOptions = { title: "Details" };

  constructor(props) {
    super(props);

    const { parking } = this.props.navigation.state.params;
    this.state = { parking };
  }

  render() {
    const { parking } = this.state;
    return (
      <Container>
        <ScrollView contentContainerStyle={styles.content}>
          <Headline>Parking</Headline>
          <Table>
            <Row
              style={styles.row}
              textStyle={[styles.rowText, styles.fontBold]}
              flexArr={[0, 30, 5]}
              data={["", parking.location, ""]}
            />
            <Row textStyle={styles.rowText} flexArr={[6, 30]} data={["Price:", `${parking.pricePerHour} PLN / hour`]} />
            <Row
              textStyle={styles.rowText}
              flexArr={[23, 30]}
              data={["Working hours:", `${parking.workingHoursFrom}:00 - ${parking.workingHoursTo}:00`]}
            />
            <Row
              textStyle={styles.rowText}
              flexArr={[30, 30]}
              data={["Number of spots:", `${parking.numberOfSpots}`]}
            />
          </Table>

          <View style={styles.putOnBottom}>
            <Button
              style={styles.button}
              color={BUTTON_COLOR}
              mode="contained"
              onPress={() => {
                /* Redirect to make reservation here */
              }}
            >
              <Text>Make reservation</Text>
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
export default connect(null, mapDispatchToProps)(DetailsParking);
