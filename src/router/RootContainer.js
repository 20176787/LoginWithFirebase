import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import InformationScreen from '../page/Information/InformationScreen';
const Stack = createStackNavigator();
export default function RootContainer({navigation}) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle:{
                backgroundColor:"#fb5b5a"
            },
            headerTitleColor:"#fff",
            headerTitleStyle:{
                fontWeight:'bold'
            }
        }} >
            <Stack.Screen name={'Activity'} component={InformationScreen}
            options={{
                title:"Overview",
                headerLeft:()=>(
                    <Icon.Button name="ios-menu" size={25}  backgroundColor="#fb5b5a" onPress={()=>navigation.openDrawer()}/>
                )
            }}/>
        </Stack.Navigator>
    );
}
