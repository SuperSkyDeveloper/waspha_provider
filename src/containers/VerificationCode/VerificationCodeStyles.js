import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtnWrap: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    // todo ahsan
    marginTop: 90,
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
  wrap: {
    marginTop: Metrics.tripleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  resendWrap: {
    alignItems: 'flex-end',
  },
  resendWrapRtl: {
    alignItems: 'flex-start',
  },
  size: {},
  modalWrap: {
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadius,
  },
  optionWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Metrics.baseMargin,
  },
});
