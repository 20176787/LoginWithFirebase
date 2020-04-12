import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
export default function GoToButton({screenName}) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName, {userName: 'Lucy'})}
    />
  );
}
