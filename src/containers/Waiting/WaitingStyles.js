import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  memeSec: {
    alignItems: 'center',
  },
  textStyle: {
    marginTop: Metrics.smallMargin,
  },
  logoutBtnWrap: {
    marginVertical: Metrics.doubleBaseMargin,
  },
  gradBtn: {
    borderRadius: Metrics.smallMargin,
  },
  paddingHr: {
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  msgBox: {
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.background.primary,
    padding: Metrics.baseMargin,
    marginTop: Metrics.smallMargin + 8,
    borderRadius: Metrics.borderRadius,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  reloadImg: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
  },
  reloadImgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
  },
});
