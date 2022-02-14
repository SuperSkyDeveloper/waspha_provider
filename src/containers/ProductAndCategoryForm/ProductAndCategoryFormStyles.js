import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  contentSec: {paddingHorizontal: Metrics.mediumBaseMargin},

  inputStyle: {
    fontSize: Fonts.size.xxxSmall,
    opacity: 0.77,
  },
  inputWrap: {
    paddingTop: Metrics.doubleMediumBaseMargin,
    backgroundColor: Colors.background.primary,
  },

  labelStyle: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.primary,
    fontWeight: '500',
    marginBottom: Metrics.baseMargin,
    textAlign: util.rtlRightText(),
  },
  categoryWrap: {
    ...AppStyles.flexRow,
    marginTop: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,

    paddingLeft: Metrics.baseMargin,
    height: 50,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 5,
  },

  addressInputWrap: {
    paddingTop: Metrics.baseMargin,
    textAlignVertical: 'top',

    paddingLeft: Metrics.baseMargin,
    height: 140,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  submitBtnWrap: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
  },
  submitBtn: {
    height: 50,
    borderRadius: Metrics.borderRadiusMedium,
    marginBottom: Metrics.tripleBaseMargin,
  },

  submitBtnText: {
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
  },
  changeTextWrap: {
    flex: 1,
    alignSelf: 'flex-end',
    marginRight: Metrics.doubleBaseMargin,
  },
  changeTextStyle: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.reca,
  },

  lineStyle: {
    top: 1,
    borderTopColor: Colors.text.reca,
    borderTopWidth: 0.56,
  },

  btnWrap: {
    marginTop: Metrics.doubleBaseMargin,
  },

  paddingHr: {paddingHorizontal: Metrics.mediumBaseMargin},

  viewWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: Metrics.borderRadiusMedium,
    height: 50,
    // backgroundColor: Colors.button.primary,
    backgroundColor: Colors.button.secondary,
    alignItems: 'center',
  },

  uploadDocImage: {
    resizeMode: 'contain',
  },
  prdImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    overflow: 'hidden',
  },
  featureSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.mediumBaseMargin,
  },
  tabWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    borderWidth: 1,
    borderColor: Colors.button.octa,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    borderRadius: Metrics.borderRadius,
    marginHorizontal: Metrics.smallMargin,
  },
  activeTab: {
    backgroundColor: Colors.button.octa,
  },

  //date time

  dateTimeItemWrap: {
    borderRadius: 10,
    borderColor: Colors.resolutionBlue,
    paddingLeft: 32,
    borderWidth: 1,
    paddingRight: 33,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 20,
    marginTop: Metrics.mediumBaseMargin,
    flex: 1,
  },
  dateTimeText: {
    fontSize: Fonts.size.font16,
    color: Colors.bluishPurple,
    flex: 3,
    marginTop: -4,
    marginLeft: 10,
  },

  calendarStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.resolutionBlue,
  },
  dropDownArrowStyle: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginTop: 3,
    tintColor: Colors.resolutionBlue,
  },
  richInputStyle: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,

    marginTop: 10,

    color: Colors.shark,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 0,
    elevation: 5,
  },
});
