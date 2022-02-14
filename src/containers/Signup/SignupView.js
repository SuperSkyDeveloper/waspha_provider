import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {
  Text,
  TextInput,
  Button,
  SignWithSection,
  PhoneInput,
  SelectLanguageModal,
  Loader,
} from '../../components';
import styles from './SignupStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {strings, PASSWORD_PLACEHOLDER} from '../../constants';
import util from '../../util';

export default function SignupView(props) {
  const {
    setValue,
    fullName,
    email,
    password,
    phone,
    retypePwd,
    fullNameError,
    emailError,
    phoneError,
    passwordError,
    retypePwdError,
    handleSubmit,
    hidePassword,
    fullNameFocus,
    emailFocus,
    passwordFocus,
    retypePwdFocus,
    phoneFocus,
    hideRetypePwd,
    termsCheckBox,
    handleAcceptTerms,
    termsError,
    isLoading,

    selectedCountry,
    selectedCountryError,
    isLangModalVisible,
    handleLanguageModal,
    handleChangeLanguage,
    referralCode,
    referralCodeError,
    referralCodeFocus,
    isLangLoading,
  } = props;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      {isLangLoading ? (
        <Loader loading={isLangLoading} />
      ) : (
        <>
          <View style={AppStyles.flex}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0}}
              colors={Colors.gradient.primary}
              style={styles.bgImage}>
              <View style={styles.loginContent}>
                <Text
                  color={Colors.white}
                  size={Fonts.size.xxLarge}
                  type="bold">
                  {strings.SIGN_UP_NOW}
                </Text>
                <Text
                  color={Colors.white}
                  size={Fonts.size.xxxSmall}
                  type="light">
                  {strings.PLEASE_FILL_THE_DETAILS_AND_CREATE_ACCOUNT}
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.memeSec}>
              <RnImage source={Images.SignupMeme} />
            </View>
            {false && <SignWithSection signup={true} />}
            <View style={styles.loginSection}>
              <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={`${strings.MUSLIM_NAME}`}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.FULL_NAME}
                value={fullName}
                error={fullNameError}
                onChangeText={(val) => {
                  setValue({fullName: val});
                }}
                ref={(ref) => {
                  props.fullNameRef(ref);
                }}
                onSubmitEditing={emailFocus}
              />
              <View style={AppStyles.mTop30}>
                <TextInput
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholder={`${strings.MUSLIM_NAME}`}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  autoCapitalize="none"
                  keyboardType={'email-address'}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  label={strings.EMAIL_ID}
                  value={email}
                  error={emailError}
                  onChangeText={(val) => {
                    setValue({email: val});
                  }}
                  ref={(ref) => {
                    props.emailRef(ref);
                  }}
                  onSubmitEditing={passwordFocus}
                />
              </View>

              <View style={AppStyles.mTop30}>
                <TextInput
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholder={PASSWORD_PLACEHOLDER}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  label={strings.PASSWORD.toUpperCase()}
                  secureTextEntry={hidePassword}
                  value={password}
                  error={passwordError}
                  onChangeText={(val) => {
                    setValue({password: val});
                  }}
                  ref={(ref) => {
                    props.passRef(ref);
                  }}
                  onSubmitEditing={retypePwdFocus}
                />
                <TouchableOpacity
                  style={[
                    styles.showPwsdWrap,
                    util.isRTL() && styles.showPwsdWrapRtl,
                  ]}
                  onPress={() => {
                    setValue({hidePassword: !hidePassword});
                  }}>
                  <RnImage
                    source={
                      hidePassword
                        ? Images.ViewPasswordIcon
                        : Images.HidePasswordIcon
                    }
                    style={styles.ViewPasswordIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={AppStyles.mTop30}>
                <View>
                  <TextInput
                    textAlign={util.isRTL() ? 'right' : 'left'}
                    placeholder={PASSWORD_PLACEHOLDER}
                    placeholderTextColor={Colors.text.quaternary}
                    inputStyle={AppStyles.inputStyle}
                    labelStyle={[
                      AppStyles.labelStyle,
                      util.isRTL() && AppStyles.alignRight,
                    ]}
                    label={strings.RETYPE_PASSWORD}
                    secureTextEntry={hideRetypePwd}
                    value={retypePwd}
                    error={retypePwdError}
                    onChangeText={(val) => {
                      setValue({retypePwd: val});
                    }}
                    ref={(ref) => {
                      props.retypePwdRef(ref);
                    }}
                    onSubmitEditing={referralCodeFocus}
                  />
                  <TouchableOpacity
                    style={[
                      styles.showPwsdWrap,
                      util.isRTL() && styles.showPwsdWrapRtl,
                    ]}
                    onPress={() => {
                      setValue({hideRetypePwd: !hideRetypePwd});
                    }}>
                    <RnImage
                      source={
                        hideRetypePwd
                          ? Images.ViewPasswordIcon
                          : Images.HidePasswordIcon
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* <View style={AppStyles.mTop30}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Actions.selectCountry({
                  setValue,
                  countrySelected: selectedCountry,
                });
              }}
              style={styles.inputStyle}>
              <Text
                color={Colors.text.quaternary}
                style={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}>
                {strings.SELECT_COUNTRY}
              </Text>
              <Text
                color={
                  _.isEmpty(selectedCountry)
                    ? Colors.text.quaternary
                    : Colors.text.primary
                }
                style={[
                  AppStyles.inputStyle,
                  AppStyles.mTop5,
                  util.isRTL() && AppStyles.alignRight,
                  {borderBottomWidth: 0},
                ]}>
                {!_.isEmpty(selectedCountry)
                  ? selectedCountry.name[util.getLanguage()]
                  : strings.PLEASE_SELECT_COUNTRY}
              </Text>
            </TouchableOpacity>
            {!_.isEmpty(selectedCountryError) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {selectedCountryError}
              </Text>
            )}
          </View> */}

              <View style={AppStyles.mTop30}>
                <PhoneInput
                  onNumberChange={(val, ref) => {
                    setValue({phone: val});
                  }}
                  error={phoneError}
                  ref={(ref) => {
                    props.phoneRef(ref);
                  }}
                  phoneRef={(ref) => {
                    props.phoneRef = ref;
                  }}
                  onSubmitEditing={referralCodeFocus}
                />
              </View>
              <View style={AppStyles.mTop30}>
                <TextInput
                  placeholder={'ABC1234'}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholderTextColor={Colors.grey1}
                  autoCapitalize="none"
                  keyboardType={'email-address'}
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[AppStyles.labelStyle]}
                  label={'Referral Code'}
                  value={referralCode}
                  error={referralCodeError}
                  onChangeText={(val) => {
                    setValue({referralCode: val});
                  }}
                  ref={(ref) => {
                    props.referralCodeRef(ref);
                  }}
                />
              </View>
            </View>
            <View style={[styles.termsSec]}>
              <View
                style={[
                  styles.termWrap,
                  AppStyles.mBottom10,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <CheckBox
                  style={[AppStyles.mRight5, AppStyles.mLeft5]}
                  disabled={false}
                  value={termsCheckBox}
                  onValueChange={(val) => handleAcceptTerms(val)}
                />
                <Text size={Fonts.size.xxxSmall} color={Colors.text.quaternary}>
                  {strings.BY_CONTINUING_I_CONFIRM_THAT_HAVE_READ_AGREE_TO_THE}
                </Text>
              </View>
              <View style={AppStyles.flexRow}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.termsAndCondition();
                  }}>
                  <Text size={Fonts.size.xxxSmall} color={Colors.text.accent}>
                    {strings.TERMS_CONDITIONS}{' '}
                  </Text>
                </TouchableOpacity>
                <Text size={Fonts.size.xxxSmall} color={Colors.text.quaternary}>
                  {strings.AND}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Actions.privacyPolicy();
                  }}>
                  <Text size={Fonts.size.xxxSmall} color={Colors.text.accent}>
                    {strings.PRIVACY_POLICY}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop10, AppStyles.mBottom5]}>
                {termsError}
              </Text>
            </View>
            <View style={[styles.loginBtnWrap, styles.paddingHr]}>
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
                  disabled={false}
                  type="semiBold">
                  {strings.SIGNUPS}
                </Button>
              </LinearGradient>
            </View>
            <View
              style={[styles.signupSec, util.isRTL() && AppStyles.rowReverse]}>
              <Text color={Colors.text.quaternary} size={Fonts.size.xSmall}>
                {strings.ALREADY_HAVE_AN_ACCOUNT}
                {util.isRTL() ? '؟' : '?'}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Actions.reset('login');
                }}>
                <Text size={Fonts.size.xSmall} color={Colors.text.accent}>
                  {strings.LOGIN}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.loginBtnWrap, styles.paddingHr]}>
              <LinearGradient
                start={{x: 0.3, y: 2}}
                end={{x: 1, y: 0}}
                colors={Colors.gradient.primary}
                style={styles.gradBtn}>
                <Button
                  color={Colors.text.secondary}
                  background={Colors.transparent}
                  style={styles.loginBtn}
                  size={Fonts.size.normal}
                  onPress={() => handleLanguageModal()}
                  indicatorColor={Colors.text.secondary}
                  type="semiBold">
                  {_.upperCase(strings.LANGUAGES)}
                </Button>
              </LinearGradient>
            </View>
            {isLangModalVisible && (
              <SelectLanguageModal
                isModalOpen={isLangModalVisible}
                closeModal={setValue}
                modalType="isLangModalVisible"
                handleLangSelect={handleChangeLanguage}
              />
            )}
          </View>
        </>
      )}
    </KeyboardAwareScrollView>
  );
}
