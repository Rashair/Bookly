import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import SearchParking from "./componets/parkly/SearchParking";
import ListParkings from "./componets/parkly/ListParkings";

const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    SearchFlat: { screen: SearchFlatScreen },
    FlatsList: { screen: FlatsListScreen },
    SearchParking: { screen: SearchParking },
    ListParkings: { screen: ListParkings },
  },
  {
    initialRouteName: "Login",
    headerMode: "screen",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
