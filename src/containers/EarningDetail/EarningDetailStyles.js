import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  dashboardSec: {
    backgroundColor: Colors.background.primary,
    // paddingHorizontal: Metrics.mediumBaseMargin,
    borderTopLeftRadius: Metrics.borderRadiusMedium,
    borderTopRightRadius: Metrics.borderRadiusMedium,
  },
  deliverySec: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: -22,
  },

  optionSec: {
    marginTop: Metrics.doubleBaseMargin,
  },
  OrderSec: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  amountWrap: {
    paddingHorizontal: Metrics.mediumBaseMargin,
    marginTop: Metrics.baseMargin,
  },
  chartWrap: {
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.smallMargin,
  },
});
