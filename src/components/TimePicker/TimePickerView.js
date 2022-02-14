import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '..';
import styles from './TimePickerStyles';
import {Colors} from '../../theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function TimePickerView(props) {
  const {visible, handleOnPress, onClose} = props;

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        onConfirm={(tiem) => handleOnPress(tiem)}
        onCancel={onClose}
        onHide={onClose}
      />
    </View>
  );
}
