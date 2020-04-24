import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './components/pages/Login.js'
import { SignUp } from './components/pages/SignUp.js'
import { ClientHome } from './components/pages/ClientHome.js'
import { TrainerHome } from './components/pages/TrainerHome.js'
import { navyLime } from './constants/styles'
const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}
        screenOptions={{
          headerStyle: navyLime.header,
          headerTitleStyle: navyLime.headerTitle,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Sign Up',
          }} />
        <Stack.Screen
          name="TrainerHome"
          component={TrainerHome}
          options={{
            title: 'TrainTrax',
          }} />
        <Stack.Screen
          name="ClientHome"
          component={ClientHome}
          options={{
            title: 'TrainTrax',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
