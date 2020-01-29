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
        <ScrollView contentContainerStyle={innerStyles.content}>
          <Headline>Almost your car</Headline>
          <Table>
            <Row
              style={[innerStyles.row, styles.marginBottomBig]}
              textStyle={[innerStyles.rowText, innerStyles.fontBold]}
              flexArr={[-5, 40]}
              data={["", cars.make+"  "+ cars.model, ""]}
            />
          
            <Row
              textStyle={innerStyles.rowText}
              flexArr={[6, 30]}
              data={["Price:", `${cars.price} PLN / hour`]}
            />
              
              <Row
              textStyle={innerStyles.rowText}
              flexArr={[30, 30]}
              data={["Number of seats:", `${cars.seats}`]}
            />
             <Row
              textStyle={innerStyles.rowText}
              flexArr={[10, 30]}
              data={["Licence:", `${cars.licence}`]}
            />
            <Row
              textStyle={innerStyles.rowText}
              flexArr={[6, 30]}
              data={["Year:", `${cars.year}`]}
            />
          
          </Table>
          <Text  
              style={{fontSize:20}}>Address:</Text>
         
        
         <Text   style={{fontSize:20 }}>{cars.location}</Text>
          <View style={styles.contentToEnd}>
            <Button
              mode="contained"
              color={themeColors.primary}
              style={styles.button}
              onPress={() => navigation.navigate("ReserveCar", { cars  })}
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
export default connect(null, mapDispatchToProps)(DetailsCar);