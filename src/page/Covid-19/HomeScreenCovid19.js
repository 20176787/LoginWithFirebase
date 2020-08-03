import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  StatusBar,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import SvgDots from '../../common/Components/icons/Dots';
import i18n from '../../store/i18n';
import Pie from 'react-native-pie';
import theme from '../../store/utils/theme';
import CardSayi from '../../common/Elements/Covid19/CardSayi';
import SvgCase from '../../common/Components/icons/Case';
import SvgDeath from '../../common/Components/icons/Death';
import SvgRecovered from '../../common/Components/icons/Recovered';
import SvgSick from '../../common/Components/icons/Sick';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
export default function HomeScreenCovid19() {
  const [summaryData, setSummaryData] = useState({});
  const [deathsPercentage, setDeathsPercentage] = useState(0);
  const [activePercentage, setActivePercentage] = useState(0);
  const [recoveredPercentage, setRecoveredPercentage] = useState(0);
  const [updated, setUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalHakkinda, setModalHakkinda] = useState(false);
  const getSummaryData = async () => {
    const response = await fetch('https://corona.lmao.ninja/v2/all');
    const data = await response.json();
    const deathP = Math.round((data.deaths / data.cases) * 100);
    const recoP = Math.round((data.recovered / data.cases) * 100);
    const activP = 100 - deathP - recoP;
    const updatedDate = new Date(data.updated).toLocaleString();

    setSummaryData(data);
    setActivePercentage(activP);
    setDeathsPercentage(deathP);
    setRecoveredPercentage(recoP);
    setUpdated(updatedDate);
  };

  useEffect(() => {
    getSummaryData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.bglight);
    }, []),
  );
  const onRefresh = () => {
    setRefreshing(true);
    getSummaryData();
    setRefreshing(false);
    Snackbar.show({
      text: i18n.get('refreshed'),
      textColor: 'white',
      backgroundColor: theme.colors.success,
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  return (
    <View style={{backgroundColor: '#F2F3F8', flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F2F3F8',
          paddingLeft: 26,
          paddingRight: 14,
          paddingTop: 26,
          marginBottom: 8,
        }}>
        <ScrollView
          style={{paddingRight: 12}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 23, fontWeight: 'bold'}}>
              {i18n.get('worldwide')}
            </Text>
            <TouchableOpacity onPress={() => setModalHakkinda(true)}>
              <SvgDots width={24} color={'black'} />
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              isVisible={modalHakkinda}
              justifyContent="center"
              onBackdropPress={() => setModalHakkinda(false)}
              onRequestClose={() => {
                console.log('close modal');
              }}
              backdropOpacity={0.8}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                <Text style={{color: '#ff9f00', fontSize: 20}}>
                  From Beemo With Love
                </Text>
                <TouchableOpacity
                  onPress={() => setModalHakkinda(false)}
                  style={{
                    backgroundColor: 'lightblue',
                    padding: 12,
                    margin: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }}>
                  <Text> Quit </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          {activePercentage ? (
            <View
              style={{
                backgroundColor: 'white',
                marginBottom: 26,
                borderRadius: 12,
                flexDirection: 'row',
                paddingHorizontal: 26,
                paddingVertical: 24,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 18,
                      fontWeight: 'bold',
                      flex: 1,
                    }}>
                    Covid-19
                  </Text>
                  <Pie
                    radius={70}
                    innerRadius={0}
                    sections={[
                      {
                        percentage: recoveredPercentage,
                        color: theme.colors.success,
                      },
                      {
                        percentage: activePercentage,
                        color: theme.colors.warning,
                      },
                      {
                        percentage: deathsPercentage,
                        color: theme.colors.danger,
                      },
                    ]}
                    dividerSize={2}
                    strokeCap={'butt'}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <View style={{marginLeft: 30}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 10,
                          backgroundColor: '#FFE560',
                          height: 10,
                          borderRadius: 999,
                          marginRight: 8,
                        }}
                      />
                      <Text style={{marginRight: 10, color: '#2C3355'}}>
                        {i18n.get('active')}
                      </Text>
                      <Text style={{color: '#2C3355'}}>
                        {activePercentage}%
                      </Text>
                      <View />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 10,
                          backgroundColor: '#51D4B5',
                          height: 10,
                          borderRadius: 999,
                          marginRight: 8,
                        }}
                      />
                      <Text style={{marginRight: 10, color: '#2C3355'}}>
                        {i18n.get('recovered')}
                      </Text>
                      <Text style={{color: '#2C3355'}}>
                        {recoveredPercentage}%
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 10,
                          backgroundColor: '#FF6060',
                          height: 10,
                          borderRadius: 999,
                          marginRight: 8,
                        }}
                      />
                      <Text style={{marginRight: 10, color: '#2C3355'}}>
                        {i18n.get('death')}
                      </Text>
                      <Text style={{color: '#2C3355'}}>
                        {deathsPercentage}%
                      </Text>
                      <View />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Placeholder paddingLeft={20} paddingRight={20} Animation={Fade}>
              <PlaceholderLine width={60} />
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
          )}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View style={{width: '48%'}}>
              <CardSayi
                icon={<SvgCase width={48} height={48} />}
                number={summaryData.cases}
                subtitle={i18n.get('totalCase')}
                placeHolder={activePercentage}
              />
            </View>
            <View style={{width: '48%'}}>
              <CardSayi
                icon={<SvgDeath width={48} height={48} />}
                number={summaryData.deaths}
                subtitle={i18n.get('death')}
                placeHolder={activePercentage}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View style={{width: '48%'}}>
              <CardSayi
                icon={<SvgRecovered width={48} height={48} />}
                number={summaryData.recovered}
                subtitle={i18n.get('recovered')}
                placeHolder={activePercentage}
              />
            </View>
            <View style={{width: '48%'}}>
              <CardSayi
                icon={<SvgSick width={48} height={48} />}
                number={
                  summaryData.cases - summaryData.recovered - summaryData.deaths
                }
                subtitle={i18n.get('activeSick')}
                placeHolder={activePercentage}
              />
            </View>
          </View>
          <Text
            style={{fontSize: 12, alignSelf: 'flex-start', color: '#ABB1D0'}}>
            {i18n.get('lastUpdate')}:{updated}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
