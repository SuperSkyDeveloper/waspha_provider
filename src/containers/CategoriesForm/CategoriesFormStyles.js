import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  categoryWrap: {
    flex: 1,

    marginTop: Metrics.mediumBaseMargin,
    marginLeft: Metrics.baseMargin,
  },

  dash: {
    ...AppStyles.flexRow,
  },
  categoryContainer: {
    borderLeftWidth: 1,
    borderLeftColor: 'red',
  },
  categoryContainerRtl: {
    paddingLeft: 10,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderRightColor: 'red',
  },
  categoryStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Metrics.smallMargin,
  },

  line: {
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.border.primary,
  },

  categoryText: {
    fontSize: Fonts.size.medium,
  },

  searchWrap: {
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.smallMargin,
    paddingRight: Metrics.mediumBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    paddingTop: Metrics.xsmallMargin,
  },
});
