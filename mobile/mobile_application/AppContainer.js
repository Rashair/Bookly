import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';import Home from './HomeScreen';
import MyReservationsList from './reservations/MyReservationsList'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';


const AppNavigator = createStackNavigator({
  Login : {screen : LoginScreen}  
},
{
  initialRouteName: 'Login',
  headerMode: 'none'
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer

