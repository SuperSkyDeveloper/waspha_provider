import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, AppStyles} from '../../theme';
import {MESSAGE_TYPES} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  bgImage: {
    width: '100%',
    minHeight: 289,
  },

  backBtnStyle: {
    top: 45,
    left: 20,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },

  backWrapRtl: {
    top: 35,
    right: 40,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    flexDirection: 'row-reverse',
  },

  contactUsTextStyle: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.xxLarge,
  },
  contactUsTextWrap: {
    alignSelf: 'center',
    padding: Metrics.baseMargin,
    marginTop: Metrics.doubleMediumBaseMargin,
  },
  cardWrap: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    borderTopColor: Colors.text.secondary,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,

    borderRadius: Metrics.borderRadiusMedium,
    marginTop: -(Metrics.tripleMediumBaseMargin + 20),
  },
  imgStyle: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: Metrics.mediumBaseMargin,
  },
  inputFieldsStyle: {
    marginRight: Metrics.doubleMediumBaseMargin,
    marginLeft: Metrics.doubleMediumBaseMargin,
    flex: 1,
    flexDirection: 'column',
  },
  subjectFieldStyle: {
    ...AppStyles.mTop30,
  },
  submitBtnWrap: {
    marginTop: Metrics.tripleBaseMargin,
    marginBottom: Metrics.tripleBaseMargin,
  },
  submitBtnText: {
    fontSize: Fonts.size.small,
    color: Colors.text.secondary,
  },
  submitBtn: {
    height: 50,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.button.primary,
  },
});
