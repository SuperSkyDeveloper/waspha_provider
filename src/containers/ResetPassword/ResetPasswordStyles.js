import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  submitBtnWrap: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
  },

  submitBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.primary,
  },

  contentSec: {
    marginHorizontal: Metrics.mediumBaseMargin,
  },

  showPwsdWrap: {
    position: 'absolute',
    right: 10,
    top: util.isPlatformAndroid() ? 10 : 0,
  },
  showPwsdWrapRtl: {
    left: 0,
    width: '14%',
  },
});
