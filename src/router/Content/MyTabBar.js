import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SvgSearch from '../../common/Components/icons/Search';
import SvgHome from '../../common/Components/icons/Home';

export default function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
              width: 30,
              height: 50,
            }}>
            {label === 'HomeCovid' && (
              <SvgHome color={isFocused ? '#ff0500' : '#222'} />
            )}
            {label === 'SearchCovid' && (
              <SvgSearch color={isFocused ? '#ff0500' : '#222'} />
            )}
            {/*<Text style={{color: isFocused ? '#ff0500' : '#222'}}>{label}</Text>*/}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
