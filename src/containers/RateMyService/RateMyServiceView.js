import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  RateMyServiceHeader,
  TextInput,
  Button,
  StarRating,
  RichTextEditor,
} from '../../components';
import styles from './RateMyServiceStyles';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';

export default function RateMyServiceView(props) {
  const {
    driverReview,
    driverRating,
    driverReviewError,
    driverRatingError,
    customerReview,
    customerRating,
    customerReviewError,
    customerRatingError,
    loading,
    setValue,
    submitRating,
    data,
    refCustom,
    refDriver,
  } = props;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <RateMyServiceHeader />
      {!_.isNil(data.user_id) && (
        <>
          <View
            style={[
              util.isRTL()
                ? [AppStyles.rowReverse, AppStyles.pRight25]
                : [AppStyles.flexRow, AppStyles.pLeft25],
              AppStyles.mTop25,
            ]}>
            <Text size={Fonts.size.small} type="semiBold">
              {strings.USER}
            </Text>
            <View style={[AppStyles.flexRow, styles.providerRatingWrap]}>
              {/* <AirbnbRating
            count={5}
            defaultRating={customerRating}
            size={23}
            showRating={false}
            onFinishRating={(number) => {
              setValue({customerRating: number});
            }}
          /> */}
              <StarRating
                initialRating={customerRating}
                readonly={false}
                imageSize={23}
                onChangeRating={(number) => {
                  if (number >= 1) {
                    setValue({customerRating: number});
                  }
                }}
              />
            </View>
          </View>
          <View style={AppStyles.pLeft25}>
            {!_.isEmpty(customerRatingError) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}
                textAlign={util.rtlRightText()}>
                {customerRatingError}
              </Text>
            )}
          </View>
          <View style={[styles.inputWrap, AppStyles.mBottom30]}>
            {/* <TextInput
          autoFocus
          multiline={true}
          placeholder={`${strings.ENTER_USER_REVIEWS}....`}
          inputStyle={styles.inputStyle}
          style={styles.addressInputWrap}
          value={customerReview}
          error={customerReviewError}
          onChangeText={(val) => {
            setValue({customerReview: val});
          }}
        /> */}
            <View style={styles.richInputStyle}>
              <RichTextEditor
                value={customerReview}
                onChange={(text) => setValue({customerReview: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                fontSize={Fonts.size.xxSmall}
                showLateToolbar={true}
                heightInput={147}
                error={customerReviewError}
                refRichText={refCustom}
              />
            </View>
          </View>
        </>
      )}
      {util.isEmpty(data.driver_id) && (
        <View>
          <View
            style={[
              util.isRTL()
                ? [AppStyles.rowReverse, AppStyles.pRight25]
                : [AppStyles.flexRow, AppStyles.pLeft25],
              AppStyles.mTop25,
            ]}>
            <Text size={Fonts.size.small} type="semiBold">
              {strings.DRIVER}
            </Text>

            <View style={[AppStyles.flexRow, styles.userRatingWrap]}>
              {/* <AirbnbRating
                count={5}
                defaultRating={driverRating}
                size={23}
                showRating={false}
                onFinishRating={(number) => {
                  setValue({driverRating: number});
                }}
              /> */}
              <StarRating
                initialRating={driverRating}
                readonly={false}
                imageSize={23}
                onChangeRating={(number) => {
                  if (number >= 1) {
                    setValue({driverRating: number});
                  }
                }}
              />
            </View>
          </View>
          <View style={AppStyles.pLeft25}>
            {!_.isEmpty(driverRatingError) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}
                textAlign={util.rtlRightText()}>
                {driverRatingError}
              </Text>
            )}
          </View>
          <View style={styles.inputWrap}>
            {/* <TextInput
              multiline={true}
              placeholder={`${strings.ENTER_DRIVER_REVIEWS}....`}
              inputStyle={styles.inputStyle}
              style={styles.addressInputWrap}
              value={driverReview}
              error={driverReviewError}
              onChangeText={(val) => {
                setValue({driverReview: val});
              }}
            /> */}
            <View style={styles.richInputStyle}>
              <RichTextEditor
                value={driverReview}
                onChange={(text) => setValue({driverReview: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                fontSize={Fonts.size.xxSmall}
                showLateToolbar={true}
                heightInput={147}
                refRichText={refDriver}
                error={driverReviewError}
              />
            </View>
          </View>
        </View>
      )}

      <View style={styles.submitBtnWrap}>
        <Button
          disabled={loading}
          isLoading={loading}
          color={Colors.white}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          indicatorColor={Colors.loader.secondary}
          onPress={submitRating}>
          {strings.SUBMIT.toUpperCase()}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
