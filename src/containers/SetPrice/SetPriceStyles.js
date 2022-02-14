import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentSec: {
    flex: 1,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  textParent: {
    flexDirection: 'row',
    marginTop: Metrics.tripleBaseMargin,
    justifyContent: 'space-between',
  },
  labelStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    marginBottom: Metrics.smallMargin,
    fontWeight: 'bold',
  },

  inputWrap: {
    flex: 1,
  },
  textInput: {
    textAlign: 'center',
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.secondary,
    backgroundColor: Colors.button.tertiary,
    borderRadius: Metrics.borderRadiusXLarge,
    height: 36,
  },

  textStyle: {
    textAlign: 'center',
    color: Colors.text.secondary,
    backgroundColor: Colors.button.tertiary,
    borderRadius: Metrics.borderRadiusXLarge,
    height: 36,
    width: 130,
  },

  dateTextWrap: {
    marginLeft: Metrics.mediumBaseMargin,
    marginTop: Metrics.smallMargin,
    color: Colors.text.secondary,
  },
  timeIconStyle: {
    position: 'absolute',
    bottom: 14,
    left: 10,
    zIndex: 999,
    width: 11,
    height: 11,
  },

  btnWrap: {
    ...AppStyles.flex,
    marginHorizontal: Metrics.tripleBaseMargin,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.tripleBaseMargin,
    borderRadius: Metrics.borderRadius,
    overflow: 'hidden',
  },
  btn1Style: {
    paddingVertical: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.button.primary,
  },
  btn1Text: {
    fontSize: Fonts.size.xSmall,
  },
});
