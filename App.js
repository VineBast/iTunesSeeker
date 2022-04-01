import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Song from './components/Song';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Accueil'
          component={Home}
        />
        <Stack.Screen
          name='Détails'
          component={Song}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;