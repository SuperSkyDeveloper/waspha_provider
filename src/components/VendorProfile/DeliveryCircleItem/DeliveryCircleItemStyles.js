import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../../theme';

export default StyleSheet.create({
  deliveryCircle: {
    backgroundColor: Colors.background.hexa,
    width: 55,
    height: 55,
    borderRadius: Metrics.borderRadiusXLarge + 10,
    borderWidth: 2,
    borderColor: Colors.border.secondary,
    alignItems: 'center',
    justifyContent: 'center',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  mtop2: {
    marginTop: Metrics.xsmallMargin - 2,
  },
  unSelectedInnerSec: {
    backgroundColor: Colors.background.seca,
    borderWidth: 0,
  },
});
