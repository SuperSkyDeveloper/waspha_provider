import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {
  Text,
  SignHeader,
  TextInput,
  PhoneInput,
  Button,
  ImagePicker,
  Image,
} from '../../components';
import styles from './DeliveryGuyFormStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings, PASSWORD_PLACEHOLDER} from '../../constants';
import BottomSheet from 'react-native-bottomsheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {findVehicle} from '../../helpers/generalHelper';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function DeliveryGuyFormView(props) {
  const {
    isOnlineDeliveryGuy,
    vehicleOptions,
    fullName,
    fullNameError,
    email,
    emailError,
    passwordError,
    password,
    retypePwd,
    setValue,
    fullNameRef,
    emailFocus,
    emailRef,
    passwordRef,
    reTypePassRef,
    vehicleNameRef,
    mobileNoRef,
    mobileNoFocus,
    passwordFocus,
    retypePwdFocus,
    hidePassword,
    hideRetypePwd,
    retypePwdError,
    mobileNo,
    mobileNoError,
    vehicle,
    vehicleName,
    vehicleNameError,
    numberPlateFocus,
    numberPlateRef,
    handleSubmitPress,
    numberPlateError,
    setPhone,
    isLoader,
    vehicleError,
    isImagePickerShow,
    handleImageUpload,
    openImagePickerModal,
    closeImagePickerModal,
    driverAvatar,
    driverAvatarError,
    handleSelectVehicle,
    takeVehicleInfo,
  } = props;

  let vehicleLabel = [];

  vehicleOptions.map((item) => {
    let displayTitle = renderNameStringAndImageRender(item.title);
    vehicleLabel.push(displayTitle);
  });

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}>
      <View style={AppStyles.flex}>
        <SignHeader
          drawerImg={Images.BackBtn}
          left
          title={
            isOnlineDeliveryGuy
              ? _.startCase(_.camelCase(strings.ONLINE))
              : _.startCase(_.camelCase(strings.OFFLINE))
          }
          subTitle={strings.DELIVERY_GUY}
        />
        <View style={styles.mainSection}>
          <TextInput
            textAlign={util.isRTL() ? 'right' : 'left'}
            placeholder={strings.ENTER_FULL_NAME}
            placeholderTextColor={Colors.text.quaternary}
            inputStyle={AppStyles.inputStyle}
            labelStyle={[
              AppStyles.labelStyle,
              util.isRTL() && AppStyles.alignRight,
            ]}
            label={strings.FULL_NAME.toUpperCase()}
            value={fullName}
            error={fullNameError}
            onChangeText={(val) => {
              setValue({fullName: val});
            }}
            ref={(ref) => {
              fullNameRef(ref);
            }}
            onSubmitEditing={isOnlineDeliveryGuy ? emailFocus : mobileNoFocus}
          />
          {isOnlineDeliveryGuy && (
            <>
              <View style={AppStyles.mTop30}>
                <TextInput
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholder={`${strings.MUSLIM_NAME_EMAIL}gmail.com`}
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
                    emailRef(ref);
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
                    passwordRef(ref);
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
                      reTypePassRef(ref);
                    }}
                    onSubmitEditing={mobileNoFocus}
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
            </>
          )}
          <View style={AppStyles.mTop30}>
            <PhoneInput
              onNumberChange={(val, ref) => {
                setValue({mobileNo: val});
              }}
              error={mobileNoError}
            />
          </View>
          <View style={AppStyles.mTop30}>
            <Text
              type="medium"
              style={[
                AppStyles.labelStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}>
              {strings.SELECT_VEHICLE.toUpperCase()}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                BottomSheet.showBottomSheetWithOptions(
                  {
                    options: vehicleLabel,
                    cancelButtonIndex: 4, //without this attribute it's not compiling on android
                    dark: false,
                  },
                  (value) => {
                    handleSelectVehicle(vehicleOptions[value]);
                  },
                );
              }}>
              <View
                style={[
                  styles.vehicleValueViewWrap,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <Text
                  textAlign={util.rtlRightText()}
                  style={[
                    _.isEmpty(vehicle) ? styles.placeholderStyle : '',
                    styles.vehicleText,
                  ]}>
                  {_.isEmpty(vehicle)
                    ? strings.VEHICLE_TYPE
                    : vehicle.display_name}
                </Text>
                <RnImage
                  tintColor={Colors.text.quaternary}
                  style={styles.dropDownIconStyle}
                  source={Images.DownArrowIcon}></RnImage>
              </View>
            </TouchableOpacity>
            <View style={styles.horizontalLineStyle}></View>
            {!_.isEmpty({vehicleError}) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop5, AppStyles.mBottom20]}>
                {vehicleError}
              </Text>
            )}
          </View>
          {!_.isEmpty(driverAvatar) && (
            <View style={styles.avatarWrap}>
              <Image style={styles.avatar} source={{uri: driverAvatar}} />
            </View>
          )}
          <TouchableOpacity onPress={openImagePickerModal}>
            <View style={styles.viewWrap}>
              <RnImage
                style={styles.uploadDocImage}
                source={Images.UploadDocument}
              />
              <Text
                textAlign={util.rtlRightText()}
                type="semiBold"
                size={Fonts.size.small}
                color={Colors.text.secondary}
                style={[AppStyles.mRight5, AppStyles.mLeft5]}>
                {strings.UPLOAD_IMAGE}
              </Text>
            </View>
          </TouchableOpacity>
          {!_.isEmpty({driverAvatarError}) && (
            <Text
              textAlign="center"
              type="medium"
              size={Fonts.size.xxSmall}
              color={Colors.error.primary}
              style={[AppStyles.mTop5, AppStyles.mBottom5]}>
              {driverAvatarError}
            </Text>
          )}
          {takeVehicleInfo && (
            <View style={styles.vehicleDetailsHeading}>
              <Text
                type="medium"
                style={[AppStyles.labelStyle, AppStyles.alignRight]}>
                {strings.VEHICLE_DETAILS.toUpperCase()}
              </Text>

              <View style={[AppStyles.mTop20]}>
                <TextInput
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholder={strings.ENTER_VEHICLE_NAME}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  label={strings.VEHICLE_NAME}
                  value={vehicleName}
                  error={vehicleNameError}
                  onChangeText={(val) => {
                    setValue({vehicleName: val});
                  }}
                  ref={(ref) => {
                    vehicleNameRef(ref);
                  }}
                  onSubmitEditing={numberPlateFocus}
                />
              </View>
              <View style={[AppStyles.mTop30]}>
                <TextInput
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  placeholder={strings.ENTER_NUMBER_PLATE}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={AppStyles.inputStyle}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  label={strings.NUMBER_PLATE}
                  value={vehicleName}
                  error={numberPlateError}
                  onChangeText={(val) => {
                    setValue({numberPlate: val});
                  }}
                  ref={(ref) => {
                    numberPlateRef(ref);
                  }}
                />
              </View>
            </View>
          )}
          <View style={styles.submitBtnWrap}>
            <Button
              isLoading={isLoader}
              disabled={isLoader}
              color={Colors.button.primary}
              style={styles.submitBtn}
              textStyle={styles.submitBtnText}
              type="semiBold"
              onPress={() => handleSubmitPress()}>
              {strings.SUBMIT}
            </Button>
          </View>
        </View>
      </View>
      {isImagePickerShow && (
        <ImagePicker
          addImage={handleImageUpload}
          showPickerModal={openImagePickerModal}
          closeModal={closeImagePickerModal}
        />
      )}
    </KeyboardAwareScrollView>
  );
}
