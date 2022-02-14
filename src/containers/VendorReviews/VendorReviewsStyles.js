import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  reviewsWrap: {
    marginTop: Metrics.mediumBaseMargin,
  },
  ratingSec: {
    paddingHorizontal: Metrics.mediumBaseMargin,
    backgroundColor: Colors.white,
    marginBottom: Metrics.small,
    marginTop: Metrics.baseMargin,
  },
  wrap: {
    ...AppStyles.flexRow,
    ...AppStyles.mBottom30,
    alignItems: 'center',
  },
});
