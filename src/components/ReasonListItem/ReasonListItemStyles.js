import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from './../../theme';

export default StyleSheet.create({
  list: {
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
  },
  checkImg: {
    marginRight: Metrics.baseMargin,
    ...AppStyles.mTop5,
    height: 21,
    width: 21,
  },
  text: {
    lineHeight: 16,
    flex: 1,
  },
});
