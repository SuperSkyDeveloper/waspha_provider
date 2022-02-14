import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  hLine: {
    marginHorizontal: Metrics.smallMargin,
    borderBottomColor: Colors.border.hepta,
    borderBottomWidth: 0.5,
  },

  iconStyle: {
    transform: [{rotate: '-180deg'}],
  },

  questionText: {
    marginLeft: Metrics.smallMargin,
    maxWidth: Metrics.screenWidth - 70,
    fontSize: Fonts.size.xxSmall,
  },

  descText: {
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
  },

  icon: {marginTop: Metrics.smallMargin, marginLeft: Metrics.smallMargin},

  spacing: {
    paddingVertical: Metrics.mediumBaseMargin,
    marginLeft: Metrics.smallMargin,

    flexDirection: 'row',
  },
  arrow: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 45,
    top: 20,
  },
  idTextStyle: {marginLeft: Metrics.xsmallMargin, fontSize: Fonts.size.xxSmall},
});
