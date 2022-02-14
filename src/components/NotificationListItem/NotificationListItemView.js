import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './NotificationListItemStyles';
import {Colors, Images, Fonts, AppStyles, Metrics} from './../../theme';
import util from '../../util';

export default function NotificationListItemView(props) {
  const {handleModalVisible, item, handleNotification} = props;

  let extraData = JSON.parse(item.extra_data);

  return (
    <TouchableOpacity
      style={[
        styles.list,
        util.isRTL() && AppStyles.rowReverse,
        !_.isNil(item.is_read) &&
          !item.is_read && {backgroundColor: Colors.background.unRead},
      ]}
      activeOpacity={0.7}
      onPress={() => handleNotification()}>
      <View style={[styles.spaceBetween, util.isRTL() && AppStyles.rowReverse]}>
        <View style={[styles.imgWrap, util.isRTL() && AppStyles.mLeft10]}>
          <RnImage
            style={styles.img}
            source={
              _.isNil(extraData.sent_by) || _.isNil(extraData.sent_by.avatar)
                ? Images.ProfilePlaceholder
                : {uri: extraData.sent_by.avatar}
            }
          />
        </View>
        <View style={AppStyles.mLeft15}>
          <View
            style={
              util.isRTL()
                ? {
                    marginLeft: Metrics.screenWidth / 2.9,
                  }
                : {marginRight: Metrics.screenWidth / 2.9}
            }>
            <Text
              size={Fonts.size.small}
              color={Colors.text.primary}
              type="semiBold"
              textAlign={util.rtlRightText()}>
              {item.title}
            </Text>
          </View>

          <View
            style={
              util.isRTL()
                ? {
                    marginLeft: Metrics.screenWidth / 3.3,
                  }
                : {marginRight: Metrics.screenWidth / 3.3}
            }>
            <Text
              style={[AppStyles.mTop5]}
              size={Fonts.size.xxSmall}
              color={Colors.text.quaternary}
              type="semiBold"
              textAlign={util.rtlRightText()}>
              {item.body}
            </Text>
          </View>
        </View>
      </View>

      {false && (
        <View style={styles.touchSize}>
          <TouchableOpacity
            style={styles.touchArea}
            onPress={handleModalVisible}>
            <Text
              style={{lineHeight: 10}}
              size={Fonts.size.normal}
              type="semiBold">
              ...
            </Text>
          </TouchableOpacity>
          <View style={styles.status} />
        </View>
      )}
    </TouchableOpacity>
  );
}
