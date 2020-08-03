import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Linking,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SocialIconRow from '../../common/Elements/Information/SocialIconRow';
import InformationDetail from '../../common/Elements/Information/InformationDetail';
const dimensions = Dimensions.get('window');
const coverHeight = Math.round((dimensions.width * 7) / 10);
const coverWidth = dimensions.width;
export default function InformationScreen() {
  const ref = firestore()
    .collection('info')
    .where('authID', '==', auth().currentUser.uid);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const {authID, information, nomalInfo} = doc.data();
        setInfo({authID, information, nomalInfo});
      });
    });
  }, []);
  if (info == null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box1}>
          <TouchableOpacity>
            <Image
              style={{
                height: coverHeight,
                width: coverWidth,
                resizeMode: 'cover',
              }}
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/beemoapp-2619e.appspot.com/o/Beemo%2FLeague-of-Legends-Teemo-beemo-1319969-wallhere.com.jpg?alt=media&token=64027069-e671-4586-9944-c525e7838055',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.boxEvent}>
          <TouchableOpacity style={styles.avatar}>
            <Image
              style={styles.imageAvatar}
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/beemoapp-2619e.appspot.com/o/Beemo%2FLeague-of-Legends-Teemo-beemo-1319969-wallhere.com.jpg?alt=media&token=64027069-e671-4586-9944-c525e7838055',
              }}
            />
          </TouchableOpacity>
          <View style={{paddingTop: 50}}>
            <Text style={styles.name}>{info.nomalInfo.name}</Text>
            <Text style={styles.nickName}>({info.nomalInfo.nickName})</Text>
            <Text style={styles.description}>
              "{info.nomalInfo.description}"
            </Text>
          </View>
          <SocialIconRow />
        </View>
        <InformationDetail info={info} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  imageAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ebeaea',
    overflow: 'hidden',
  },
  box1: {
    flexDirection: 'column',
    position: 'relative',
  },
  boxEvent: {
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 50,
    paddingBottom: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
    width: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    left: '37%',
    marginLeft: -50,
    marginTop: -55,
  },
  name: {
    textAlign: 'center',
    color: '#ffd800',
    fontSize: 20,
  },
  nickName: {
    textAlign: 'center',
    color: 'rgba(171,174,148,0.42)',
    fontSize: 20,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
});
