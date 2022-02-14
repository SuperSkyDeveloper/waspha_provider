import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  detailsWrap: {
    marginLeft: Metrics.doubleMediumBaseMargin,
  },
  listWrap: {
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    elevation: 10,
    backgroundColor: Colors.background.primary,
    height: 387,
  },
  contentSec: {
    ...AppStyles.mBottom50,
    ...AppStyles.mTop20,
  },
  valueSec: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Metrics.smallMargin,
  },
  imageStyle: {
    ...AppStyles.mTop15,
  },
  dateViewWrap: {
    marginLeft: Metrics.baseMargin,
  },
  dateStyle: {
    justifyContent: 'space-between',
    flex: 1,
    width: 220,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  textStyle: {marginRight: 80},
});
