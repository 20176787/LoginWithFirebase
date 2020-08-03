import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import addTodo from '../../store/Action/addTodo';
import Todo from './Todo';
import TimePickerElement from '../../common/Elements/TimePickerElement';

export default function TodoScreen() {
  const ref = firestore()
      .collection('todos')
      .orderBy('createAt', 'desc')
      .where('authID', '==', auth().currentUser.uid);

  const [todo, setTodo] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {title, complete, createAt, deadLine} = doc.data();
        list.push({

          id: doc.id,
          title,
          complete,
          createAt,
          deadLine,
        });
      });
      setTodos(list);
      if (loading) {
        setTodo('');
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return null;
  }

  return (
    <View>
      <Text style={styles.logo}>List Activity</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          inlineImageLeft="search_icon"
          style={{backgroundColor: '#fff', width: 310}}
          placeholder={'insert your activity'}
          value={todo}
          onChangeText={setTodo}
        />
        <TimePickerElement time={time} setTime={setTime} />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (todo != '' && time != '') {
            addTodo(todo, time);
          }
        }}>
        <Text style={styles.inputText}>Add Activity</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 12, paddingBottom: 10, paddingLeft: 10}}>
        *Long press to delete activity.
      </Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={(item) => Todo(item)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputView: {
    width: '80%',
    backgroundColor: '#feffcb',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    fontSize: 20,
    color: '#fff',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#fb5b5a',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ff5600',
    marginBottom: 20,
    marginLeft: 60,
  },
});
