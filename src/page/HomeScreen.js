import React from 'react';
import {View, Text, Button} from 'react-native';
import SignOut from '../store/Action/SignOut';

export default function HomeScreen() {
  return (
    <View>
      <Text>This is Home</Text>
        <Button title={"SignOut"} onPress={()=>SignOut()}/>
    </View>
  );
}
