import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import {
  FLATLY_API_URL,
  PARKLY_API_URL,
  CARLY_API_URL,
  PARKLY_LOGIN_HEADER_KEY,
  PARKLY_LOGIN_HEADER_VALUE,
} from "../../helpers/constants";
import { sendRequest } from "../../helpers/functions";
import { anyError, setCarlyToken, setFlatlyToken, setParklyToken } from "../../redux/actions";
import { themeColors, styles } from "../../styles";

class HomeScreen extends React.Component {
  componentDidMount() {
    this.fetchCarlyToken();
    this.fetchParklyToken();
    // this.fetchFlatlyToken()
  }

  fetchCarlyToken() {
    const carlyBody = {
      email: "bookly@bookly.com",
      password: "reactbookly",
    };
    const carlyUrl = `${CARLY_API_URL}/login`;
    sendRequest(carlyUrl, "POST", {}, carlyBody)
      .then(response => {
        if (response.ok) {
          response.json().then(json => this.props.setCarlyToken(json.Authorization));
        } else {
          throw new Error(`Error fetching carly token, status code: ${response.status}`);
        }
      })
      .catch(error => {
        this.props.anyError(error);
      });
  }

  fetchParklyToken() {
    const parklyHeader = {
      [PARKLY_LOGIN_HEADER_KEY]: [PARKLY_LOGIN_HEADER_VALUE],
    };
    const parklyUrl = `${PARKLY_API_URL}/service/login`;
    sendRequest(parklyUrl, "GET", parklyHeader)
      .then(response => {
        if (response.ok) {
          response.text().then(text => this.props.setParklyToken(text));
        } else {
          throw new Error(`Error fetching parkly token, status code: ${response.status}`);
        }
      })
      .catch(error => {
        this.props.anyError(error);
      });
  }

  fetchFlatlyToken() {
    const flatlyBody = {
      // email: "bookly@bookly.com",
      // password: "reactbookly"
    };
    const flatlyUrl = `${FLATLY_API_URL}/login`;
    sendRequest(flatlyUrl, "POST", {}, flatlyBody)
      .then(response => {
        if (response.ok) {
          response.json().then(json => this.props.setFlatlyToken(json.Authorization));
        } else {
          throw new Error(`Error sending fetching carly token, status code: ${response.status}`);
        }
      })
      .catch(error => {
        this.props.anyError(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container_modal}>
        <Button
          style={styles.button}
          color={themeColors.primary}
          mode="contained"
          onPress={() => navigate("MyReservationsList")}
        >
          <Text>My reservations</Text>
        </Button>
        <Button
          style={styles.button}
          color={themeColors.primary}
          mode="contained"
          onPress={() => navigate("SearchFlat")}
        >
          <Text>Find flat </Text>
        </Button>
        <Button
          style={styles.button}
          color={themeColors.primary}
          mode="contained"
          onPress={() => navigate("SearchCar")}
        >
          <Text> Find car</Text>
        </Button>
        <Button
          style={styles.button}
          color={themeColors.primary}
          mode="contained"
          onPress={() => navigate("SearchParking")}
        >
          <Text> Find parking </Text>
        </Button>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
  setCarlyToken: data => dispatch(setCarlyToken(data)),
  setParklyToken: data => dispatch(setParklyToken(data)),
  setFlatlyToken: data => dispatch(setFlatlyToken(data)),
});

export default connect(null, mapDispatchToProps)(HomeScreen);