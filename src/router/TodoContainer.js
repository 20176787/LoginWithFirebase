import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import InformationScreen from '../page/Information/InformationScreen';
import TodoScreen from '../page/TODO/TodoScreen';
const Stack = createStackNavigator();
export default function TodoContainer({navigation}) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle:{
                backgroundColor:"#007c67"
            },
            headerTitleColor:"#fff",
            headerTitleStyle:{
                fontWeight:'bold'
            }
        }} >
            <Stack.Screen name={'Activity'} component={TodoScreen}
                          options={{
                              title:"TO DO LIST",
                              headerLeft:()=>(
                                  <Icon.Button name="ios-menu" size={25}  backgroundColor="#007c67" onPress={()=>navigation.openDrawer()}/>
                              )
                          }}/>
        </Stack.Navigator>
    );
}
