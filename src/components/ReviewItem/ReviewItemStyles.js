import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  review: {
    flexDirection: 'row',
    paddingBottom: Metrics.mediumBaseMargin,
    marginBottom: Metrics.mediumBaseMargin,
  },
  profileImg: {
    width: 52,
    height: 52,
    borderRadius: 30,
    resizeMode: 'cover',
    overflow: 'hidden',
    ...AppStyles.mRight5,
  },
  startImg: {
    width: 13,
    height: 13,
    marginRight: 1,
  },
});
