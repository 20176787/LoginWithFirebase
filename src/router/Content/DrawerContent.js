import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignOut from '../../store/Action/SignOut';
export default function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1}}>
          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/beemoapp-2619e.appspot.com/o/Beemo%2FLeague-of-Legends-Teemo-beemo-1319969-wallhere.com.jpg?alt=media&token=64027069-e671-4586-9944-c525e7838055',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Captain Beemo</Title>
                <Caption style={styles.caption}>@Huy1407</Caption>
              </View>
            </View>
            <View>
              <View>
                <Paragraph style={styles.paragraph}>80</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View>
                <Paragraph style={styles.paragraph}>100</Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={{marginTop: 15}}>
          <DrawerItem
              icon={({color, size}) => (
                  <Icon name={'bookmark-outline'} color={color} size={size} />
              )}
              label={'Information'}
              onPress={() => {
                props.navigation.navigate('Information');
              }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'home-outline'} color={color} size={size} />
            )}
            label={'Activity'}
            onPress={() => {
              props.navigation.navigate('Activation');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'account-outline'} color={color} size={size} />
            )}
            label={'Education'}
            onPress={() => {
              props.navigation.navigate('Education');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'settings-outline'} color={color} size={size} />
            )}
            label={'Quotes'}
            onPress={() => {
              props.navigation.navigate('Quotes');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'account-check-outline'} color={color} size={size} />
            )}
            label={'Todo'}
            onPress={() => {
              props.navigation.navigate('Activity');
            }}
          />
        </Drawer.Section>
        <Drawer.Section title={'Preferences'}>
          <TouchableRipple onPress={() => toggleTheme()}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents={'none'}>
                <Switch value={isDarkTheme} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            SignOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
