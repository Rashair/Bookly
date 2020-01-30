import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import HomeScreen from "./componets/userContent/HomeScreen";

import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import FlatDetailsScreen from "./componets/flatly/FlatDetailsScreen";
import ReservationFormScreen from "./componets/flatly/ReservationFormScreen";
import FlatSummaryScreen from "./componets/flatly/FlatSummaryScreen";

import SearchParking from "./componets/parkly/SearchParking";

import ListParking from "./componets/parkly/ListParking";
import DetailsParking from "./componets/parkly/DetailsParking";
import ReserveParking from "./componets/parkly/ReserveParking";
import SummaryParking from "./componets/parkly/SummaryParking";
import SearchCarScreen from "./componets/carly/SearchCarScreen";
import MyReservationsList from "./componets/userContent/MyReservationsList";
import MyReservationCarDetails from "./componets/userContent/details/MyReservationCarDetails";
import MyReservationFlatDetails from "./componets/userContent/details/MyReservationFlatDetails";
import MyReservationParkingDetails from "./componets/userContent/details/MyReservationParkingDetails";
import MyReservationDetails from "./componets/userContent/details/MyReservationDetails";


const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    MyReservationsList: { screen: MyReservationsList },
    MyReservationCarDetails: { screen: MyReservationCarDetails },
    MyReservationFlatDetails: { screen: MyReservationFlatDetails },
    MyReservationParkingDetails: { screen: MyReservationParkingDetails },
    MyReservationDetails: { screen: MyReservationDetails },
    
    SearchCar: { screen: SearchCarScreen },
    SearchParking: { screen: SearchParking },
    ListParking: { screen: ListParking },
    DetailsParking: { screen: DetailsParking },
    ReserveParking: { screen: ReserveParking },
    SummaryParking: { screen: SummaryParking },

    SearchFlat: { screen: SearchFlatScreen },
    FlatsList: { screen: FlatsListScreen },
    ReservationForm: {screen: ReservationFormScreen},
    FlatSummary: {screen: FlatSummaryScreen},
    FlatDetails: {screen: FlatDetailsScreen}
  },
  {
    initialRouteName: "Home",
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
