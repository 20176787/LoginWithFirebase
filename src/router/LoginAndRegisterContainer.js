import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../page/LoginScreen';
import RegisterScreen from '../page/RegisterScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PhoneSignInScreen from '../page/PhoneSignInScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function LoginAndRegisterContainer() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'Register'} component={RegisterScreen} />
      <Stack.Screen name={'PhoneSignIn'} component={PhoneSignInScreen} />
    </Stack.Navigator>
  );
}
