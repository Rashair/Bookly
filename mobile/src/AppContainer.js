import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import HomeScreen from './componets/reservations/HomeScreen'
import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import MyReservationsList from './componets/reservations/MyReservationsList';
import MyReservationCarDetails from './componets/reservations/Details/MyReservationCarDetails';
import MyReservationFlatDetails from './componets/reservations/Details/MyReservationFlatDetails';
import MyReservationParkingDetails from './componets/reservations/Details/MyReservationParkingDetails';

const AppNavigator = createStackNavigator(
  {
    HomeScreen : { screen: HomeScreen},
    FlatsList: { screen: FlatsListScreen },
    LoginScreen: { screen: LoginScreen },
    MyReservationsList: { screen : MyReservationsList},
    MyReservationCarDetails : { screen : MyReservationCarDetails},
    MyReservationFlatDetails : { screen : MyReservationFlatDetails},
    MyReservationParkingDetails : { screen : MyReservationParkingDetails}
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "screen",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
