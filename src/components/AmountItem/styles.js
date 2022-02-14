// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  reviewSec: {
    ...AppStyles.mTop10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.button.accent,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.smallMargin,
    borderRadius: 20,
  },
  arrow: {
    position: 'absolute',
    right: 10,
  },
  arrowRtl: {
    transform: [{rotate: '180deg'}],
  },
});
