import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  dashboardSec: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.mediumBaseMargin,
    borderTopLeftRadius: Metrics.borderRadiusMedium,
    borderTopRightRadius: Metrics.borderRadiusMedium,
    marginTop: -5,
  },
  deliverySec: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: -20,
  },
  optionSec: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
  },
  OrderSec: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
});
