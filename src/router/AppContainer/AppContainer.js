import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginAndRegisterContainer from '../LoginAndRegisterContainer';
import RootContainer from '../RootContainer';

export default function AppContainer() {
    return (
        <NavigationContainer>
            <LoginAndRegisterContainer/>
            <RootContainer/>
        </NavigationContainer>
    );

}
