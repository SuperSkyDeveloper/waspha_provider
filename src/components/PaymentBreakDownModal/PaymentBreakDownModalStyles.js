import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    // backgroundColor: Colors.background.primary,
  },

  imageSelectorWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  linearWrap: {
    ...AppStyles.flex,

    paddingVertical: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusMedium,
  },

  headWrap: {marginBottom: Metrics.mediumBaseMargin, alignItems: 'center'},
  headText: {
    fontSize: Fonts.size.large,
    color: Colors.text.secondary,
  },
  contentSec: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    marginBottom: Metrics.baseMargin,
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  circleStyle: {
    borderRadius: 50,
    width: 17,
    height: 17,
    marginRight: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
  },

  textStyle: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.secondary,
  },

  totalAmountWrap: {
    opacity: 0.8,
    marginLeft: Metrics.mediumBaseMargin,
    borderTopWidth: 0.8,
    borderTopColor: Colors.border.quaternary,
  },
  toBePaidWrap: {
    marginLeft: Metrics.mediumBaseMargin,
    opacity: 0.8,
    marginLeft: Metrics.mediumBaseMargin,
    borderTopWidth: 0.8,
    borderTopColor: Colors.border.quaternary,
  },

  btnWrap: {
    marginTop: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin,
  },
  btnStyle: {
    backgroundColor: Colors.button.octa,
    borderRadius: Metrics.borderRadius,
  },

  btnTextStyle: {
    fontSize: Fonts.size.large,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },
});
