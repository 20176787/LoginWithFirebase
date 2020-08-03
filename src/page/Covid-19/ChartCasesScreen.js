import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import SvgBack from '../../common/Components/icons/Back';
import theme from '../../store/utils/theme';
import i18n from '../../store/i18n';
import LineChart from 'react-native-responsive-linechart';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index.native';
export default function ChartCasesScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [valuesData, setValuesData] = useState([]);
  const [keysData, setKeysData] = useState([]);
  const getCountryData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://corona.lmao.ninja/v2/historical/${route.params.country}`,
    );
    const res = await response.json();
    const data = res.timeline.cases;
    const countryValues = Object.values(data);
    const countryKeys = Object.keys(data);
    await setValuesData(countryValues);
    await setKeysData(countryKeys);
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
      gradientTo: theme.colors.warning,
      gradientToOpacity: 0.4,
    },
    xAxis: {
      visible: true,
      labelFontSize: 12,
      labelColor: theme.colors.textdark,
    },
    dataPoint: {
      visible: true,
      color: '#E8CB32',
      radius: 2,
      label: {visible: true, marginBottom: 25},
    },
    grid: {
      stepSize: 10000,
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
          backgroundColor: theme.colors.bglight,
          justifyContent: 'center',
          paddingTop: 10,
          padding: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 10}}
          onPress={() => navigation.goBack()}>
          <SvgBack size={16} color={theme.colors.textlight} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {i18n.get('numberOfCasesChart')}
        </Text>
      </View>
      {!loading ? (
        <ScrollView horizontal={true}>
          <LineChart
            style={{flex: 1, width: 4000}}
            config={config}
            data={valuesData}
            xLabels={keysData}
            yLabels={'DH'}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
