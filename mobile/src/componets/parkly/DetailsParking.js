import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, Text } from "react-native";
import { Container } from "native-base";
import { Headline, Button } from "react-native-paper";
import { Table, Row } from "react-native-table-component";

import { ScrollView } from "react-native-gesture-handler";
import { anyError } from "../../redux/actions";
import { styles, themeColors } from "../../styles";

const innerStyles = StyleSheet.create({
  content: {
    alignItems: "stretch",
    backgroundColor: themeColors.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fontBold: { fontWeight: "700" },
  row: { alignItems: "flex-start", flexDirection: "row" },
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
    const { navigation } = this.props;

    return (
      <Container>
        <ScrollView contentContainerStyle={innerStyles.content}>
          <Headline>Parking</Headline>
          <Table>
            <Row
              style={[innerStyles.row, styles.marginBottomBig]}
              textStyle={[innerStyles.rowText, innerStyles.fontBold]}
              flexArr={[0, 30, 5]}
              data={["", parking.location, ""]}
            />
            <Row
              textStyle={innerStyles.rowText}
              flexArr={[6, 30]}
              data={["Price:", `${parking.pricePerHour} PLN / hour`]}
            />
            <Row
              textStyle={innerStyles.rowText}
              flexArr={[23, 30]}
              data={["Working hours:", `${parking.workingHoursFrom}:00 - ${parking.workingHoursTo}:00`]}
            />
            <Row
              textStyle={innerStyles.rowText}
              flexArr={[30, 30]}
              data={["Number of spots:", `${parking.numberOfSpots}`]}
            />
          </Table>

          <View style={styles.contentToEnd}>
            <Button
              mode="contained"
              color={themeColors.primary}
              style={styles.button}
              onPress={() => navigation.navigate("ReserveParking", { parking })}
            >
              <Text style={styles.buttonText}>Make reservation</Text>
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
