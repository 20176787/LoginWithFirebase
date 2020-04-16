import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ActivationScreen from '../page/Information/ActivationScreen';
import EducationScreen from '../page/Information/EducationScreen';
import InformationScreen from '../page/Information/InformationScreen';
import QuotesFavouriteScreen from '../page/Information/QuotesFavouriteScreen';
import TodoScreen from '../page/TODO/TodoScreen';
import {createStackNavigator} from '@react-navigation/stack';
import RootContainer from './RootContainer';
import DrawerContent from './Content/DrawerContent';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function InformationContainer() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerType={dimensions.width > 900 ? 'permanent' : 'front'}
      drawerStyle={{
        backgroundColor: '#fff',
        width: 250,
      }}
      drawerContentOptions={{
        activeTintColor: '#e9000d',
        // itemStyle: { marginVertical: 30 },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={'Information'} component={RootContainer} />
      <Drawer.Screen name={'Activation'} component={ActivationScreen} />
      <Drawer.Screen name={'Education'} component={EducationScreen} />
      <Drawer.Screen name={'Quotes'} component={QuotesFavouriteScreen} />
      <Drawer.Screen name={'Activity'} component={TodoScreen} />
    </Drawer.Navigator>
  );
}
