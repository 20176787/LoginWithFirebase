import * as React from 'react';
import HomeScreenCovid19 from '../../page/Covid-19/HomeScreenCovid19';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchCovidContainer from './SearchCovidContainer';
import MyTabBar from '../Content/MyTabBar';
import BottomTabBarCustom from '../Content/BottomTabBarCustom';
const Tab = createBottomTabNavigator();
export default function HomeCovid19Container() {
  return (
    <Tab.Navigator
      headerMode={'none'}
      initialRouteName="HomeCovid"
      tabBar={(props) => (
        <BottomTabBarCustom
          {...props}
        />
      )}>
      <Tab.Screen name={'HomeCovid'} component={HomeScreenCovid19} />
      <Tab.Screen name={'SearchCovid'} component={SearchCovidContainer} />
    </Tab.Navigator>
  );
}
