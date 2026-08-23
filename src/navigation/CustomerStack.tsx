import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerTabs from './CustomerTabs';
import UploadDesignScreen from '../screens/customer/UploadDesignScreen';
import DesignEditorScreen from '../screens/customer/DesignEditorScreen';
import QuoteResultScreen from '../screens/customer/QouteResultScreen';
import ComparePressesScreen from '../screens/customer/ComparePressScreen';
import PaymentScreen from '../screens/customer/PaymentScreen';
import OrderTrackingScreen from '../screens/customer/OrderTrackingScreen';
import ProfileMenuScreen from '../screens/customer/ProfileMenuScreen';
import OrderDetailScreen from '../screens/customer/OrderDetailScreen';
import InvoiceReceiptScreen from '../screens/customer/InvoiceReceiptScreen';
import RatingReviewScreen from '../screens/customer/RatingReviewScreen';
import ComplaintRefundScreen from '../screens/customer/ComplaintRefundScreen';
import FavoriteShopsScreen from '../screens/customer/FavoriteShopsScreen';
import NotificationsScreen from '../screens/customer/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name="UploadDesign" component={UploadDesignScreen} />
      <Stack.Screen name="DesignEditor" component={DesignEditorScreen} />
      <Stack.Screen name="QuoteResult" component={QuoteResultScreen} />
      <Stack.Screen name="ComparePresses" component={ComparePressesScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="InvoiceReceipt" component={InvoiceReceiptScreen} />
      <Stack.Screen name="RatingReview" component={RatingReviewScreen} />
      <Stack.Screen name="ComplaintRefund" component={ComplaintRefundScreen} />
      <Stack.Screen name="FavoriteShops" component={FavoriteShopsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileMenuScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}