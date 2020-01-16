import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import SearchCarScreen from "./componets/carly/SearchCarScreen";

const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    SearchFlat: { screen: SearchFlatScreen },
    SearchCar: { screen: SearchCarScreen },
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
