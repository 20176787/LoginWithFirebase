import React from 'react';
import {View, Text, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons';
import {ListItem} from 'react-native-elements';
export default function Todo(item) {
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
            style={{paddingBottom:2}}
            title={item.item.title}
            onPress={() => toggleComplete()}
            leftIcon={{name: item.item.complete ? 'check' : 'cancel'}}
            RightIcon={{name: 'cancel'}}
            onLongPress={() => checkDeleteData()}
        />
    );
}
