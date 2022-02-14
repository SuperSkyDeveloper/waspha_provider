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
import styles from './TermsAndConditionStyles';
import {strings} from '../../constants';
import {Colors, Fonts, AppStyles, Images, Metrics} from '../../theme';
import HTML from 'react-native-render-html';
import util from '../../util';

export default function TermsAndConditionView(props) {
  const {termsAndCondition, loading} = props;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={strings.TERMS_CONDITIONS}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <ScrollView
        style={styles.policySec}
        contentContainerStyle={
          _.isEmpty(termsAndCondition) && styles.noPolicyFoundStyle
        }
        showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.loaderWrap}>
            <Loader loading={loading} />
          </View>
        )}
        {!loading && (
          <>
            {!_.isEmpty(termsAndCondition) ? (
              <View style={AppStyles.mBottom30}>
                <HTML
                  source={{html: termsAndCondition}}
                  tagsStyles={{
                    p: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h1: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h2: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h3: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h4: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    h5: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    li: util.isRTL() && {textAlign: 'right', marginTop: 5},
                    ui: util.isRTL() && {textAlign: 'right', marginTop: 5},
                  }}
                />
              </View>
            ) : (
              <View>
                <Text
                  color={Colors.text.primary}
                  type="semiBold"
                  size={Fonts.size.medium}>
                  {strings.DATA_NOT_FOUND}
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
