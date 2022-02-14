import {StyleSheet} from 'react-native';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  titleWrap: {
    marginTop: Metrics.xsmallMargin,
    backgroundColor: Colors.background.primary,
    paddingVertical: Metrics.baseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border.peta,
    marginBottom: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.xsmallMargin,

    //// shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  editTitleWrap: {
    paddingVertical: Metrics.baseMargin,
  },
  iconStyle: {
    transform: [{rotate: '-180deg'}],
  },

  imageWrap: {
    height: 126,
    width: 126,
    ...AppStyles.alignItemsCenter,
  },

  remarkImageWrap: {
    height: 60,
    width: 120,
    marginBottom: Metrics.xsmallMargin,
  },

  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  optionWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  option: {
    width: 19,
    height: 19,
    backgroundColor: Colors.lightRaven,
    borderRadius: Metrics.borderRadiusXLarge,

    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Metrics.smallMargin,
  },

  accordionSec: {
    backgroundColor: Colors.white,
    paddingLeft: Metrics.xsmallMargin,

    paddingRight: Metrics.baseMargin,

    paddingTop: Metrics.baseMargin,

    paddingBottom: Metrics.mediumBaseMargin,

    marginHorizontal: Metrics.smallMargin - 3, // Need to set this and use Metrics here

    marginBottom: Metrics.baseMargin,

    borderRadius: Metrics.borderRadius,

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

  bodyWrap: {
    flexDirection: 'row',
  },

  leftSec: {
    flex: 1.3,
  },
  rightCol: {
    flex: 2,
  },

  contentWrap: {
    flex: 2,
  },

  quantityWrap: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: Metrics.mediumBaseMargin,
    marginLeft: Metrics.smallMargin,
  },

  leftRemarksSecWrap: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: Metrics.mediumBaseMargin,
    marginLeft: Metrics.baseMargin,
  },

  imageUploadWrap: {},
  submitBtnWrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: Colors.button.quaternary,
    paddingVertical: Metrics.smallMargin,
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
  },

  submitBtnText: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
  },

  inputField: {
    flex: 1,
    fontSize: Fonts.size.xxSmall,
    fontWeight: 'bold',
    minWidth: '50%',
    height: 35,
  },
  inputFieldDescription: {
    flex: 1,
    fontSize: Fonts.size.xxSmall,
    fontWeight: 'bold',
    minWidth: '50%',
    height: 65,
    textAlignVertical: 'top',
  },

  labelStyle: {
    fontSize: Fonts.size.large,
    opacity: 0.8,
    color: Colors.text.primary,
  },
  errorText: {
    justifyContent: 'flex-start',
    marginLeft: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    fontSize: Fonts.size.xxSmall,
  },
  errorBorder: {
    borderWidth: 2,
    borderColor: Colors.border.error,
  },
  priceQtyWrap: {
    ...AppStyles.mLeft15,
    ...AppStyles.mBottom10,
  },
  priceAndQty: {
    fontSize: Fonts.size.xSmall,
  },
  priceWrap: {
    flexDirection: 'row',
  },
  priceAndQtyText: {
    fontSize: Fonts.size.small,
    color: Colors.text.quaternary,
  },
  amount: {
    fontSize: Fonts.size.small,
  },

  crossBtnWrap: {
    height: 35,
    width: 35,
    left: -15,
  },

  removeItemButton: {
    backgroundColor: Colors.background.hepta,
    height: 26,
    width: 26,
    borderRadius: Metrics.borderRadiusXLargeMedium,
    alignSelf: 'center',
    marginTop: 6, //use of metrics is not creating good view
  },
  crossTextStyle: {
    color: Colors.text.secondary,
  },
});
