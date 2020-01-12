import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";

const AppNavigator = createStackNavigator(
  {
    //Login : {screen : LoginScreen},
    //SearchFlat : {screen: SearchFlatScreen},
    FlatsList: { screen: FlatsListScreen },
    LoginScreen: { screen: LoginScreen },
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "screen",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
