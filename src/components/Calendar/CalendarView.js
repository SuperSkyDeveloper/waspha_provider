import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './CalendarStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {strings} from '../../constants';

export default function CalendarView(props) {
  const {handleConfirm, hideDatePicker, isDateTimePicker} = props;

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        minimumDate={new Date()}
        isVisible={isDateTimePicker}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
