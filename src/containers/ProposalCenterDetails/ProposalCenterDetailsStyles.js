import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  align: {
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
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
  horizontalLine: {
    marginTop: Metrics.xsmallMargin - 1,
    width: '100%',
    height: 1.4,
    backgroundColor: Colors.background.tertiary,
  },
  expiryDateTimeWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.baseMargin,
  },
  dateStyle: {
    width: '100%',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  dateIconStyle: {
    marginLeft: Metrics.baseMargin,
  },
  expiryTimeSec: {
    flexDirection: 'column',
    marginLeft: Metrics.baseMargin,
    width: 150,
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
  expiryTimeStyle1: {
    borderRadius: 1,
    borderWidth: 1.3,
    borderStyle: 'dashed',
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,
    marginBottom: Metrics.xsmallMargin,
    borderColor: Colors.border.primary,
    paddingTop: Metrics.xsmallMargin + 2,
    paddingBottom: Metrics.xsmallMargin + 2,
    marginRight: Metrics.mediumBaseMargin,
    marginBottom: Metrics.baseMargin,
  },
  textStyle: {
    color: Colors.text.hexa,
  },
  subheadStyle: {
    fontSize: Fonts.size.xSmall,
    marginTop: Metrics.baseMargin,
  },
  estimatedBillWrap: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.background.quaternary,
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  estimateBillTextStyle: {
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
    flex: 1,
    justifyContent: 'center',
  },
  espPriceTextStyle: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
  },
  espTextSecStyle: {
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin,
  },
  priceStyle: {
    alignSelf: 'center',
  },
  deliveryModeWrap: {
    flex: 1,
  },
  modeTextStyle: {
    fontSize: Fonts.size.small,
    marginBottom: Metrics.baseMargin,
  },
  OrderSec: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
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
  itemListStyle: {
    flex: 1,
    marginTop: Metrics.mediumBaseMargin,
  },
});
