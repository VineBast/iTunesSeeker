import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Songs from './components/Songs';
import Song from './components/Song';
import { Provider } from "react-redux";
import store from "./store";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const persistor = persistStore(store);

const HomeStack = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='HomeStack'
            component={Home}
          />
          <Stack.Screen
            name='Détails'
            component={Song}
          />
        </Stack.Navigator>
      </PersistGate>
    </Provider >
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Accueil') {
                  iconName = focused
                    ? 'search'
                    : 'search-outline';
                } else if (route.name === 'Bibliothèque') {
                  iconName = focused ? "musical-notes" : "musical-notes-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#8EDBBE',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen
              name='Accueil'
              component={HomeStack}
              options={{
                headerStyle: {
                  backgroundColor: '#8EDBBE',
                },
                headerTintColor: '#fff',
              }}
            />
            <Tab.Screen
              name='Bibliothèque'
              component={Songs}
              options={{
                headerStyle: {
                  backgroundColor: '#8EDBBE',
                },
                headerTintColor: '#fff',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;