import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  mainSec: {
    paddingTop: Metrics.tripleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },

  headerText: {
    color: Colors.white,
  },

  profilePic: {height: 120, width: 120},

  providerRatingWrap: {
    justifyContent: 'center',
    flex: 1,
    marginRight: Metrics.doubleBaseMargin,
    top: -5,
  },

  userRatingWrap: {
    justifyContent: 'center',
    flex: 1,
    top: -3,
  },

  starIcon: {height: 25, width: 25},

  backWrap: {
    position: 'absolute',
    left: 14,
    paddingRight: Metrics.doubleMediumBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
  },
});
