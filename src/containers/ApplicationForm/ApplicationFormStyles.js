import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  deliveryRange: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.doubleBaseMargin,
  },

  categoryName: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
  },
  radioFormStyle: {
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Metrics.doubleBaseMargin,
  },
  timings: {
    marginTop: Metrics.doubleBaseMargin,
  },
  radioBtn: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: Colors.button.quaternary,
    borderRadius: Metrics.borderRadiusXXLarge,
  },
  btnWrapNewProviderType: {
    marginTop: Metrics.doubleBaseMargin,
  },

  newProviderTypeBtn: {
    height: 40,
    marginTop: Metrics.doubleBaseMargin,
  },

  submitBtnWrap: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.tripleBaseMargin,
  },
  btnWrap: {
    marginTop: Metrics.doubleBaseMargin,
  },
  uploadDocumentBtn: {
    height: 50,
  },
  paddingHr: {paddingHorizontal: Metrics.tripleBaseMargin},

  radioBtnTwo: {
    position: 'absolute',
    left: -24,
    top: 16,
  },
  wraper: {
    paddingHorizontal: Metrics.mediumBaseMargin,
  },
  havingProblemSec: {
    flexDirection: 'row',
    marginTop: Metrics.xsmallMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addShiftWrap: {
    flexDirection: 'column',
    width: 100,
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.doubleMediumBaseMargin,
  },

  horizontalLine: {
    width: '66%',
    height: 1,
    backgroundColor: Colors.text.accent,
    marginTop: Metrics.smallMargin,
  },

  phoneNumberInput: {
    borderWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.mediumBaseMargin,
    fontSize: Fonts.size.xxSmall,
    borderBottomColor: Colors.text.quaternary,
    color: Colors.black,
  },

  phoneNumTextStyle: {
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.xsmallMargin,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  phoneInputWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deliveryRangeInputWrap: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'flex-end',
  },
  deliveryRangeInputErrorStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  newProviderTypeWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 2,
    height: 40,
    backgroundColor: Colors.button.primary,
    alignItems: 'center',
  },
  disbleBtn: {
    backgroundColor: Colors.background.seca,
  },
  plusIconStyle: {
    ...AppStyles.mLeft20,
  },
  uploadDocImage: {
    resizeMode: 'contain',
    marginRight: Metrics.xsmallMargin,
  },
  viewWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: Metrics.borderRadius,
    height: 50,
    backgroundColor: Colors.button.primary,
    alignItems: 'center',
  },
  docImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 5,
    flexDirection: 'row',
    borderRadius: 20,
  },
  submitBtn: {
    height: 50,
  },

  helpIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 1,
  },
  // modal

  modalWrap: {
    borderRadius: Metrics.borderRadiusMidLarge,
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
  },
  listWrap: {
    marginTop: Metrics.baseMargin,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: 47,
    height: 36,
    position: 'absolute',
    right: 1,
    top: 3,
  },
  modal: {
    top: 50,
  },
  reportBtn: {
    top: 15,
    marginBottom: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusMidLarge,
  },
  modalHeader: {
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
  documentUploader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  wrapper: {
    flexDirection: 'row',
  },

  preperationInput: {
    width: 75,
    height: 40,
    fontSize: Fonts.size.xxSmall,
  },
  inputWrap: {
    marginLeft: 'auto',
  },
  inputWrapRtl: {
    marginLeft: 0,
  },
  alignLeft: {
    alignSelf: 'flex-end',
  },
  optionWrap: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderBottomColor: Colors.border.margin,
    borderBottomWidth: 1,
  },
  boxWrap: {
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: Metrics.baseMargin,
    justifyContent: 'center',
    paddingHorizontal: Metrics.smallMargin,
  },
  btnImage: {
    width: 8,
    height: 6,
    top: 18,
    position: 'absolute',
    right: 5,
    resizeMode: 'contain',
  },
  docWrap: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: Metrics.mediumBaseMargin,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.text.quaternary,
  },
  disblebg: {
    backgroundColor: Colors.background.secondary,
    paddingVertical: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.xsmallMargin,
  },
  profileImgWrap: {
    width: 98,
    height: 98,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 50,
    padding: 2,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  cameraIconWrap: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: Colors.white,
    padding: 10,
    zIndex: 999,
    borderRadius: 100,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  wrapCross: {
    zIndex: 999,
    position: 'absolute',
    top: -2,
    right: -10,
    ...AppStyles.mTop5,
    width: 23,
    height: 23,
    padding: 12,
    backgroundColor: Colors.background.primary,
    borderRadius: 30,
    marginRight: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageSize: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
