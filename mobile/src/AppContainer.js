import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import HomeScreen from "./componets/userContent/HomeScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import ReservationFormScreen from "./componets/flatly/ReservationFormScreen";
import FlatSummaryScreen from "./componets/flatly/FlatSummaryScreen";
import FlatDetailsScreen from "./componets/flatly/FlatDetailsScreen";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import SearchParking from "./componets/parkly/SearchParking";
import SearchFlatScreen from "./componets/flatly/SearchFlatScreen";
import ListParking from "./componets/parkly/ListParking";
import DetailsParking from "./componets/parkly/DetailsParking";
import ReserveParking from "./componets/parkly/ReserveParking";
import SummaryParking from "./componets/parkly/SummaryParking";
import SearchCarScreen from "./componets/carly/SearchCarScreen";
import CarListScreen from "./componets/carly/CarListScreen";
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
    LoginScreen: { screen: LoginScreen },

    MyReservationsList: { screen: MyReservationsList },
    MyReservationCarDetails: { screen: MyReservationCarDetails },
    MyReservationFlatDetails: { screen: MyReservationFlatDetails },
    MyReservationParkingDetails: { screen: MyReservationParkingDetails },
    MyReservationDetails: { screen: MyReservationDetails },
    SearchFlat: { screen: SearchFlatScreen },
    FlatsList: { screen: FlatsListScreen },
    SearchCar: { screen: SearchCarScreen },
    CarList: { screen: CarListScreen },
    SearchParking: { screen: SearchParking },
    ListParking: { screen: ListParking },
    DetailsParking: { screen: DetailsParking },
    ReserveParking: { screen: ReserveParking },
    SummaryParking: { screen: SummaryParking },
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
