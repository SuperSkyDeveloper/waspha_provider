import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';
import {MESSAGE_TYPES} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtnWrap: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  gradBtn: {
    borderRadius: Metrics.borderRadiusMedium,
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
    paddingHorizontal: Metrics.tripleBaseMargin,
  },
  showPwsdWrap: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  radioBtn: {
    position: 'absolute',
    left: -60,
    top: -27,
    padding:29
  },
  radioBtnTwo: {
    position: 'absolute',
    left: -60,
    top: -27,
    padding:29
  },
  radioBtnStyle: {
    width: 19,
    height: 19,
  },
  radio: {
    width: 16,
    height: 16,
    borderColor: Colors.black,
    borderWidth: 2,
    marginTop: Metrics.xsmallMargin,
    borderRadius: Metrics.borderRadiusXLarge,
  },
  activeRadio: {
    width: 16,
    height: 16,
    borderColor: Colors.black,
    borderWidth: 2,
    marginTop: Metrics.xsmallMargin,
    borderRadius: Metrics.borderRadiusXLarge,
    backgroundColor: Colors.black,
  },
  recoverPassViewStyle: {
    alignItems: 'center',
    marginTop: Metrics.xsmallMargin,
  },
  recoverPassTextStyle: {
    color: Colors.text.quaternary,
    fontSize: Fonts.size.xxxSmall,
  },
});
