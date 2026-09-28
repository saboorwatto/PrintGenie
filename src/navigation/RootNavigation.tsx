import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import CustomerStack from './CustomerStack';
import ShopOwnerStack from './ShopOwnerStack';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Customer" component={CustomerStack} />
        <Stack.Screen name="ShopOwner" component={ShopOwnerStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}