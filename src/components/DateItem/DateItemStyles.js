import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  dateWrap: {
    backgroundColor: Colors.background.primary,
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: Metrics.borderRadius,
    margin: Metrics.xsmallMargin,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 9,
  },
  imageStyleRtl: {
    marginLeft: 'auto',
    marginRight: Metrics.mediumBaseMargin,
  },
});
