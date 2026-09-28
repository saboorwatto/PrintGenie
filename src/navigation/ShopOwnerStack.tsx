import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OwnerRegistrationScreen from '../screens/shopowner/OwnerRegistrationScreen';
import ShopOwnerTabs from './ShopOwnerTabs';
import OwnerProfileScreen from '../screens/shopowner/OwnerProfileScreen';
import OwnerDesignProofScreen from '../screens/shopowner/OwnerDesignProofScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

export default function ShopOwnerStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ShopOwnerTabs">
      <Stack.Screen name="OwnerRegistration" component={OwnerRegistrationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ShopOwnerTabs" component={ShopOwnerTabs} />
      <Stack.Screen name="OwnerProfile" component={OwnerProfileScreen} />
      <Stack.Screen name="OwnerDesignProof" component={OwnerDesignProofScreen} />
    </Stack.Navigator>
  );
}