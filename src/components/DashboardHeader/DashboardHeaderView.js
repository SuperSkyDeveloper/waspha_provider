import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import {Text, RoundErrorItem} from '../../components';
import styles from './DashboardHeaderStyles';
import {Colors, Images, Fonts, AppStyles} from './../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function DashboardHeaderView(props) {
  const {isEarningScreen, isNotificationScreen, accountApproved, user} = props;
  return (
    <LinearGradient
      start={{x: 0.2, y: 0.8}}
      end={{x: 0.9, y: -0.9}}
      colors={Colors.gradient.primary}
      style={styles.header}>
      <TouchableOpacity
        style={[
          styles.backBtnStyle,
          util.isRTL() && styles.backBtnStyleRtl,
          util.isRTL() && AppStyles.rowReverse,
        ]}
        onPress={() => {
          if (accountApproved) {
            return Actions.reset('drawerMenu');
          }
          Actions.pop();
        }}>
        <RnImage
          source={Images.BackBtn}
          style={util.isRTL() && styles.backBtnImgRtl}
        />
      </TouchableOpacity>
      <View style={styles.headerWrap}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerItem}
          onPress={() => {
            Actions.earningDetail();
          }}>
          <View style={[styles.imgWrap, isEarningScreen && styles.whiteBg]}>
            <RnImage source={Images.EarningIcon} />
          </View>
          <Text
            color={Colors.text.secondary}
            size={Fonts.size.small}
            type="medium"
            style={AppStyles.mTop10}>
            {strings.EARNINGS}
          </Text>
        </TouchableOpacity>
        <View style={styles.dashboardWrap}>
          <TouchableOpacity
            style={styles.headerItem}
            activeOpacity={0.7}
            onPress={() => {
              Actions.pop();
              Actions.vendorDashboard();
            }}>
            <RnImage style={styles.imgSize} source={Images.DashboardIcon} />
            <View style={styles.amountWrap}>
              {/* <View style={styles.square}></View> */}
              <Text size={Fonts.size.xxSmall}>{user.avg_rating}</Text>
            </View>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.small}
              type="medium"
              style={AppStyles.mTop10}>
              {strings.DASHBOARD}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.headerItem}
          activeOpacity={0.7}
          onPress={() => {
            Actions.pop();
            Actions.notification({isNotificationScreen: true});
          }}>
          <View>
            {false && (
              <View style={styles.error}>
                <RoundErrorItem notificationCounter={1} />
              </View>
            )}
            <View
              style={[styles.imgWrap, isNotificationScreen && styles.whiteBg]}>
              <RnImage source={Images.BellIcon} />
            </View>
          </View>
          <Text
            color={Colors.text.secondary}
            size={Fonts.size.small}
            type="medium"
            style={AppStyles.mTop10}>
            {strings.NOTIFICATION}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
