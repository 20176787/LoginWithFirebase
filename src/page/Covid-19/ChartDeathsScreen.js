import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgBack from '../../common/Components/icons/Back';
import theme from '../../store/utils/theme';
import i18n from '../../store/i18n';
import LineChart from 'react-native-responsive-linechart';
export default function ChartDeathsScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [countryKey, setCountryKey] = useState([]);
  const getCountryData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://corona.lmao.ninja/v2/historical/${route.params.country}`,
    );
    const res = await response.json();
    const data = res.timeline.deaths;
    const countryDataValues = Object.values(data);
    const countryKeyValues = Object.keys(data);
    await setCountryData(countryDataValues);
    await setCountryKey(countryKeyValues);
    setLoading(false);
  };
  useEffect(() => {
    getCountryData();
  }, []);
  const config = {
    line: {
      visible: false,
      strokeWidth: 1,
      strokeColor: theme.colors.textlight,
    },
    area: {
      visible: true,
      gradientFrom: 'orange',
      gradientFromOpacity: 1,
      gradientTo: theme.colors.danger,
      gradientToOpacity: 0.4,
    },
    xAxis: {
      visible: true,
      labelFontSize: 12,
      labelColor: theme.colors.textdark,
    },
    dataPoint: {
      visible: true,
      color: '#ff0500',
      radius: 2,
      label: {visible: true, marginBottom: 25},
    },
    grid: {
      stepSize: 3000,
    },
    yAxis: {
      labelColor: theme.colors.textdark,
    },
    insetY: 10,
    insetX: 10,
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.bglight}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 10}}
          onPress={() => navigation.goBack()}>
          <SvgBack color={theme.colors.textlight} />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {i18n.get('numberOfDeathChart')}
        </Text>
      </View>
      {!loading ? (
        <ScrollView horizontal={true}>
          <LineChart
            style={{flex: 1, width: 4000}}
            config={config}
            data={countryData}
            xLabels={countryKey}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
