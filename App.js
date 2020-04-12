import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import LoginAndRegisterContainer from './src/router/LoginAndRegisterContainer';
import {NavigationContainer} from '@react-navigation/native';
import RootContainer from './src/router/RootContainer';
function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) {
    return null;
  }
  if (!user) {
    return (
      <NavigationContainer >
        <LoginAndRegisterContainer />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer >
      <RootContainer />
    </NavigationContainer>
  );
}
export default App;
