import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Loader, Text} from '../../components';
import styles from './SignWithSectionStyles';
import {Colors, Fonts, Images, AppStyles} from '../../theme';
import {FBLogin} from '../../services/FBLoginHelper';
import {GoogleLogin} from '../../services/GoogleLoginHelper';

export default function SignWithSectionView(props) {
  const {
    signup,
    login,
    socialLoginRequest,
    socialLoginError,
    socialLoginLoading,
  } = props;
  return (
    <View style={[styles.loginViaSec, styles.paddingHr]}>
      {socialLoginLoading && (
        <>
          <View style={styles.fullScreenLoader}></View>
          <Loader loading={socialLoginLoading} />
        </>
      )}
      <Text
        color={Colors.text.quaternary}
        size={Fonts.size.xSmall}
        type="medium">
        {login && 'Login via social networks'}
        {signup && 'Signup  via social networks'}
      </Text>
      <View style={[AppStyles.flexRow, styles.loginViaWrap]}>
        <TouchableOpacity
          onPress={() => {
            FBLogin(socialLoginRequest, socialLoginError);
          }}
          style={[styles.fb, styles.col]}>
          <RnImage source={Images.FBIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            GoogleLogin(socialLoginRequest, socialLoginError);
          }}
          style={[styles.gmail, styles.col]}>
          <RnImage source={Images.GmailIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.linkedin, styles.col]}>
          <RnImage style={styles.iconSize} source={Images.LinkedinIcon} />
        </TouchableOpacity> */}
      </View>
      <Text
        color={Colors.text.quaternary}
        size={Fonts.size.xxSmall}
        type="medium">
        {login && 'or login with email'}
        {signup && 'or Create a new  account'}
      </Text>
    </View>
  );
}
