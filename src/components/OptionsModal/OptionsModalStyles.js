import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  modalStyle: {
    borderRadius: Metrics.borderRadiusMidLarge,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
  },
  headTextWrap: {
    alignItems: 'center',
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleMediumBaseMargin,
    marginRight: Metrics.doubleBaseMargin,
  },
  headerText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.large,
  },

  optionItem: {
    ...AppStyles.flexRow,
    marginBottom: Metrics.doubleBaseMargin,
    marginLeft: Metrics.mediumBaseMargin,
  },

  optionIconStyle: {height: 21, width: 21, marginRight: Metrics.baseMargin,tintColor:Colors.white},

  optionText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.normal,
  },
  radioBtn: {
    borderColor: Colors.border.peta,
    opacity: 0.5,
    borderWidth: 3,
    borderRadius: Metrics.borderRadiusXXLarge,
    height: 25,
    width: 25,
    marginRight: Metrics.mediumBaseMargin,
  },

  activeRadioBtn: {
    opacity: 0.7,
    borderRadius: Metrics.borderRadiusXXLarge,
    borderColor: Colors.border.peta,
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: Metrics.xsmallMargin,
    backgroundColor: Colors.border.peta,
    height: 13,
    width: 13,
  },

  btnWrap: {
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.baseMargin,
  },

  btnStyle: {
    marginTop: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.octa,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },
});
