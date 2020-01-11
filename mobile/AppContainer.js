import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import SearchFlatScreen from './SearchFlatScreen';
import FlatsListScreen from './FlatsListScreen';


const AppNavigator = createStackNavigator({
  //Login : {screen : LoginScreen},
  //SearchFlat : {screen: SearchFlatScreen},
  FlatsList : {screen: FlatsListScreen}
},
{
  initialRouteName: 'FlatsList',
  headerMode: 'screen'
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer

