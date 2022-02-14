import React from 'react';
import _ from "lodash"
import {
  View,
  Image as RnImage,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  TextInput,
  Button,
  SelectLanguageModal,
  SignWithSection,
} from '../../components';
import styles from './LoginStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {LOGIN_PLACEHOLDER, strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';

export default function LoginView(props) {
  const {
    setValue,
    userId,
    password,
    userIdError,
    passwordError,
    handleSubmit,
    passwordFocus,
    hidePassword,
    handleShowPassword,
    stayLogged,
    handleStayLogged,
    isLoading,
    isLangModalVisible,
    handleChangeLanguage,
    handleLanguageModal,
  } = props;
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={AppStyles.flex}>
        <ImageBackground
          source={Images.LoginBg}
          style={[styles.bgImage, util.isRTL() && {justifyContent: 'flex-end'}]}
          resizeMode="cover">
          <View style={styles.loginContent}>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.medium}
              textAlign={util.rtlRightText()}
              style={util.isRTL() && AppStyles.width100}>
              {strings.WE_ARE}
            </Text>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.xxxxxLarge}
              style={AppStyles.lHeight55}>
              {strings.WASPHA}
            </Text>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.normal}
              textAlign={util.rtlRightText()}
              type="light"
              style={AppStyles.mTop15}>
              {strings.WELCOME_PLEASE_LOGIN_TO_YOUR_ACCOUNT}
            </Text>
          </View>
        </ImageBackground>
        {false && <SignWithSection login={true} />}
        <View style={styles.loginSection}>
          <RnImage source={Images.Mask3} style={styles.mask3} />
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={LOGIN_PLACEHOLDER}
            placeholderTextColor={Colors.text.quaternary}
            inputStyle={AppStyles.inputStyle}
            labelImg={Images.IdCardIcon}
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && AppStyles.mRight30,
              util.isRTL() && AppStyles.alignRight,
            ]}
            // label={strings.USER_ID}
            label={strings.MOBILE_EMAIL}
            labelImgStyle={[
              AppStyles.labelImgStyle,
              util.isRTL() && AppStyles.labelImgStyleRtl,
            ]}
            value={userId}
            error={userIdError}
            onChangeText={(val) => {
              setValue({userId: val});
            }}
            ref={(ref) => {
              props.userIdRef(ref);
            }}
            onSubmitEditing={passwordFocus}
          />
          <View style={AppStyles.mTop30}>
            <View>
              <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={'********'}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={AppStyles.inputStyle}
                labelImg={Images.LockIcon}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.mRight30,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.PASSWORD}
                labelImgStyle={[
                  AppStyles.labelImgStyle,
                  util.isRTL() && AppStyles.labelImgStyleRtl,
                ]}
                secureTextEntry={hidePassword}
                value={password}
                error={passwordError}
                onChangeText={(val) => {
                  setValue({password: val});
                }}
                ref={(ref) => {
                  props.passRef(ref);
                }}
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity
                style={[
                  styles.showPwsdWrap,
                  util.isRTL() && styles.showPwsdWrapRtl,
                ]}
                onPress={handleShowPassword}>
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
            <View
              style={[styles.forgetWrap, util.isRTL() && AppStyles.rowReverse]}>
              <TouchableOpacity
                style={styles.forgetPwd}
                onPress={handleStayLogged}>
                {stayLogged ? (
                  <RnImage
                    style={AppStyles.mRight5}
                    source={Images.RememberIcon}
                  />
                ) : (
                  <View style={styles.radioBtn} />
                )}
                <Text size={Fonts.size.xxxxxSmall} color={Colors.text.primary}>
                  {strings.STAY_LOGGED_IN}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgetPwd}
                onPress={() => {
                  Actions.forgetPassword();
                }}>
                <Text size={Fonts.size.xxxxSmall} color={Colors.text.primary}>
                  {`${strings.FORGOT_PASSWORD} ${util.isRTL() ? '؟' : '?'}`}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <RnImage source={Images.Mask1} style={styles.mask1} />
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
              onPress={handleSubmit}
              isLoading={isLoading}
              indicatorColor={Colors.text.secondary}
              disabled={isLoading}
              type="semiBold">
              {strings.LOGIN}
            </Button>
          </LinearGradient>
        </View>
        <View
          style={[
            styles.signupSec,
            util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
          ]}>
          <Text size={Fonts.size.xxSmall}>
            {`${strings.DONT_HAVE_AN_ACCOUNT} ${util.isRTL() ? '؟' : '?'}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Actions.signup();
            }}>
            <Text size={Fonts.size.xxSmall} color={Colors.text.accent}>
              {' '}
              {strings.SIGNUP}
            </Text>
          </TouchableOpacity>
          <RnImage source={Images.Mask2} style={styles.mask2} />
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
    </KeyboardAwareScrollView>
  );
}
