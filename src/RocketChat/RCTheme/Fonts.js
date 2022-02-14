// @flow

import {Platform} from 'react-native';

const type = {
  /* base: "ParalucentText-Book",
  medium: "Paralucent-Medium" */
  base: Platform.select({
    ios: 'Montserrat-Regular',
    android: 'Montserrat-Regular',
  }),

  bold: Platform.select({
    ios: 'Montserrat-Bold',
    android: 'Montserrat-Bold',
  }),

  italic: Platform.select({
    ios: 'Montserrat-Italic',
    android: 'Montserrat-Italic',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxSmall: 10,
  xxxSmall: 11,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  normal: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,
  //
  font9: 9,
  font10: 10,
  font11: 11,
  font12: 12,
  font13: 13,
  font14: 14,
  font15: 15,
  font16: 16,
  font17: 17,
  font18: 18,
  font20: 20,
  font22: 22,
  font24: 24,
  font26: 26,
  font30: 30,
  font32: 32,
  font36: 36,
  font38: 38,
  font46: 46,
  font48: 48,
  font50: 50,
};

export default {
  type,
  size,
};
