import { StyleSheet } from 'react-native';
import { AppStyles, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  quantitySec: {
    borderRadius: Metrics.borderRadiusMedium,
    borderWidth: 1,
    backgroundColor: Colors.background.tertiary,
    flexDirection: 'row',
    ...AppStyles.paddingVerticalBase,
    ...AppStyles.mTop10
  },

  roundBtnStyle: {
    width: 20,
    height: 20,
    borderRadius: Metrics.borderRadiusLarge,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.button.secondary,
  },

  darkRoundBtn: {
    backgroundColor: Colors.button.secondary,
    opacity: 0.3,
  },

  decrementRoundBtnWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: Metrics.smallMargin,
  },
  incrementRoundBtnWrap: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: Metrics.smallMargin,
  },
  quantityWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkStyle: {
    opacity: 0.88,
    backgroundColor: Colors.background.tertiary,
  },
});
