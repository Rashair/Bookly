import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, Text } from "react-native";
import { Container } from "native-base";
import { Headline, Button } from "react-native-paper";
import { Table, Row } from "react-native-table-component";

import { ScrollView } from "react-native-gesture-handler";
import { white } from "react-native-paper/lib/commonjs/styles/colors";
import { anyError } from "../../redux/actions";
import { BUTTON_COLOR } from "../../helpers/colors";

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

class DetailsCar extends React.Component {
  static navigationOptions = { title: "Details" };

  constructor(props) {
    super(props);
    const { cars } = this.props.navigation.state.params;
   
    this.state = { cars };
  }

  render() {
    const { cars } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <ScrollView contentContainerStyle={styles.content}>
          <Headline>Almost your car</Headline>
          <Table>
            <Row
              style={styles.row}
              textStyle={[styles.rowText, styles.fontBold]}
              flexArr={[20, 30, 5]}
              data={["", cars.model, ""]}
            />
            <Row textStyle={styles.rowText} flexArr={[10, 30]} data={["Location:", `${cars.location}`]} />
            <Row textStyle={styles.rowText} flexArr={[6, 30]} data={["Price:", `${cars.price} PLN / hour`]} />
            <Row textStyle={styles.rowText} flexArr={[8, 30]} data={["Engine:", `${cars.engine}`]} />
            <Row textStyle={styles.rowText} flexArr={[5, 30]} data={["Year:", `${cars.year}`]} />
            <Row textStyle={styles.rowText} flexArr={[7, 30]} data={["Seats:", `${cars.seats}`]} />

            
          </Table>

          <View style={styles.putOnBottom}>
            <Button
              style={styles.button}
              color={BUTTON_COLOR}
              mode="contained"
              onPress={() => navigation.push("ReserveCar", { cars })}
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
export default connect(null, mapDispatchToProps)(DetailsCar);
