import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  imageSelectorWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  linearWrap: {
    ...AppStyles.flex,

    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusLarge,
  },

  titleWrap: {
    alignSelf: 'center',
    paddingLeft: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },

  titleStyle: {
    fontSize: Fonts.size.large,
    color: Colors.text.secondary,
  },
  btnSec: {
    flexDirection: 'row',
    paddingBottom: Metrics.baseMargin,
  },
  btnWrap: {
    ...AppStyles.flex,
    marginRight: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
  },
  btn1Text: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.secondary,
  },

  btn2Text: {
    fontSize: Fonts.size.xSmall,

    color: Colors.text.primary,
  },

  btn1Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.button.accent,
  },

  btn2Style: {
    borderRadius: Metrics.borderRadiusMedium,

    backgroundColor: Colors.button.hexa,
  },
  modal: {
    alignItems: 'center',
    margin: 20,
  },
});
