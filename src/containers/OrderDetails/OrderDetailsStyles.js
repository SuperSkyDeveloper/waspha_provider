import {StyleSheet} from 'react-native';
import {Metrics, Colors, AppStyles, Fonts, Images} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentSec: {
    ...AppStyles.flex,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  textStyle: {
    color: Colors.text.primary,
  },
  mainheadStyle: {
    fontSize: Fonts.size.medium,
  },

  timeWrap: {
    alignItems: 'flex-end',
    flex: 1,
  },
  timeWrapRtl: {
    alignItems: 'flex-start',
    flex: 1,
  },
  subheadStyle: {
    marginLeft: Metrics.smallMargin,
    fontSize: Fonts.size.xSmall,
  },

  placeholderTextStyle: {
    color: Colors.text.quaternary,
    fontSize: Fonts.size.xSmall,
  },
  orderCodeSec: {
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusMedium,
  },

  spacing: {
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },

  userDetailsSec: {
    marginTop: Metrics.baseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
    backgroundColor: Colors.background.primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  addressSec: {
    marginTop: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,

    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusMedium,
  },

  itemListStyle: {
    flex: 1,
    marginTop: Metrics.doubleBaseMargin,
    //need to change and use Metrics file here
    marginLeft: 12,
    marginRight: 12,
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

  deliveryTimeWrap: {
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingVertical: Metrics.xsmallMargin,
    backgroundColor: Colors.label.primary,
    marginRight: Metrics.xsmallMargin,
    marginBottom: Metrics.smallMargin,
  },

  deliveryTime: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.secondary,
  },
  btnSec: {
    marginTop: Metrics.doubleBaseMargin,
    flexDirection: 'row',
  },

  btnWrap: {
    flex: 1,
    marginRight: Metrics.xsmallMargin,
  },

  statusBtnWrap: {
    alignSelf: 'center',
    width: 270,
    ...AppStyles.mTop15,
  },

  btnStyle: {
    backgroundColor: Colors.button.primary,
  },

  btnTextStyle: {
    fontWeight: 'bold',
  },
  userInfoWrap: {
    flexDirection: 'row',
    ...AppStyles.mTop10,
    alignSelf: 'center',
  },
  userDetailsWrap: {
    ...AppStyles.mLeft10,
    ...AppStyles.mTop5,
  },
  circularImageWrap: {
    borderRadius: Metrics.borderRadiusXLargeMedium,
    height: 60,
    width: 60,
  },
  userProfileImage: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 60,
  },
  userContactWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    ...AppStyles.mTop10,
  },
  contactImage: {
    height: 35,
    width: 60,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.contactOptionsColor.enable,
  },
  disableContactImage: {
    height: 35,
    width: 60,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.contactOptionsColor.disable,
  },
  image: {
    ...AppStyles.mTop5,
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 25,
    width: 30,
  },
  deliveryModeTextStyle: {
    color: Colors.text.quaternary,
  },
  OrderSec: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  deliveryModeWrap: {
    flex: 1,
  },
  deliveryModeTextWrap: {
    marginLeft: Metrics.baseMargin,
  },
  modeTextStyle: {
    fontSize: Fonts.size.small,
    marginHorizontal: Metrics.smallMargin,
    color: Colors.text.quaternary,
  },
  deliveryModeSec: {
    marginLeft: Metrics.mediumBaseMargin,
    alignItems: 'center',
  },
  orderTypeWrap: {
    flex: 2.3,
    justifyContent: 'center',
  },
  assignedOrderTimeWrap: {
    borderRadius: Metrics.borderRadiusXXLarge,
    borderWidth: 2,
    height: 65,
    width: 65,
    borderColor: Colors.border.quaternary,
    borderStyle: 'dashed',
    marginRight: -Metrics.baseMargin,
  },
  timeTextWrap: {
    flex: 1,
    justifyContent: 'center',
    bottom: 2,
  },
  dateStyle: {
    width: '100%',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  dateIconStyle: {
    marginLeft: Metrics.baseMargin,
  },

  giftIconWrapStyle: {
    position: 'absolute',
    top: 26,
    marginTop: Metrics.baseMargin,
    alignSelf: 'flex-end',
    marginRight: Metrics.baseMargin,
  },
});
