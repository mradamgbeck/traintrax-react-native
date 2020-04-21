import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './components/pages/Login.js'
import { SignUp } from './components/pages/SignUp.js'
import { Home } from './components/pages/Home.js'
const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Sign Up' }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'TrainTrax' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
