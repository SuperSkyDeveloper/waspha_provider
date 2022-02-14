import {StyleSheet} from 'react-native';
import {AppStyles, Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  reasonSecWrap: {
    flex: 1,
    flexDirection: 'row',
    ...AppStyles.mTop20,
    marginRight: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
  },
  imageStyle: {
    ...AppStyles.mTop10,
  },
  otherReasonWrap: {
    height: 100,
    marginRight: Metrics.mediumBaseMargin,
    borderColor: Colors.border.accent,
  },
  otherReasonText: {
    fontSize: Fonts.size.xxSmall,
    padding: Metrics.baseMargin,
  },
});
