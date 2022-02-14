import React from 'react';
import {View, Image as RnImage, Image, ScrollView} from 'react-native';
import {Text, CustomNavbar, Button} from '../../components';
import styles from './ReferralCodeStyles';
import {Colors, Fonts, Metrics, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import Dash from 'react-native-dash';

export default function ReferralCodeView(props) {
  const {onShare, referral_code} = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.REFERRAL_CODE}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', marginTop: Metrics.baseMargin}}>
          <Image source={Images.referralCode} />
          <Text
            size={Fonts.size.xSmall}
            type="bold"
            color={Colors.black1}
            style={styles.advEarn}>
            {strings.REFER_VIEW_ADVT_EARN}
          </Text>
          <View style={{maxWidth: '60%'}}>
            <Text
              size={Fonts.size.xxxSmall}
              type="semiBold"
              color={Colors.black1}
              style={styles.referralDes}>
              {strings.REFERRAL_DES}
            </Text>
          </View>

          <View
            style={{
              marginBottom: Metrics.smallMargin,
              marginTop: 20,
            }}>
            <Text size={Fonts.size.xSmall} type="bold" style={{opacity: 1}}>
              {strings.YOUR_REF_CODE}
            </Text>
          </View>
          <View style={styles.referralCodeView}>
            <Text
              size={Fonts.size.large}
              type="bold"
              style={styles.referralCodeText}>
              {referral_code ? referral_code : ''}
            </Text>
          </View>
        </View>

        <View style={styles.submitBtnWrap}>
          <Button
            color={Colors.white}
            style={[styles.submitBtn]}
            textStyle={styles.submitBtnText}
            onPress={() => onShare()}>
            {strings.SHARE.toUpperCase()}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
