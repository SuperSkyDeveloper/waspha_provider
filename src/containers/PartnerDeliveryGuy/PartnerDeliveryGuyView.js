import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Text, SignHeader} from '../../components';
import styles from './PartnerDeliveryGuyStyles';
import {strings} from '../../constants';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../theme';
import util from '../../util';

export default function PartnerDeliveryGuyView(props) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SignHeader
        drawerImg={Images.BackBtn}
        title={strings.PARTNER}
        subTitle={strings.DELIVERY_GUY}
      />
      {util.ITEMS_LIST().map((item) => {
        return (
          <View style={styles.cardWrap}>
            <RnImage source={item.image} style={styles.imgStyle} />
            <View
              style={[styles.bottomView, util.isRTL() && AppStyles.rowReverse]}>
              <View
                style={{
                  top: 8,
                  maxWidth: Metrics.screenWidth / 2.2,
                }}>
                <Text
                  style={[
                    styles.titleTextStyle,
                    util.isRTL()
                      ? {textAlign: 'right', ...AppStyles.mRight5}
                      : {...AppStyles.mLeft5},
                  ]}
                  type="semiBold"
                  size={Fonts.size.small}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => {
                    Actions.deliveryGuyForm({
                      isOnlineDeliveryGuy: item.isOnline,
                    });
                  }}>
                  <View style={styles.addBtn}>
                    <Text
                      type="semiBold"
                      style={styles.listTextStyle}
                      color={Colors.text.secondary}>
                      {strings.ADD}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.riderListing({
                      isDeliveryGuyForm: true,
                      isOnline: item.isOnline,
                      isDeleteBtnShow: true,
                    });
                  }}>
                  <View style={styles.listBtn}>
                    <Text
                      style={styles.listTextStyle}
                      type="semiBold"
                      color={Colors.text.primary}>
                      {strings.LIST}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
