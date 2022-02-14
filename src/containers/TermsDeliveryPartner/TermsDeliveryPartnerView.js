import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Text, CustomNavbar, Loader} from '../../components';
import styles from './TermsDeliveryPartnerStyles';
import {strings} from '../../constants';
import {Colors, Fonts, AppStyles, Images, Metrics} from '../../theme';
import HTML from 'react-native-render-html';
import util from '../../util';

export default function TermsDeliveryPartnerView(props) {
  const {termsDelveryPartner, loading} = props;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.TERMS_DELIVERY_PARTNER}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView
        style={styles.policySec}
        contentContainerStyle={
          _.isEmpty(termsDelveryPartner) && styles.noPolicyFoundStyle
        }
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loaderWrap}>
            <Loader loading={loading} />
          </View>
        ) : (
          [
            !_.isEmpty(termsDelveryPartner) ? (
              <View style={AppStyles.mBottom30}>
                <HTML
                  source={{html: termsDelveryPartner}}
                  tagsStyles={{
                    p: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h1: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h2: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h3: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h4: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h5: util.isRTL() && {textAlign: 'right', marginTop: 5},
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  marginTop: Metrics.doubleBaseMargin,
                }}>
                <Text
                  color={Colors.emperor}
                  type="semiBold"
                  size={Fonts.size.xxxLarge}>
                  {strings.NO_TERMS_DELIVERY_PARTNER_FOUND}
                </Text>
              </View>
            ),
          ]
        )}
      </ScrollView>
    </View>
  );
}
