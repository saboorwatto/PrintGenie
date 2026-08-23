import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ClipboardList, Plus, FileText, User } from 'lucide-react-native';
import { colors } from '../theme/colors';

import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import CustomerOrdersScreen from '../screens/customer/CustomerOrderScreen';
import UploadDesignScreen from '../screens/customer/UploadDesignScreen';
import CustomerQuotesScreen from '../screens/customer/CustomerQoutesScreen';
import ProfileMenuScreen from '../screens/customer/ProfileMenuScreen';

const Tab = createBottomTabNavigator();

export default function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { paddingBottom: 6, paddingTop: 6, height: 60 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={CustomerOrdersScreen}
        options={{ tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} /> }}
      />
      <Tab.Screen
        name="NewQuote"
        component={UploadDesignScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Plus color={colors.white} size={20} style={{ backgroundColor: colors.navy, borderRadius: 22, padding: 12, marginTop: -20 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Quotes"
        component={CustomerQuotesScreen}
        options={{ tabBarIcon: ({ color, size }) => <FileText color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMenuScreen}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}