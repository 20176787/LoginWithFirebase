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
import firestore from '@react-native-firebase/firestore';
import addTodo from '../../store/Action/addTodo';
import Todo from './Todo';
const ref = firestore().collection('todos');
export default function TodoScreen() {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
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
      <TextInput
        style={{backgroundColor: '#fff'}}
        placeholder={'insert your activity'}
        value={todo}
        onChangeText={setTodo}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (todo != '') {
            addTodo(todo);
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
