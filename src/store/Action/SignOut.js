import * as React from 'react';
import auth from '@react-native-firebase/auth';
export default function SignOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
