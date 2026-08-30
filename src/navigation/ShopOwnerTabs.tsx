import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ClipboardList, Layers, Wallet, Menu } from 'lucide-react-native';
import { colors } from '../theme/colors';

import OwnerDashboardScreen from '../screens/shopowner/OwnerDashboardScreen';
import OwnerOrdersScreen from '../screens/shopowner/OwnerOrderScreen';
import OwnerServicesScreen from '../screens/shopowner/OwnerServicesScreen';
import OwnerEarningsScreen from '../screens/shopowner/OwnerEarningsScreen';
import OwnerMoreScreen from '../screens/shopowner/OwnerMoreScreen';

const Tab = createBottomTabNavigator();

export default function ShopOwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.royalBlue,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { paddingBottom: 6, paddingTop: 6, height: 60 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Home" component={OwnerDashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tab.Screen name="Orders" component={OwnerOrdersScreen} options={{ tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} /> }} />
      <Tab.Screen name="Services" component={OwnerServicesScreen} options={{ tabBarIcon: ({ color, size }) => <Layers color={color} size={size} /> }} />
      <Tab.Screen name="Earnings" component={OwnerEarningsScreen} options={{ tabBarIcon: ({ color, size }) => <Wallet color={color} size={size} /> }} />
      <Tab.Screen name="More" component={OwnerMoreScreen} options={{ tabBarIcon: ({ color, size }) => <Menu color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}