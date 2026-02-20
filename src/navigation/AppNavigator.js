import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}   
          options={{ title: 'My Calisthenics' }} 
        />
        <Stack.Screen 
          name="Workout" 
          component={WorkoutScreen} 
          options={{ title: 'Session' }} 
        />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Progress' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}