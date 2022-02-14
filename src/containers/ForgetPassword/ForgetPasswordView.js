import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  SignHeader,
  Button,
  TextInput,
  ContactInput,
  PhoneInput,
} from '../../components';
import styles from './ForgetPasswordStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {strings, FORGET_OPTION} from '../../constants';
import util from '../../util';

export default function ForgetPasswordView(props) {
  const {
    setValue,
    phone,
    email,
    emailError,
    phoneError,
    handleSubmit,
    selectForgetOpt,
    isLoading,
  } = props;

  let isEmailActive,
    isPhoneActive = '';

  // if user select email option
  if (selectForgetOpt === FORGET_OPTION.EMAIL) {
    isEmailActive = Images.ActiveRadioBtn;
  } else {
    isEmailActive = Images.RadioBtn;
  }

  // if user select phone option
  if (selectForgetOpt === FORGET_OPTION.PH0NE) {
    isPhoneActive = Images.ActiveRadioBtn;
  } else {
    isPhoneActive = Images.RadioBtn;
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={AppStyles.flex}>
        <SignHeader
          showMask={true}
          title={strings.PASSWORD}
          subTitle={strings.RECOVERY}
          mainHeading={strings.FORGOT_YOUR_PASSWORD}
        />
        <View style={styles.recoverPassViewStyle}>
          <Text textAlign={'center'} style={styles.recoverPassTextStyle}>
            {strings.RECOVER_PASSWORD_USING_EMAIL}
          </Text>
        </View>
        <View style={styles.wraper}>
          <View
            style={[AppStyles.mTop60, util.isRTL() && AppStyles.rowReverse]}>
            <TouchableOpacity
              style={styles.radioBtn}
              onPress={() => {
                setValue({selectForgetOpt: FORGET_OPTION.EMAIL});
              }}>
              <RnImage style={styles.radioBtnStyle} source={isEmailActive} />
            </TouchableOpacity>
            <TextInput
              textAlign={util.isRTL() ? 'right' : 'left'}
              placeholder={`${strings.MUSLIM_NAME_EMAIL}gmail.com`}
              placeholderTextColor={Colors.text.quaternary}
              inputStyle={AppStyles.inputStyle}
              labelStyle={[
                AppStyles.labelStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              autoCapitalize="none"
              keyboardType={'email-address'}
              label={strings.EMAIL.toUpperCase()}
              labelImg=""
              value={email}
              error={emailError}
              onChangeText={(val) => {
                setValue({email: val});
              }}
              ref={(ref) => {
                props.emailRef(ref);
              }}
              onSubmitEditing={handleSubmit}
            />
          </View>
          <View
            style={[AppStyles.mTop30, util.isRTL() && AppStyles.rowReverse]}>
            <TouchableOpacity
              style={styles.radioBtnTwo}
              onPress={() => {
                setValue({selectForgetOpt: FORGET_OPTION.PH0NE});
              }}>
              <RnImage style={styles.radioBtnStyle} source={isPhoneActive} />
            </TouchableOpacity>
            <View style={AppStyles.flex}>
              <PhoneInput
                onNumberChange={(val) => {
                  props.setValue({phone: val});
                }}
                error={phoneError}
              />
            </View>
          </View>
        </View>
        {/*  */}

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
    </KeyboardAwareScrollView>
  );
}
