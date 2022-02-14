import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  continueBtnWrap: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  gradBtn: {
    borderRadius: Metrics.borderRadius,
  },
  loginBtn: {
    height: 50,
  },
  mask2: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  wraper: {
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  showPwsdWrap: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  showPwsdWrapRtl: {
    left: 0,
  },
});
