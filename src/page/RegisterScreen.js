import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('window');
export default function RegisterScreen({route}) {
  const [email, setEmail] = useState('');
  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  useEffect(() => {
    if (email != '' && password != '' && passwordCheck != '') {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [passwordCheck, email, password]);
  const onCreateAccount = () => {
    if (password != passwordCheck) {
      alert('password incorrect');
    } else if (email == '' || password == '' || passwordCheck == '') {
      alert('please insert full information');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            alert('email already in use');
          }
          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            alert('Password should be at least 6 characters');
          }
        });
    }
  };
  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={{
        uri:
          'https://firebasestorage.googleapis.com/v0/b/beemoapp-2619e.appspot.com/o/Beemo%2FLeague-of-Legends-Teemo-beemo-1319969-wallhere.com.jpg?alt=media&token=64027069-e671-4586-9944-c525e7838055',
      }}>
      <KeyboardAvoidingView
        style={{flex: 1, justifyContent: 'center'}}
        behavior="padding">
        <View style={styles.container}>
          <Text style={styles.logo}>Register</Text>
          <View style={styles.inputView}>
            <TextInput
              inlineImageLeft="ic_laucher"
              placeholder="your email...."
              placeholderTextColor={'#abae94'}
              style={styles.inputText}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              placeholder={'your password....'}
              placeholderTextColor={'#abae94'}
              style={styles.inputText}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              placeholder={'your password again....'}
              placeholderTextColor={'#abae94'}
              style={styles.inputText}
              onChangeText={(text) => setPasswordCheck(text)}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.registerButton,
              check && styles.registerButtonComplete,
            ]}
            onPress={onCreateAccount}>
            <Text style={styles.loginText}>Register Now!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImageBackground: {
    width: width,
    height: height * 1.1,
    zIndex: -1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginBottom: 40,
  },
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
    height: 50,
    color: '#4b4412',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  registerButtonComplete: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#abae94',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
