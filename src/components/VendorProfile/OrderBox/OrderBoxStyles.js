import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from './../../../theme';

export default StyleSheet.create({
  box: {
    minHeight: 145,
    width: 136,
    borderRadius: Metrics.borderRadiusMedium,
    alignItems: 'center',
    paddingTop: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.smallMargin,
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: -10,
    zIndex: 999,
  },

  checkedIconStyle: {
    position: 'absolute',
    right: 12,
    top: 10,
    zIndex: 999,
  },

  imageWrap: {
    height: 40,
    width: 60,
  },
  textWrap: {
    ...AppStyles.mTop10,
    flex: 1,
    flexDirection: 'column',
    height: 50,
  },
  imageStyle: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    tintColor: Colors.text.secondary,
  },
  subTitle: {
    top: -3,
  },
  boxWrap: {
    flex: 1,
    flexDirection: 'column',
  },
});
