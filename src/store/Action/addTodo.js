import React from 'react';
import firestore from '@react-native-firebase/firestore';
const ref = firestore().collection('todos');
export default async function addTodo(todo) {

    await ref.add({
      title: todo,
      complete: false,
    });
}
