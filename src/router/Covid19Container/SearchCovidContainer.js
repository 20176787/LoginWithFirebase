import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CountryDetail from '../../page/Covid-19/CountryDetailScreen';
import SearchScreenCovid19 from '../../page/Covid-19/SearchScreenCovid19';
import ChartCasesScreen from '../../page/Covid-19/ChartCasesScreen';
import ChartDeathsScreen from '../../page/Covid-19/ChartDeathsScreen';
const Stack = createStackNavigator();
export default function SearchCovidContainer() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name={'SearchCovid'} component={SearchScreenCovid19} />
            <Stack.Screen name={'CountryDetail'} component={CountryDetail} />
            <Stack.Screen name={'ChartCases'} component={ChartCasesScreen} />
            <Stack.Screen name={'ChartDeaths'} component={ChartDeathsScreen} />
        </Stack.Navigator>
    );
}
