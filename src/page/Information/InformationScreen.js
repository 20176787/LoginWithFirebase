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
import {Icon} from 'react-native-elements';
const dimensions = Dimensions.get('window');
const coverHeight = Math.round((dimensions.width * 7) / 10);
const coverWidth = dimensions.width;
export default function InformationScreen() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [facebook, setFacebook] = useState('');
  const [github, setGithub] = useState('');
  const onPressPhone = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => console.log(err));
  };
  const onPressEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch((err) => console.log(err));
  };
  const onPressFacebook = (facebook) => {
    Linking.openURL(`fb://profile/${facebook}`).catch((err) =>
      console.log(err),
    );
  };
  const onPressGitHub = (github) => {
    Linking.openURL(`http://github.com/${github}`).catch((err) =>
      console.log(err),
    );
  };
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
          <Text style={styles.name}>Le Ngoc Huy</Text>
          <Text style={styles.nickName}>(Captain Beemo)</Text>
          <Text style={styles.description}>
            "If you can see my story , you are special."
          </Text>

          <View style={styles.socialRow}>
            <View>
              <Icon
                size={40}
                type="entypo"
                color="#3B5A98"
                name="facebook-with-circle"
                onPress={() => {
                  setFacebook('huy1407');
                  onPressFacebook(facebook);
                }}
              />
            </View>
            <View style={styles.socialIcon}>
              <Icon
                size={40}
                name="phone"
                type="font-awesome"
                color="#517fa4"
                onPress={() => {
                  setPhoneNumber('0366717837');
                  onPressPhone(phoneNumber);
                }}
              />
            </View>
            <View>
              <Icon
                size={40}
                type="fontisto"
                color="#DD4C39"
                name="email"
                onPress={() => {
                  setEmail('huy14071999@gmail.com');
                  onPressEmail(email);
                }}
              />
            </View>
            <View>
              <Icon
                size={40}
                type="fontisto"
                color="#DD4C39"
                name="email"
                onPress={() => {
                  setGithub('20176787');
                  onPressGitHub(github);
                }}
              />
            </View>
          </View>
        </View>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#ebeaea',
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
    left: '50%',
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
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
    paddingTop: 10,
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
