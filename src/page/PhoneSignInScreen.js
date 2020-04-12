import * as React from 'react';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const {width, height} = Dimensions.get('window');
export default function PhoneSignInScreen() {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [check, setCheck] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  useEffect(() => {
    if (phoneNumber != '')
      setCheck(true)
      else setCheck(false)

  }, [phoneNumber]);
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }
    catch (error) {
      if(error.code=="auth/invalid-phone-number")
        alert('invalid code.');
    }

  }
  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('invalid code.');
      alert('invalid code.');
    }
  }
  if (!confirm) {
    return (
        <ImageBackground
            style={styles.ImageBackground}
            source={{
              uri:
                  'https://firebasestorage.googleapis.com/v0/b/beemoapp-2619e.appspot.com/o/Beemo%2FLeague-of-Legends-Teemo-beemo-1319969-wallhere.com.jpg?alt=media&token=64027069-e671-4586-9944-c525e7838055',
            }}>
          <View style={styles.container}>
            <Text style={styles.logo}>BeemoApp</Text>
            <Text style={styles.inputText}>insert your phone number</Text>
            <View style={styles.inputView}>
              <TextInput
                  value={phoneNumber}
                  style={styles.inputText}
                  onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
            <TouchableOpacity
                style={[
                  styles.registerButton,
                  check && styles.registerButtonComplete,
                ]}
                onPress={() => signInWithPhoneNumber(phoneNumber)}>
              <Text style={styles.loginText}>Confirm Now!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
    );
  }
  return (
    <ImageBackground
      style={styles.ImageBackground}
      source={{
        uri:
          'https://firebasestorage.googleapis.com/v0/b/beemoapp-2619e.appspot.com/o/Beemo%2FLeague-of-Legends-Teemo-beemo-1319969-wallhere.com.jpg?alt=media&token=64027069-e671-4586-9944-c525e7838055',
      }}>
      <View style={styles.container}>
        <Text style={styles.logo}>BeemoApp</Text>
        <Text style={styles.inputText}>insert your code</Text>
        <CodeField
            value={code}
            onChangeText={setCode}
            cellCount={6}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
            )}
        />
        <TouchableOpacity
          style={[
            styles.registerButton,
            check && styles.registerButtonComplete,
          ]}
          onPress={confirmCode}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  root: {padding: 20, minHeight: 400},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
