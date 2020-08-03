import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
export default function CardCountry({
  country,
  active,
  deaths,
  recovered,
  navigation,
}) {
  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: '#fff',
        marginTop: 12,
        paddingHorizontal: 20,
        height: 70,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CountryDetail', {country})}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{country}</Text>
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
          <Text style={{fontSize: 13, marginRight: 10, color: '#2C3355'}}>
            {active}
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
          <Text style={{marginRight: 10, color: '#2C3355', fontSize: 13}}>
            {recovered}
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
              fontSize: 13,
            }}>
            {deaths}
          </Text>
          <View />
        </View>
      </TouchableOpacity>
    </View>
  );
}
