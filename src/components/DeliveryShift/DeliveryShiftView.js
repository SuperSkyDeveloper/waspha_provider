import React, {useState} from 'react';
import {
  View,
  Image as RnImage,
  Picker,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import {Text, TextInput} from '..';
import styles from './DeliveryShiftStyles';
import {Colors, Images, Fonts, Metrics, AppStyles} from '../../theme';
import TimePicker from '../../components/TimePicker';
import BottomSheet from 'react-native-bottomsheet';
import {ISOToFormat} from '../../helpers/generalHelper';
import {strings, TIME_FORMAT} from '../../constants';
import style from '../PhoneInput/style';
import util from '../../util';

export default function DeliveryShiftView(props) {
  const {
    handleSelectDay,
    schedule,
    handleAddNewShift,
    handleTimeModal,
    handleDeleteShift,
  } = props;

  return (
    <View style={AppStyles.mTop30}>
      {/* new schedule */}

      {schedule.map((item, dayIndex) => {
        let checkBox = item.status
          ? Images.TickCheckBox
          : Images.UnTickCheckBox;

        return (
          <View
            style={[
              styles.row,
              util.isRTL() && AppStyles.rowReverse,
              AppStyles.mTop10,
            ]}>
            <View
              style={[AppStyles.flexRow, util.isRTL() && AppStyles.rowReverse]}>
              {/* check box */}
              <TouchableOpacity
                onPress={() => {
                  handleSelectDay(dayIndex);
                }}>
                <RnImage
                  style={[styles.checkImg, util.isRTL() && AppStyles.mLeft10]}
                  source={checkBox}
                />
              </TouchableOpacity>
              {/* heading */}
              <Text
                type="medium"
                size={Fonts.size.small}
                style={AppStyles.mLeft15}>
                {item.day}
              </Text>
            </View>
            {/* add shift */}
            <View style={{marginLeft: 'auto'}}>
              {item.shift.map((time, shiftIndex) => {
                return (
                  <View style={styles.shiftWrap}>
                    <TouchableOpacity
                      disabled={!item.status}
                      style={styles.alignCenter}
                      onPress={() => {
                        handleDeleteShift(dayIndex, shiftIndex);
                      }}>
                      <Text color={Colors.error.primary}>x</Text>
                    </TouchableOpacity>

                    <View
                      style={[
                        styles.width75,
                        util.isRTL() && AppStyles.mRight10,
                      ]}>
                      <TextInput
                        onPress={() => {
                          item.status &&
                            handleTimeModal(dayIndex, shiftIndex, 'from');
                        }}
                        labelStyle={styles.lableStyle}
                        label={strings.FROM}
                        editable={item.status}
                        value={ISOToFormat(time.from, TIME_FORMAT)}
                        inputStyle={[
                          styles.shiftInput,
                          AppStyles.mRight10,
                          !item.status && styles.opacity,
                        ]}
                      />
                    </View>
                    <View style={styles.width75}>
                      <TextInput
                        onPress={() => {
                          item.status &&
                            handleTimeModal(dayIndex, shiftIndex, 'to');
                        }}
                        label={strings.TO}
                        editable={item.status}
                        value={ISOToFormat(time.to, TIME_FORMAT)}
                        labelStyle={styles.lableStyle}
                        inputStyle={[
                          styles.shiftInput,
                          !item.status && styles.opacity,
                        ]}
                      />
                    </View>
                  </View>
                );
              })}

              <TouchableOpacity
                disabled={!item.status}
                onPress={() => {
                  handleAddNewShift(dayIndex);
                }}>
                <Text
                  type="semiBold"
                  style={[styles.addShiftText, !item.status && styles.opacity]}>
                  {strings.ADD_SHIFT}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {/* new schedule */}
    </View>
  );
}
