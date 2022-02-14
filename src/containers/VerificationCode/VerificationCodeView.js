import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {Text, SignHeader, Button, PhoneInput} from '../../components';
import styles from './VerificationCodeStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {FORGET_OPTION, strings} from '../../constants';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import util from '../../util';

export default function VerificationCodeView(props) {
  const {
    setValue,
    otpCode,
    handleSubmit,
    otpCodeError,
    editModalVisible,
    verificationAccount,
    verificationAccountError,
    fromSignUp,
    userData,
    isLoading,
    handleResend,
    isUserIdEmail,
    handleEditDone,
    editValueLoader,
    editValueError,
    handleResendVisable,
    isResendVisable,
    timerDuration,
    resetCountdownId,
    fromProfile,
    dataFromProfile,
  } = props;

  // here check user id is email or phone because in number we get object
  const accountValue =
    isUserIdEmail === FORGET_OPTION.EMAIL
      ? verificationAccount
      : `${verificationAccount.country_code}${verificationAccount.number}`;

  let fromProfileValue = '';
  if (fromProfile) {
    fromProfileValue =
      !_.isNil(dataFromProfile.vendor_id) &&
      !_.isNil(dataFromProfile.vendor_id.country_code)
        ? `${dataFromProfile.vendor_id.country_code} ${dataFromProfile.vendor_id.number}`
        : dataFromProfile.vendor_id;
  }

  const handleCountDown = (time) => {
    return (
      <CountDown
        id={resetCountdownId}
        until={time}
        //duration of countdown in seconds

        timeToShow={['S']}
        timeLabels={{s: ''}}
        //formate to show
        onFinish={() => handleResendVisable()}
        //on Finish call
        digitStyle={{}}
        digitTxtStyle={{color: Colors.white}}
        timeLabelStyle={{
          color: Colors.red,
          fontWeight: 'bold',

          fontSize: 12,
        }}
        //on Press call
        size={26}

        //   <CountDown
        //   id={resetCountdownId}
        //   until={props.otpExpireTime}
        //   // until={'2021-01-19T07:57:48.000Z'}
        //   //duration of countdown in seconds
        //   timeToShow={['S']}
        //   //formate to show
        //   onFinish={() => setValue({disableResendOTP: false})}
        //   //on Finish call e
        //   digitStyle={{}}
        //   digitTxtStyle={{color: Colors.white}}
        //   timeLabels={{
        //     // d: 'Days',
        //     // h: 'Hours',
        //     // m: 'Mins',
        //     s: '',
        //   }}
        //   timeLabelStyle={{
        //     color: Colors.red,
        //     fontWeight: 'bold',

        //     fontSize: 12,
        //   }}
        //   //on Press call
        //   size={26}
        // />
      />
    );
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={AppStyles.flex}>
        <SignHeader
          showMask={true}
          title={fromSignUp ? strings.ACCOUNT : strings.PASSWORD}
          subTitle={fromSignUp ? strings.VERIFICATION : strings.RECOVERY}
          mainHeading={strings.ENTER_VERIFICATION_CODE}
        />
        <View style={styles.wrap}>
          <View style={AppStyles.mBottom20}>
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.flex,
                util.isRTL() && AppStyles.rowReverse,
              ]}>
              <Text
                size={Fonts.size.xxSmall}
                color={Colors.black}
                type="medium">
                {strings.VERIFICATION_CODE_SEND_ON}{' '}
              </Text>
              {fromProfile ? (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.text.primary}
                  type="bold">
                  {' '}
                  {fromProfileValue}{' '}
                </Text>
              ) : (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.text.primary}
                  type="bold">
                  {' '}
                  {accountValue}{' '}
                </Text>
              )}
            </View>
            {fromSignUp && (
              <View
                style={[
                  AppStyles.alignItemsFlexEnd,
                  util.isRTL() && {
                    alignItems: 'flex-start',
                    marginLeft: 43,
                  },
                ]}>
                <TouchableOpacity
                  style={styles.size}
                  onPress={() => {
                    setValue({editModalVisible: true});
                  }}>
                  <Text
                    size={Fonts.size.xxSmall}
                    color={Colors.text.accent}
                    type="semiBold">
                    {strings.EDIT}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text
            size={Fonts.size.xSmall}
            textAlign={util.rtlRightText()}
            color={Colors.text.primary}
            type="bold">
            {strings.ENTER_CODE}
          </Text>
          <CodeInput
            ref={(ref) => {
              props.otpRef(ref);
            }}
            className={'border-b'}
            space={9}
            codeLength={4}
            size={58}
            inactiveColor={Colors.text.quaternary}
            activeColor={Colors.text.primary}
            inputPosition="left"
            autoFocus={true}
            cellBorderWidth={1.5}
            codeInputStyle={styles.square}
            containerStyle={[{alignSelf: 'center'}]}
            keyboardType="numeric"
            onFulfill={(data) => setValue({otpCode: data})}
          />
          <View
            style={[
              AppStyles.alignItemsCenter,
              AppStyles.mTop10,
              AppStyles.mBottom10,
            ]}>
            <Text
              type="medium"
              size={Fonts.size.xxSmall}
              textAlign={util.rtlRightText()}
              color={Colors.error.primary}
              style={[AppStyles.mTop5, AppStyles.mBottom5]}>
              {otpCodeError}
            </Text>
          </View>

          {/* <View
            style={{
              alignItems: util.isRTL() ? 'flex-end' : 'flex-start',
              top: 32,
            }}>
            {isResendVisable && handleCountDown(timerDuration)}
          </View> */}
          {!isResendVisable && (
            <View
              style={[styles.resendWrap, util.isRTL() && styles.resendWrapRtl]}>
              <TouchableOpacity
                onPress={handleResend}
                disabled={isResendVisable}>
                <Text
                  type="medium"
                  size={Fonts.size.xxSmall}
                  color={
                    isResendVisable
                      ? Colors.text.quaternary
                      : Colors.text.primary
                  }
                  style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                  {strings.RESEND_OTP}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            top: 20,
            backgroundColor: Colors.background.quaternary,
            borderRadius: 200,
          }}>
          {isResendVisable && handleCountDown(timerDuration)}
        </View>
        <View style={[styles.loginBtnWrap]}>
          <LinearGradient
            start={{x: 0.3, y: 2}}
            end={{x: 1, y: 0}}
            colors={Colors.gradient.primary}
            style={styles.gradBtn}>
            <Button
              color={Colors.button.hexa}
              background={Colors.transparent}
              style={styles.loginBtn}
              size={Fonts.size.normal}
              onPress={handleSubmit}
              isLoading={isLoading}
              indicatorColor={Colors.button.hexa}
              disabled={isLoading}
              type="semiBold">
              {strings.CONTINUE}
            </Button>
          </LinearGradient>
          <RnImage source={Images.Mask1} style={styles.mask2} />
        </View>
      </View>

      {/* edit Modal start */}
      {editModalVisible && (
        <Modal
          isVisible={editModalVisible}
          style={{
            alignItems: 'center',
            margin: 20,
          }}
          onBackButtonPress={() => {
            setValue({editModalVisible: false});
          }}
          onBackdropPress={() => {
            setValue({editModalVisible: false});
          }}
          backdropOpacity={0.8}
          backdropColor={Colors.black}>
          <View style={styles.modalWrap}>
            <PhoneInput
              onNumberChange={(val, ref) => {
                setValue({editValue: val});
              }}
              error={editValueError}
            />
            <View style={[styles.optionWrap]}>
              <TouchableOpacity
                style={AppStyles.mRight15}
                onPress={() => {
                  setValue({editModalVisible: false});
                }}>
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.text.accent}
                  type="bold">
                  {strings.CANCEL}
                </Text>
              </TouchableOpacity>
              <View>
                {editValueLoader && <ActivityIndicator />}
                {!editValueLoader && (
                  <TouchableOpacity onPress={handleEditDone}>
                    <Text
                      size={Fonts.size.xxSmall}
                      color={Colors.text.accent}
                      type="bold">
                      {strings.DONE}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}
      {/* edit Modal end*/}
    </KeyboardAwareScrollView>
  );
}
