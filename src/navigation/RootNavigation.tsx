import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import CustomerStack from './CustomerStack';
import AIMonitoringScreen from '../screens/AIMonitoringScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Customer" component={CustomerStack} />
        <Stack.Screen name="AIMonitoring" component={AIMonitoringScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}