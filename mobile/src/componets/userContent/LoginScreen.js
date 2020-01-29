import React from "react";
import { StyleSheet, Text ,Image } from "react-native";
import { connect } from "react-redux";
import { Container, Content } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

import utf16 from "crypto-js/enc-utf16";
import sha3 from "crypto-js/sha3";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import { white } from "react-native-paper/lib/commonjs/styles/colors";
import { Container, Content } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

//import { styles, themeColors} from  '../../styles'
import { login } from "../../redux/thunk-functions";
const inner_styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: themeColors.background,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
const image_styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: white,
  },
  content: {
    paddingHorizontal: 150,
    paddingVertical: 160,
  },
});
class LoginScreen extends React.Component {
  static navigationOptions = { title: "Login, dear!" };

  constructor(props) {
    super(props);

    this.setPassword = this.setPassword.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      login: "",
      password: "",
      loginValid: true,
      passwordValid: true,
    };
  }

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.navigation.navigate("SearchCarScreen");
    }
  }

  setLogin(login) {
    // will be useful if login will contain @
    // login.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
    this.setState({
      login, // ,
      loginValid: login.length > 0,
    });
  }

  setPassword(password) {
    this.setState({
      password,
      passwordValid: password.length >= 6,
    });
  }

  errorMessage(field) {
    switch (field) {
      case "Login":
        return "Login name incorrect";
      case "Password":
        return "Please, enter password";
      default:
        return "";
    }
  }

  handleSubmit() {
    // TODO: Check if password and login valid here (user may not changed it)
if(this.state.loginValid && this.state.passwordValid)
   { const { login, password } = this.state;
    const randomMsg = utf16.parse("Keep it secret. Keep it safe");
    const hashDigest = sha3(password + randomMsg);
    const hash = Base64.stringify(hmacSHA512(hashDigest, login));

    const data = { login, password: hash };
    this.props.login(data);
   }

  }
 

  render() {
    return (
      <Container>
        <Content style={inner_styles.content}>
        <Image content={image_styles.content} style={{margin:0, width:55,height:100}}
         source={{ uri:  "https://cdn2.iconfinder.com/data/icons/royal-crowns/512/royal-alphabet-crown-letter-english-b-512.png"}}></Image>

          <Title>Login</Title>
          <TextInput
            mode="outlined"
            style={inner_styles.backgroundWhite}
            content={ {
              paddingHorizontal: 5,
              paddingVertical: 20,
            }}
            onChangeText={text => this.setLogin(text)}
            value={this.state.login}
          />
          <HelperText type="error" visible={!this.state.loginValid}>
            {this.errorMessage("Login")}
          </HelperText>

          <Title>Password</Title>
          <TextInput
            secureTextEntry
            mode="outlined"
            style={inner_styles.backgroundWhite}
            content={ {
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
            onChangeText={text => this.setPassword(text)}
            value={this.state.password}
          />
          <HelperText type="error" visible={!this.state.passwordValid}>
            {this.errorMessage("Password")}
          </HelperText>

          <View style={styles.contentToEnd}>
            <Button
              style={styles.button}
              color={themeColors.primary}
              mode="contained"
              disabled={!(this.state.loginValid && this.state.passwordValid)}
              onPress={this.handleSubmit}
            >
              <Text style={styles.buttonText}> Login</Text>
            </Button>
          </View>
        </Content>
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
  login: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
