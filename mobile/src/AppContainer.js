import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import SearchParking from "./componets/parkly/SearchParking";
import ListParking from "./componets/parkly/ListParking";
import DetailsParking from "./componets/parkly/DetailsParking";
import ReserveParking from "./componets/parkly/ReserveParking";

const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    SearchFlat: { screen: SearchFlatScreen },
    FlatsList: { screen: FlatsListScreen },
    SearchParking: { screen: SearchParking },
    ListParking: { screen: ListParking },
    DetailsParking: { screen: DetailsParking },
    ReserveParking: { screen: ReserveParking },
  },
  {
    initialRouteName: "SearchParking",
    headerMode: "screen",
  }
);

const AuthNavigator = createSwitchNavigator(
  {
    Login: { screen: LoginScreen },
    App: AppNavigator,
  },
  {
    initialRouteName: "Login",
    headerMode: "screen",
  }
);

const AppContainer = createAppContainer(AuthNavigator);

export default AppContainer;
