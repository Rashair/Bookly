import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen';


const AppNavigator = createStackNavigator({
  Login : {screen : LoginScreen}  
},
{
  initialRouteName: 'Login',
  headerMode: 'none'
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer

