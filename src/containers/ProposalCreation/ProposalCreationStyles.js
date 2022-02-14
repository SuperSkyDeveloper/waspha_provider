import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  setPriceWrap: {
    flex: 1,
    marginTop: Metrics.mediumBaseMargin,
    marginHorizontal: Metrics.mediumBaseMargin,
  },
  setPriceBtn: {backgroundColor: Colors.button.hepta},
  setPriceText: {color: Colors.text.secondary},

  deliveryTimeWrap: {
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.doubleBaseMargin,
    marginBottom: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.baseMargin,
    paddingVertical: Metrics.xsmallMargin,
    backgroundColor: Colors.label.primary,
    alignSelf: 'flex-end',
  },

  deliveryTime: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.secondary,
  },

  deliveryModeWrap: {
    flex: 1,
  },

  OrderSec: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },

  modeTextStyle: {
    fontSize: Fonts.size.small,
    maxWidth:"50%"
  },

  itemListStyle: {
    flex: 1,
    marginTop: Metrics.smallMargin,
  },

  newItemWrap: {
    marginHorizontal: Metrics.xsmallMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Metrics.borderRadiusMedium,
    borderWidth: 0.7,
    borderColor: Colors.border.primary,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
  },
  newItemText: {
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
  },
  circularPlusStyleWrap: {
    marginTop: Metrics.xsmallMargin,
  },
  circularPlusStyle: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },

  btnWrap: {
    ...AppStyles.flex,
    marginHorizontal: Metrics.tripleBaseMargin,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
  },
  btn1Style: {
    borderRadius: Metrics.borderRadius,

    backgroundColor: Colors.button.primary,
  },
  btn1Text: {
    fontSize: Fonts.size.normal,
    color: Colors.text.secondary,
  },

  expiryDateTimeWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.baseMargin,
  },
  expiryTimeSec: {
    flexDirection: 'column',
    marginLeft: Metrics.baseMargin,
    width: 150,
  },
  dateStyle: {
    width: '100%',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  dateIconStyle: {
    marginLeft: Metrics.baseMargin,
  },
  expiryTimeStyle: {
    borderColor: Colors.border.primary,
    borderRadius: Metrics.borderRadiusMedium,
    borderWidth: 1.56,
    borderStyle: 'dashed',
    paddingTop: Metrics.xsmallMargin + 2,
    paddingBottom: Metrics.xsmallMargin + 2,
    marginRight: Metrics.mediumBaseMargin,
    marginTop: Metrics.xsmallMargin,
  },
  addressSec: {
    marginTop: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    width: '98%',
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusMedium,
    marginLeft: Metrics.xsmallMargin,
  },
  shadowStyle: {
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
  },
  placeholderTextStyle: {
    color: Colors.text.primary,
    fontSize: Fonts.size.xSmall,
  },
  textStyle: {
    color: Colors.text.hexa,
  },
  subheadStyle: {
    fontSize: Fonts.size.xSmall,
    marginTop: Metrics.baseMargin,
  },
  align: {
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
  },
  textStyle: {
    ...AppStyles.mLeft5,
    color: Colors.text.hexa,
  },
  estimatedBillWrap: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.background.quaternary,
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.tripleBaseMargin,
    flex: 1,
    flexDirection: 'row',
  },
  estimateBillTextStyle: {
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    flex: 1,
  },
  espPriceTextStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  espTextSecStyle: {
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin,
  },
  priceStyle: {
    alignSelf: 'center',
    marginLeft: -Metrics.xsmallMargin,
    marginTop: -Metrics.xsmallMargin,
  },
  horizontalLine: {
    marginTop: Metrics.xsmallMargin - 1,
    width: '100%',
    height: 1.4,
    backgroundColor: Colors.background.tertiary,
  },
  timeWrap: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pickupTimeStyle: {
    borderColor: Colors.border.primary,
    borderRadius: 1,
    borderWidth: 1.3,
    borderStyle: 'dashed',
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    paddingTop: Metrics.xsmallMargin,
    paddingBottom: Metrics.xsmallMargin,
    marginBottom: Metrics.xsmallMargin,
  },

  wrapper: {
    marginTop: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },

  preperationInput: {
    width: 65,
    height: 40,
    fontSize: Fonts.size.xxSmall,
    textAlign: 'center',
  },
  inputWrap: {
    marginLeft: 'auto',
  },
  alignLeft: {
    marginLeft: Metrics.smallMargin,
  },
  wrapper: {
    flexDirection: 'row',
  },

  preperationInput: {
    width: 65,
    height: 37,
    fontSize: Fonts.size.xxSmall,
  },
  inputWrap: {
    marginLeft: 'auto',
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
    top:1,
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
});
