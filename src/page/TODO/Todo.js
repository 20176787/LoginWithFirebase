import React from 'react';
import {View, Text, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons';
import {ListItem} from 'react-native-elements';
import moment from 'moment';
export default function Todo(item) {
  const checkComplete = () => {
    if (item.item.complete == false) {
      Alert.alert('Notice!', 'Are you sure you completed this activity?', [
        {text: 'no', onPress: () => console.log('ok')},
        {text: 'yes', onPress: () => toggleComplete()},
      ]);
    }
  };
  async function toggleComplete() {
    await firestore().collection('todos').doc(item.item.id).update({
      complete: !item.item.complete,
    });
  }
  const checkDeleteData = () => {
    Alert.alert('Notice!', 'Do you want to cancel this activity?', [
      {text: 'no', onPress: () => console.log('ok')},
      {text: 'yes', onPress: () => deleteData()},
    ]);
  };
  async function deleteData() {
    await firestore().collection('todos').doc(item.item.id).delete();
  }
  return (
    <ListItem
      style={{paddingBottom: 2}}
      title={item.item.title}
      subtitle={`DeadLine at:${item.item.deadLine}`}
      subtitleStyle={
        moment(item.item.deadLine, 'HH:mm DD/MM/YYYY') <
        moment().utcOffset('+07:00')
          ? {color: 'red'}
          : {color: 'green'}
      }
      onPress={() => checkComplete()}
      leftIcon={{name: item.item.complete ? 'check' : 'cancel'}}
      RightIcon={{name: 'cancel'}}
      onLongPress={() => checkDeleteData()}
    />
  );
}
