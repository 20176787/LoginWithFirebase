import React from 'react';
import BoxInfo from '../BoxInfo';
import {View} from 'react-native';
export default function InformationDetail({info}) {
  return (
    <View>
      <BoxInfo
        title={info.information.dateOfBirth.title}
        detail={info.information.dateOfBirth.detail}
      />
      <BoxInfo
        title={info.information.address.title}
        detail={info.information.address.detail}
      />
      <BoxInfo
        title={info.information.hobbies.title}
        detail={info.information.hobbies.detail}
      />
      <BoxInfo
        title={info.information.nickname.title}
        detail={info.information.nickname.detail}
      />
    </View>
  );
}
