import React from 'react';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
const ref = firestore().collection('todos');
export default async function addTodo(todo, time) {
  await ref.add({
    title: todo,
    complete: false,
    createAt: moment().utcOffset('+07:00').format(' HH:mm  DD/MM/YYYY'),
    deadLine: time,
    authID: auth().currentUser.uid,
  });
}
