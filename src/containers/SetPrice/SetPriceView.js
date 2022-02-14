import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  SetItemPrice,
  TextInput,
  Button,
  Calendar,
} from '../../components';
import styles from './SetPriceStyles';
import {Colors, AppStyles, Metrics, Images, Fonts} from '../../theme';
import {strings, DATE_TIME_FORMAT, WASPA_EXPRESS_ID} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function SetPriceView(props) {
  const {
    setValue,
    isDateTimePicker,
    handleSetPropsalBtn,
    activeModeId,
    // new
    createProposalData,
    handleProposalCreation,
    onChange,
    isPickup,
    isChangeMode,
    showDeliveryAndETA,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.SET_PRICE}
        titleColor={Colors.text.secondary}
        color={Colors.text.primary}
        hasBottomRadius={true}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        scrollEnabled
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentSec}>
          <FlatList
            data={createProposalData.items}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <SetItemPrice
                  data={item}
                  onChangeField={onChange}
                  index={index}
                  isChangeMode={isChangeMode}
                />
              );
            }}
          />

          {/* check if waspha express then vendor not write deivery and eta */}
          <View style={styles.textParent}>
            {!isPickup &&
              activeModeId !== WASPA_EXPRESS_ID &&
              showDeliveryAndETA && (
                <View
                  style={[
                    styles.inputWrap,
                    {marginRight: Metrics.tripleBaseMargin},
                  ]}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholderTextColor={Colors.text.quaternary}
                    label={strings.DELIVERY_FEE}
                    labelStyle={[
                      styles.labelStyle,
                      util.isRTL() && AppStyles.alignRight,
                    ]}
                    style={[
                      styles.textInput,
                      AppStyles.pRight10,
                      AppStyles.pLeft10,
                    ]}
                    value={createProposalData.deliveryFee}
                    onChangeText={(val) => {
                      handleProposalCreation({deliveryFee: val});
                    }}
                  />
                  {!_.isEmpty(createProposalData.deliveryFeeError) && (
                    <Text
                      type="medium"
                      size={Fonts.size.xxxxSmall}
                      color={Colors.error.primary}
                      textAlign={util.rtlRightText()}
                      style={[AppStyles.mTop5, AppStyles.mLeft10]}>
                      {createProposalData.deliveryFeeError}
                    </Text>
                  )}
                </View>
              )}
            {!isPickup &&
              activeModeId !== WASPA_EXPRESS_ID &&
              showDeliveryAndETA && (
                <View style={styles.inputWrap}>
                  <Text
                    style={[
                      styles.labelStyle,
                      util.isRTL() && AppStyles.alignRight,
                    ]}>
                    {strings.ETA}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setValue({isDateTimePicker: true})}
                    style={util.isRTL() && {alignItems: 'flex-end'}}>
                    <RnImage
                      source={Images.TimeIcon}
                      style={[
                        styles.timeIconStyle,
                        util.isRTL() && !util.isPlatformAndroid() && {left: 42},
                      ]}
                    />
                    <View style={styles.textStyle}>
                      <Text
                        type="semiBold"
                        size={Fonts.size.xxxSmall}
                        style={styles.dateTextWrap}>
                        {ISOToFormat(createProposalData.eta, DATE_TIME_FORMAT)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {!_.isEmpty(createProposalData.etaError) && (
                    <Text
                      type="medium"
                      size={Fonts.size.xxxxSmall}
                      color={Colors.error.primary}
                      textAlign={util.rtlRightText()}
                      style={[AppStyles.mTop5, AppStyles.mLeft10]}>
                      {createProposalData.etaError}
                    </Text>
                  )}
                </View>
              )}
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnWrap}
            onPress={handleSetPropsalBtn}>
            <Text
              color={Colors.text.secondary}
              textAlign="center"
              type="semiBold"
              style={styles.btn1Style}>
              {strings.SET_PROPOSAL}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {isDateTimePicker && (
        <Calendar
          isDateTimePicker={isDateTimePicker}
          getValue={handleProposalCreation}
          setValue={setValue}
        />
      )}
    </View>
  );
}
