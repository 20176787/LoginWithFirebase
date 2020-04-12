import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../page/LoginScreen';
import RegisterScreen from '../page/RegisterScreen';
import HomeScreen from '../page/HomeScreen';
const Stack = createStackNavigator();
export default function RootContainer() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Home'} component={HomeScreen} />
        </Stack.Navigator>
    );
}
