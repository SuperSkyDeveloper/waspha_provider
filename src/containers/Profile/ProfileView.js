import React from 'react';
import _, {capitalize} from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  Button,
  ImagePicker,
  PhoneInput,
  Text,
  TextInput,
  Image,
} from '../../components';
import styles from './ProfileStyles';
import {AppStyles, Colors, Fonts, Images, Metrics} from './../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

import {strings} from '../../constants';

export default function ProfileView(props) {
  const {
    user,
    setValue,
    isForEdit,
    fullNameError,
    email,
    emailError,
    phone,
    phoneError,
    fullName,
    handleEditProfile,
    handleSubmit,
    isLoading,
    isImgUploadVisible,
    closeImageModal,
    updateProfileImage,
    userImage,
  } = props;

  return (
    <View style={styles.container}>
      {/* header start */}
      <LinearGradient
        start={{x: 0.4, y: 0}}
        end={{x: 1, y: 3}}
        colors={Colors.gradient.primary}
        style={styles.header}>
        <View style={[AppStyles.flexRow, util.isRTL() && AppStyles.rowReverse]}>
          <TouchableOpacity
            style={{paddingLeft: 14, paddingVertical: 10}}
            onPress={() => {
              Actions.pop();
            }}>
            <RnImage
              style={[
                util.isRTL() && AppStyles.mLeft10,
                util.isRTL() && styles.imageRotate,
              ]}
              source={Images.BackBtn}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.rightSec,
              util.isRTL() && AppStyles.rowReverse,
              util.isRTL() && AppStyles.mLeft0,
            ]}>
            <View
              style={[
                styles.profileImgWrap,
                util.isRTL() && AppStyles.mLeft15,
                util.isRTL() && styles.profileImgWrapRtl,
              ]}>
              {isForEdit && (
                <TouchableOpacity
                  onPress={() => setValue({isImgUploadVisible: true})}
                  style={styles.cameraIconWrap}>
                  <RnImage
                    source={Images.CameraIcon}
                    style={{width: 17, height: 17}}
                  />
                </TouchableOpacity>
              )}
              <RnImage
                style={[
                  styles.profileImg,
                  _.isNil(userImage) && {tintColor: Colors.white},
                ]}
                source={util.profilePlaceHolderImage(userImage && userImage)}
              />
            </View>
            {/* <View style={[AppStyles.mLeft25, util.isRTL() && {width: '58%'}]}> */}
            <View
              style={[
                !util.isRTL()
                  ? {width: Metrics.screenWidth / 1.7, paddingLeft: 10}
                  : {width: Metrics.screenWidth / 1.7, paddingRight: 10},
              ]}>
              <Text
                size={Fonts.size.medium}
                type="semiBold"
                color={Colors.white}
                style={[
                  AppStyles.mBottom5,
                  util.isRTL() && {textAlign: 'right'},
                ]}>
                {util.isValueEmpty(capitalize(user && user.name))}
              </Text>
              <Text
                size={Fonts.size.medium}
                type="medium"
                numberOfLines={1}
                color={Colors.white}
                style={[
                  AppStyles.mBottom5,
                  util.isRTL() && {textAlign: 'right'},
                ]}>
                {util.isValueEmpty(user && user.email)}
              </Text>
              <Text
                size={Fonts.size.medium}
                type="medium"
                color={Colors.white}
                style={[util.isRTL() && {textAlign: 'right'}]}>
                {util.isValueEmpty(user && user.contact)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.editWrap,
            AppStyles.mTop20,
            AppStyles.mBottom20,
            {alignSelf: 'flex-end'},
            util.isRTL() && {
              left: 30,
            },
          ]}
          onPress={handleEditProfile}>
          <RnImage
            source={isForEdit ? Images.CancelBtn : Images.EditIcon}
            style={[styles.editImg]}
          />
        </TouchableOpacity>
      </LinearGradient>
      {/* header end  */}
      {/* field section start  */}

      <View style={styles.listingSec}>
        {/*  */}
        <View style={[styles.row]}>
          <View
            style={[styles.rowCenter, util.isRTL() && AppStyles.rowReverse]}>
            <RnImage
              style={util.isRTL() && AppStyles.mLeft10}
              source={Images.ProfileIcon}
            />
            <View style={styles.fieldWrap}>
              <TextInput
                editable={isForEdit}
                inputStyle={styles.inputStyle}
                textAlign={util.isRTL() ? 'right' : 'left'}
                value={fullName}
                ref={(ref) => {
                  props.fullNameRef(ref);
                }}
                onChangeText={(val) => {
                  setValue({fullName: val});
                }}
                error={fullNameError}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Actions.changeEmailAndNumber({isEmail: true, data: user.email});
          }}
          style={[styles.row, isForEdit && styles.disabled]}>
          <View
            style={[styles.rowCenter, util.isRTL() && AppStyles.rowReverse]}>
            <RnImage
              style={util.isRTL() && AppStyles.mLeft10}
              source={Images.EmailIcon}
            />
            <View style={[styles.fieldWrap, AppStyles.flexRow]}>
              <TextInput
                editable={false}
                inputStyle={styles.inputStyle}
                textAlign={util.isRTL() ? 'right' : 'left'}
                value={email}
                onChangeText={(val) => {
                  setValue({email: val});
                }}
                ref={(ref) => {
                  props.emailRef(ref);
                }}
                error={emailError}
              />
              <View
                style={{
                  top: -1,
                  alignSelf: 'center',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <Text
                  size={14}
                  type="base"
                  color={
                    _.isEmpty(user.unverified) ||
                    (!_.isEmpty(user.unverified) &&
                      _.isNil(user.unverified.email))
                      ? Colors.text.hepta
                      : Colors.text.error
                  }>
                  {_.isEmpty(user.unverified) ||
                  (!_.isEmpty(user.unverified) &&
                    _.isNil(user.unverified.email))
                    ? strings.VERIFIED
                    : strings.UNVERIFIED}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.changeEmailAndNumber({isPhone: true});
          }}
          style={[styles.row, isForEdit && styles.disabled]}>
          <View
            style={[styles.rowCenter, util.isRTL() && AppStyles.rowReverse]}>
            <RnImage
              style={util.isRTL() && AppStyles.mLeft10}
              source={Images.PhoneIcon1}
              style={util.isRTL() ? AppStyles.mLeft10 : AppStyles.mRight25}
            />
            <View style={[AppStyles.flex, AppStyles.flexRow]}>
              {true && (
                <TextInput
                  editable={false}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  inputStyle={styles.inputStyle}
                  value={phone}
                  onChangeText={(val) => {
                    setValue({phone: val});
                  }}
                  ref={(ref) => {
                    props.phoneRef(ref);
                  }}
                  error={phoneError}
                />
              )}
              {false && (
                <PhoneInput
                  onNumberChange={(val) => {
                    props.setValue({phone: val});
                  }}
                  error={phoneError}
                />
              )}
              <View
                style={{
                  top: -1,
                  alignSelf: 'center',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <Text
                  size={14}
                  type="base"
                  color={
                    _.isEmpty(user.unverified) ||
                    (!_.isEmpty(user.unverified) &&
                      _.isNil(user.unverified.contact))
                      ? Colors.text.hepta
                      : Colors.text.error
                  }>
                  {_.isEmpty(user.unverified) ||
                  (!_.isEmpty(user.unverified) &&
                    _.isNil(user.unverified.contact))
                    ? strings.VERIFIED
                    : strings.UNVERIFIED}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {isForEdit && (
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
                {strings.UPDATE}
              </Button>
            </LinearGradient>
          </View>
        )}

        {/*  */}
      </View>
      {/* field section end  */}

      {isImgUploadVisible && (
        <ImagePicker
          addImage={updateProfileImage}
          showPickerModal={isImgUploadVisible}
          closeModal={closeImageModal}
        />
      )}
    </View>
  );
}
