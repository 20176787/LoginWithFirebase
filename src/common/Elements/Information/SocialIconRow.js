import React, {useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
export default function SocialIconRow() {
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
    <View style={styles.socialRow}>
      <View style={styles.socialIcon}>
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
      <View style={styles.socialIcon}>
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
      <View style={styles.socialIcon}>
        <Icon
          size={40}
          type="font-awesome"
          color="#000000"
          name="github"
          onPress={() => {
            setGithub('20176787');
            onPressGitHub(github);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
    paddingTop: 10,
  },
});
