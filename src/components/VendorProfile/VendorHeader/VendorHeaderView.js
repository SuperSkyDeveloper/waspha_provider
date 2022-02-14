import React from 'react';

import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
  Switch,
} from 'react-native';

import {Text, AmountItem, StarRating, HTMLView} from '../../../components';
import styles from './VendorHeaderStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from './../../../theme';
import util from '../../../util';
import {STORE_ACTION_TYPE, strings} from '../../../constants';
import {Actions} from 'react-native-router-flux';
import {renderNameStringAndImageRender} from '../../../helpers/multilingualHelper';

export default function VendorHeaderView(props) {
  const {
    isWriteReviewVisible,
    isAmountVisible,
    isTodayEarningVisible,
    isSwitchVisible,
    handleSwitchBtn,
    isSwitchActive,
    isNotificationVisible,
    showBackBtn,
    data,
    user,
  } = props;
  let storeImg = _.isEmpty(data.image)
    ? Images.ProfilePlaceholder
    : {uri: data.image};

  return (
    <View>
      <ImageBackground source={Images.ReviewBg} style={styles.header}>
        <View
          style={[
            styles.firstSec,
            util.isRTL() && AppStyles.rowReverse,
            util.isRTL() && styles.space,
          ]}>
          <TouchableOpacity
            style={[styles.touchBox, util.isRTL() && styles.space]}
            onPress={() => {
              showBackBtn ? Actions.pop() : Actions.drawerOpen();
            }}>
            <RnImage
              source={showBackBtn ? Images.BackBtn : Images.BaselineIcon}
              style={util.isRTL() && styles.rtlStyle}
            />
          </TouchableOpacity>
          {isNotificationVisible &&
            !_.isNil(data.unviewed_counts) &&
            !_.isNil(data.unviewed_counts.notifications) && (
              <TouchableOpacity
                style={[styles.noticationWrap]}
                activeOpacity={0.8}
                onPress={() => {
                  Actions.notification({
                    isNotificationScreen: true,
                  });
                }}>
                <RnImage
                  source={Images.NotificationIcon}
                  style={styles.bellIcon}
                />
                {data.unviewed_counts.notifications > 0 && (
                  <View style={styles.noticationBadge}>
                    <Text size={9} color={Colors.text.secondary} type="bold">
                      {util.notificationCounter(
                        data.unviewed_counts.notifications,
                      )}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
        </View>
        {isSwitchVisible && (
          <View
            style={[
              {
                alignSelf: 'flex-end',
                marginRight: Metrics.baseMargin,
              },
              util.isRTL() && AppStyles.selfStart,
              util.isRTL() && AppStyles.mLeft5,
            ]}>
            <Switch
              trackColor={{
                false: Colors.button.tertiary,
                true: Colors.button.accent,
              }}
              thumbColor={
                data.is_online ? Colors.button.hexa : Colors.button.hexa
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                handleSwitchBtn(STORE_ACTION_TYPE.CHANGE_STATUS);
              }}
              value={data.is_online}
              style={[
                {alignSelf: 'flex-end'},
                util.isRTL() && AppStyles.selfStart,
                util.isPlatformAndroid() ? styles.androidSize : styles.iosSize,
              ]}
            />
            <View style={{minWidth: '10%', paddingLeft: 7}}>
              <Text
                size={Fonts.size.xxxxSmall}
                type="medium"
                color={Colors.text.secondary}
                style={AppStyles.mRight10}>
                {strings.STORE_STATUS}
              </Text>
            </View>
          </View>
        )}
        <RnImage style={styles.image} source={storeImg} />
        <View style={{minWidth: '20%'}}>
          {/* <Text size={Fonts.size.large} color={Colors.white} type="extraBold">
          {renderNameStringAndImageRender(data.name)}
        </Text> */}
          <HTMLView
            htmlContent={renderNameStringAndImageRender(data.name)}
            size={Fonts.size.large}
            color={Colors.white}
            type="extraBold"
          />
        </View>
        <View style={styles.ratingWrap}>
          {/* <Rating
            isDisabled={true}
            ratingCount={5}
            imageSize={23}
            tintColor={'#011c40'}
            readonly={true}
            startingValue={data.average_rating}
          /> */}

          <StarRating
            initialRating={data.average_rating}
            readonly={true}
            imageSize={23}
          />

          {/* switch start */}

          {/* switch end */}
        </View>
        {/* write review start */}
        {isWriteReviewVisible && (
          <TouchableOpacity
            style={styles.reviewSec}
            activeOpacity={0.8}
            onPress={() => {
              Actions.vendorReviews();
            }}>
            <View style={styles.reviewBtn}>
              <Text color={Colors.text.secondary} type="medium">
                {strings.VIEW_REVIEWS}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {/* write review end */}
        {/* amount show start */}
        {isAmountVisible && (
          <AmountItem
            amount={
              !_.isNil(data.earning) && !_.isNil(data.earning.todays_earning)
                ? data.earning.todays_earning.toFixed(2)
                : 0
            }
            currencyCode={user.currency_code}
          />
        )}
        {/* amount show end */}
        {/* today earning show */}
        {isTodayEarningVisible && (
          <View style={AppStyles.mTop5}>
            <Text
              size={Fonts.size.xxxSmall}
              type="bold"
              color={Colors.text.secondary}>
              {strings.TODAYS_EARNING}
            </Text>
          </View>
        )}
        {/* today earning end */}
      </ImageBackground>
    </View>
  );
}
