import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import SvgBack from '../../common/Components/icons/Back';
import theme from '../../store/utils/theme';
import i18n from '../../store/i18n';
import AvatarImage from 'react-native-paper/src/components/Avatar/AvatarImage';
import SvgCase from '../../common/Components/icons/Case';
import SvgRecovered from '../../common/Components/icons/Recovered';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index';
import SvgDeath from '../../common/Components/icons/Death';
import SvgSick from '../../common/Components/icons/Sick';
import SvgChart from '../../common/Components/icons/Chart';
export default function CountryDetail({route, navigation}) {
  const [countryDetailData, setCountryDetailData] = useState([]);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const getCountryDetailData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://corona.lmao.ninja/v2/countries/${route.params.country}`,
    );
    const data = await response.json();
    setCountryDetailData(data);
    setLoading(false);
    setCountry(route.params.country.toString());
  };
  useEffect(() => {
    getCountryDetailData();
  }, []);
  return (
    <View style={{flex: 1}}>
      {!loading ? (
        <ScrollView style={{flex: 1, padding: 25}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{position: 'absolute', left: 10}}
              onPress={() => navigation.goBack()}>
              <SvgBack color={theme.colors.textlight} />
            </TouchableOpacity>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              {' '}
              {route.params.country}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: 'white',
                padding: 26,
                marginTop: 25,
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 34,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {i18n.get('allInfo')}
                </Text>
                <View style={{size: 32}}>
                  <Image
                    style={{width: 40, height: 40, borderRadius: 999}}
                    source={{
                      uri: countryDetailData.countryInfo.flag,
                    }}
                  />
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <SvgCase width={30} height={30} />
                    <View style={{flexDirection: 'column', marginLeft: 13}}>
                      <Text style={{fontSize: 14}}>Nhiem Benh</Text>
                      <Text style={{fontSize: 20, marginTop: 7}}>
                        {countryDetailData.cases}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 32,
                    }}>
                    <SvgDeath width={30} height={30} />
                    <View style={{flexDirection: 'column', marginLeft: 13}}>
                      <Text style={{fontSize: 14}}>Tu Vong</Text>
                      <Text style={{fontSize: 20, marginTop: 7}}>
                        {countryDetailData.deaths}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <SvgRecovered width={30} height={30} />
                    <View style={{flexDirection: 'column', paddingLeft: 13}}>
                      <Text style={{fontSize: 14}}>Binh Phuc</Text>
                      <Text style={{fontSize: 20, marginTop: 7}}>
                        {countryDetailData.recovered}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <SvgSick width={30} height={30} />
                    <View style={{flexDirection: 'column', paddingLeft: 13}}>
                      <Text style={{fontSize: 14}}>Dieu Tri</Text>
                      <Text style={{fontSize: 20, marginTop: 7}}>
                        {countryDetailData.active}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 32,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 12}}> {i18n.get('todayCases')}</Text>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', paddingTop: 8}}>
                    {countryDetailData.todayCases}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 12}}>{i18n.get('todayDeaths')}</Text>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', paddingTop: 8}}>
                    {countryDetailData.todayDeaths}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 12}}> {i18n.get('deathRatio')}</Text>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', paddingTop: 8}}>
                    {(
                      (countryDetailData.recovered / countryDetailData.cases) *
                      100
                    ).toFixed(1)}{' '}
                    %
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: 'white',
                padding: 26,
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChartCases', {country})}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: -10,
                    marginRight: -20,
                  }}>
                  <SvgChart width={30} height={30} />
                  <Text style={{fontSize: 16}}>
                    {i18n.get('numberOfCasesChart')}
                  </Text>
                  <SvgBack
                    style={{transform: [{rotateY: '180deg'}]}}
                    width={30}
                    height={30}
                    color={'black'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChartDeaths', {country})}>
              <View
                style={{
                  borderRadius: 12,
                  backgroundColor: 'white',
                  padding: 26,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: -10,
                    marginRight: -20,
                  }}>
                  <SvgChart width={30} height={30} />
                  <Text style={{fontSize: 16}}>
                    {i18n.get('numberOfDeathChart')}
                  </Text>
                  <SvgBack
                    style={{transform: [{rotateY: '180deg'}]}}
                    width={30}
                    height={30}
                    color={'black'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
          <Text>Vui lòng đợi...</Text>
        </View>
      )}
    </View>
  );
}
