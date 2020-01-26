import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import HomeScreen from "./componets/userContent/HomeScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";

import MyReservationsList from "./componets/userContent/MyReservationsList";
import MyReservationCarDetails from "./componets/userContent/details/MyReservationCarDetails";
import MyReservationFlatDetails from "./componets/userContent/details/MyReservationFlatDetails";
import MyReservationParkingDetails from "./componets/userContent/details/MyReservationParkingDetails";
import MyReservationDetails from "./componets/userContent/details/MyReservationDetails";
import DetailsCar from  "./componets/carly/DetailsCar";
import ListCars from "./componets/carly/ListCars";
import ReserveCar from "./componets/carly/ReserveCar";
import SearchCarScreen from "./componets/carly/SearchCarScreen";
import SummaryCar from "./componets/carly/SummaryCar";
const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    FlatsList: { screen: FlatsListScreen },
    LoginScreen: { screen: LoginScreen },
    MyReservationsList: { screen: MyReservationsList },
    MyReservationCarDetails: { screen: MyReservationCarDetails },
    MyReservationFlatDetails: { screen: MyReservationFlatDetails },
    MyReservationParkingDetails: { screen: MyReservationParkingDetails },
    MyReservationDetails: { screen: MyReservationDetails },
    DetailsCar: { screen: DetailsCar },
    ListCars:{screen: ListCars},
    ReserveCar:{screen: ReserveCar},
    SearchCarScreen:{screen:SearchCarScreen},
    SummaryCar:{screen:SummaryCar}
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "screen",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
