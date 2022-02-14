import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  wrap: {
    marginTop: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
  },
  searchWrap: {
    paddingRight: Metrics.mediumBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    paddingTop: Metrics.xsmallMargin,
  },

  headingWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Metrics.doubleBaseMargin,
    marginBottom: Metrics.mediumBaseMargin,
  },
  emptyComponent: {
    width: Metrics.screenWidth - 20,
  },
});
