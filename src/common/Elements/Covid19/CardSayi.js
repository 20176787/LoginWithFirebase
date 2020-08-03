import React from 'react';
import {Text, View} from 'react-native';
import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';

export default function CardSayi({icon, number, subtitle, placeHolder}) {
  return (
    <View
      style={{
        height: 180,
        borderRadius: 12,
        backgroundColor: 'white',
        marginBottom: 26,
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      {placeHolder ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>{icon}</View>
          <Text style={{fontSize: 24, color: '#2C3355', fontWeight: 'bold'}}>
            {number}
          </Text>
        </View>
      ) : (
        <Placeholder paddingLeft={20} paddingRight={20} Animation={Fade}>
          <PlaceholderLine width={60} />
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      )}
      <Text style={{fontSize: 16, color: '#ABB1D0'}}>{subtitle}</Text>
    </View>
  );
}
