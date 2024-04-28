import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen'
import GoogleloginScreen from './screens/GoogleloginScreen'
import EmailandpasswordScreen from './screens/EmailandpasswordScreen'
import PhoneverificationScreen from './screens/PhoneverificationScreen'
import OtpverificationScreen from './screens/OtpverificationScreen'
import UserdetailsScreen from './screens/UserdetailsScreen'
import HomeScreen from './screens/HomeScreen'
import AccountScreen from './screens/AccountScreen'
import ProfileScreen from './screens/ProfileScreen'
import OrderScreen from './screens/OrderScreen'
import RestaurentScreen from './screens/RestaurentScreen'
import FoodsingledetailScreen from './screens/FoodsingledetailScreen'
import CartScreen from './screens/CartScreen'
import HelpScreen from './screens/HelpScreen';
import SearchScreen from './screens/SearchScreen';
import Phoneverificationgoogle from './screens/Phoneverificationgoogle';
import Otpverificationgoogle from './screens/Otpverificationgoogle';
import OrdersucessScreen from './screens/OrdersucessScreen';
import Forgotteemailverification from './screens/Forgotteemailverification';
import NewpasswordScreen from './screens/NewpasswordScreen';
import PaymentScreen from './screens/PaymentScreen';
import ForgotteotpScreen from './screens/ForgotteotpScreen';
import Paymentpagescreen from './screens/Paymentpagescreen';
import AboutScreen from './screens/AboutScreen';
import CookieScreen from './screens/CookieScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {



  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Email" component={EmailandpasswordScreen} />
        <Stack.Screen name="Phone" component={PhoneverificationScreen} />
        <Stack.Screen name="Otp" component={OtpverificationScreen} />
        <Stack.Screen name="Create" component={UserdetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurentScreen} />
        <Stack.Screen name="Fooddetails" component={FoodsingledetailScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Auth" component={GoogleloginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Orders" component={OrderScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Googlephone" component={Phoneverificationgoogle} />
        <Stack.Screen name="Googleotp" component={Otpverificationgoogle} />
        <Stack.Screen name="Ordersucess" component={OrdersucessScreen} />
        <Stack.Screen name="Emailverification" component={Forgotteemailverification} />
        <Stack.Screen name="Changepassword" component={NewpasswordScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Forgotteotp" component={ForgotteotpScreen} />
        <Stack.Screen name="Aboutpage" component={AboutScreen} />
        <Stack.Screen name="Paymentpage" component={Paymentpagescreen} />
        <Stack.Screen name="Cookies" component={CookieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
