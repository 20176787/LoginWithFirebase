import React, {useState, useEffect} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
    Platform,
    TextInput,
    ActivityIndicator, Alert,
} from 'react-native';
import theme from '../../store/utils/theme';
import i18n from '../../store/i18n';
import SvgSearch from '../../common/Components/icons/Search';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect} from '@react-navigation/native';
import CardCountry from '../../common/Elements/Covid19/CardCountry';
export default function SearchScreenCovid19({navigation}) {
  let [countriesData, setCountriesData] = useState([]);
  let [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [isclicked, setIsClicked] = useState(false);
  const getSummaryData = async (sort = 'active') => {
    setLoading(true);
    const response = await fetch(
      `https://corona.lmao.ninja/v2/countries?sort=${sort}`,
    );
    const data = await response.json();

    const responseUpdate = await fetch('https://corona.lmao.ninja/v2/all');
    const dataUpdate = await responseUpdate.json();
    const lastDate = new Date(dataUpdate.updated).toLocaleTimeString();
    setUpdatedDate(lastDate);
    setCountriesData(data);
    setAllData(data);
    setLoading(false);
    setRefreshing(false);
    Snackbar.show({
      text: i18n.get('refreshed'),
      textColor: 'white',
      backgroundColor: theme.colors.success,
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    getSummaryData();
    setIsClicked(false);
    setText('')
    Snackbar.show({
      text: i18n.get('refreshing'),
      textColor: 'white',
      backgroundColor: theme.colors.success,
      duration: Snackbar.LENGTH_SHORT,
    });
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
  const searchFilter = (text) => {
    const newData = allData.filter((item) => {
      const listItem = `${item.country.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase())>-1;
    });
    if(newData.length===0) {
        Alert.alert("Notice!","Khong tim duoc quoc gia nay.")
        onRefresh()
    }
    else
     setCountriesData(newData);
  };
  const renderHeader = () => {
    return (
      <TextInput
          style={{backgroundColor:theme.colors.bglight}}
        onChangeText={(text) => {
          setText(text);
          searchFilter(text);
        }}
        value={text}
        autoCapitalize={'words'}
        placeholder={i18n.get('enterCountry')}
        // ref={(ref) => (this.inputText = ref)}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bglight,
        paddingTop: 26,
        paddingLeft: 26,
        paddingRight: 14,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 12,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {i18n.get('countries')}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await setIsClicked(true);
            // this.inputText.focus();
          }}>
          <SvgSearch color={theme.colors.textlight} width={32} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', paddingTop: 10}}>
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
          <Text style={{fontSize: 11, marginRight: 10, color: '#2C3355'}}>
            {i18n.get('active')}
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
          <Text style={{marginRight: 10, color: '#2C3355', fontSize: 11}}>
            {i18n.get('recovered')}
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
          <Text
            style={{
              marginRight: 10,
              color: '#2C3355',
              fontSize: 11,
              alignItems: 'center',
            }}>
            {i18n.get('death')}
          </Text>
          <View />
        </View>
        <Text
          style={{
            fontSize: 11,
            color: theme.colors.textlight,
            paddingRight: 12,
            alignItems: 'center',
          }}>
          {i18n.get('lastUpdate')}:{updatedDate}
        </Text>
      </View>
      {countriesData.length ? (
        <View style={{paddingTop: 10}}>
          <FlatList
            ListHeaderComponent={isclicked ? renderHeader() : null}
            stickyHeaderIndices={[0]}
            data={countriesData}
            style={{marginTop: 6, paddingRight: 12}}
            renderItem={(item) => (
              <CardCountry
                active={item.item.active}
                country={item.item.country}
                deaths={item.item.deaths}
                recovered={item.item.recovered}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
          <Text>Đang cập nhật...</Text>
        </View>
      )}
    </View>
  );
}
