import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import GoToButton from '../store/Action/GoToButton';
const {width, height} = Dimensions.get('window');
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('test');
  const [password, setPassword] = useState('test');
  const onSignInAccount = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch((error) => {
        console.log(error);
        if (error.code == 'auth/invalid-email') {
          alert('The email address is badly formatted.');
        } else if (error.code == 'auth/user-not-found') {
          alert('This email is not register!');
        } else if (error.code == 'auth/wrong-password') {
          alert('The password is invalid');
        }
      });
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
          <Text style={styles.logo}>Beemo App</Text>
          <View style={styles.inputView}>
            <TextInput
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
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onSignInAccount}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.loginWithPhoneNumberButton}
              onPress={() => navigation.navigate('PhoneSignIn')}>
            <Text style={styles.loginText}>Login With PhoneNumber</Text>
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
  loginButton: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
  loginWithPhoneNumberButton: {
    width: '80%',
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
