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
import styles from './GDPRComplianceStatementStyles';
import {strings} from '../../constants';
import {Colors, Fonts, AppStyles, Images, Metrics} from '../../theme';
import HTML from 'react-native-render-html';
import util from '../../util';

export default function GDPRComplianceStatementView(props) {
  const {GDPRComplianceStatement, loading} = props;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.GDPR_COMPLIANCE_STATEMENT}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView
        style={styles.policySec}
        contentContainerStyle={
          _.isEmpty(GDPRComplianceStatement) && styles.noPolicyFoundStyle
        }
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loaderWrap}>
            <Loader loading={loading} />
          </View>
        ) : (
          [
            !_.isEmpty(GDPRComplianceStatement) ? (
              <View style={AppStyles.mBottom30}>
                <HTML
                  source={{html: GDPRComplianceStatement}}
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
                  {strings.NO_GDPR_COMPLIANCE_STATEMENT_FOUND}
                </Text>
              </View>
            ),
          ]
        )}
      </ScrollView>
    </View>
  );
}
