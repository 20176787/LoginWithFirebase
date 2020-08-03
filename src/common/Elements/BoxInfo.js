import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
export default function BoxInfo({title, detail}) {
  return (
    <View style={styles.boxDetail}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textDetail}>{detail}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  boxDetail: {
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 40,
    position: 'relative',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 5,
    width: '100%',
    paddingLeft: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd800',
  },
  textDetail: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
  },
});
