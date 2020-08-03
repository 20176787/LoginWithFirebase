import React, {useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
export default function TimePickerElement({time, setTime}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setTime(moment(date).format(' HH:mm DD/MM/YYYY'));
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#007c67',
          width: 100,
          height: 50,
          justifyContent: 'center',
          paddingLeft: 10,
        }}
        onPress={showDatePicker}>
        <Text style={{fontSize: 16, color: '#fff'}}>DeadLine</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
