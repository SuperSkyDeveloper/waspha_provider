import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  card: {
    marginTop: Metrics.doubleBaseMargin,

    flexDirection: 'row',

    backgroundColor: Colors.background.primary,

    paddingTop: Metrics.baseMargin,

    paddingBottom: Metrics.mediumBaseMargin,

    paddingLeft: Metrics.doubleBaseMargin,

    paddingRight: Metrics.baseMargin,
    marginLeft: Metrics.mediumBaseMargin,

    marginRight: Metrics.mediumBaseMargin,

    marginBottom: Metrics.mediumBaseMargin,

    //shadow
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  cardTwoSec: {
    marginTop: Metrics.mediumBaseMargin,
    flex: 3,
  },

  riderImageWrap: {
    borderRadius: Metrics.borderRadiusXXLarge,
  },

  riderImageWrapRtl: {
    alignItems: 'flex-end',
  },
  riderImage: {
    width: 65,
    height: 65,
    borderRadius: Metrics.borderRadiusXXLarge,
  },

  riderNameWrap: {
    marginBottom: Metrics.xsmallMargin,
  },

  riderNameText: {
    fontSize: Fonts.size.xSmall,

    opacity: 0.6,
    fontWeight: 'bold',
  },
  bikeWrap: {
    position: 'absolute',
    top: 43,
    bottom: 0,
  },
  bikeImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  riderRatingWrap: {
    flexDirection: 'row',
  },

  driverCircularWrap: {
    position: 'absolute',
    bottom: 0,
  },
  driverCircularWrapRtl: {
    transform: [{scaleX: -1}],
  },

  starIconStyle: {
    width: 15,
    height: 15,
  },

  etaWrap: {
    marginRight: Metrics.smallMargin,
  },
  etaText: {
    fontSize: Fonts.size.xxSmall,

    fontWeight: 'bold',
    opacity: 0.6,
    color: Colors.text.primary,
  },
  contentSec: {
    marginTop: Metrics.screenHeight / 3,
    marginBottom: Metrics.tripleBaseMargin,
  },
  statusOptionText: {
    fontSize: Fonts.size.xxSmall,
    marginTop: Metrics.xsmallMargin,
    marginLeft: Metrics.smallMargin,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginRight: 30,
    width: '50%',
  },
  timeCard: {
    paddingVertical: Metrics.xsmallMargin,

    paddingRight: Metrics.smallMargin,

    paddingLeft: Metrics.baseMargin,

    flexDirection: 'row',
    backgroundColor: Colors.background.primary,

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
  timeWrap: {
    marginRight: Metrics.baseMargin,
  },
  tickImage: {
    marginTop: Metrics.xsmallMargin,

    marginLeft: Metrics.xsmallMargin,

    height: 14,
    width: 15,
  },
  ImageTextWrap: {
    flexDirection: 'row',
  },
  ImageTextWrapRtl: {
    flexDirection: 'row-reverse',
  },
  time: {
    fontSize: Fonts.size.xxxSmall,

    fontWeight: 'bold',
    opacity: 0.6,

    color: Colors.text.primary,
  },
  ampm: {
    fontSize: Fonts.size.xxxSmall,

    fontWeight: 'bold',
    opacity: 0.6,

    color: Colors.black,
  },

  itemCollectWrap: {
    marginTop: Metrics.smallMargin,
  },

  itemCollect: {
    fontSize: Fonts.size.font14,
    fontWeight: 'bold',
    color: Colors.black,
    opacity: 0.6,
  },
  itemsCollectWraps: {
    marginRight: Metrics.doubleBaseMargin,
  },
  itemsCollect: {
    fontSize: Fonts.size.xxxxSmall,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },

  orderstatusWrap: {
    alignItems: 'center',
  },

  orderstatusText: {
    fontSize: Fonts.size.xSmall,

    color: Colors.text.primary,
  },
  dateWrap: {
    backgroundColor: Colors.white,

    borderRadius: Metrics.borderRadius,

    marginTop: -Metrics.smallMargin,

    marginBottom: Metrics.baseMargin,
  },

  dateImage: {
    marginLeft: Metrics.baseMargin,
    width: 10,
    height: 10,
  },

  statusOptionIconWrap: {
    borderRadius: Metrics.borderRadiusXXLarge,

    borderColor: Colors.border.tertiary,

    height: 28,
    width: 28,

    marginLeft: -Metrics.baseMargin,

    borderWidth: 3,

    backgroundColor: Colors.background.primary,
  },

  statusOptionIconWrapRtl: {
    marginRight: -Metrics.baseMargin,
  },

  statusOptionIconRtl: {
    marginRight: -Metrics.baseMargin - 2,
  },

  statusOptionWrap: {
    flex: 1,

    paddingHorizontal: Metrics.doubleMediumBaseMargin,

    marginTop: Metrics.doubleBaseMargin,

    justifyContent: 'space-between',
  },

  dateIconStyle: {
    marginLeft: Metrics.baseMargin,
  },
  dateStyle: {
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin,
  },

  statusWrap: {
    borderLeftColor: Colors.border.tertiary,
    borderLeftWidth: 3,
    paddingBottom: Metrics.baseMargin,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusWrapRtl: {
    flexDirection: 'row-reverse',
    borderRightColor: Colors.border.tertiary,
    borderRightWidth: 3,
    borderLeftWidth: 0,
  },

  timeWrap: {
    top: -20,
    borderWidth: 1,
    paddingVertical: Metrics.xsmallMargin,
    marginRight: Metrics.mediumBaseMargin,
    marginLeft: Metrics.mediumBaseMargin,
    borderStyle: 'dashed',
    borderRadius: Metrics.borderRadius,
  },

  timeText: {textAlign: 'center'},

  viewDetailsBtnWrap: {
    marginRight: Metrics.xsmallMargin,
  },

  viewDetailsTxt: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.xxSmall,
  },

  viewDetailsBtn: {
    backgroundColor: Colors.button.primary,
  },

  noBorder: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginLeft: 5,
  },
  backWrap: {
    width: 40,
    height: 40,
    backgroundColor: Colors.text.secondary,
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 40,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backWrapRtl: {
    left: 'auto',
    right: 20,
  },
  rtlImage: {
    transform: [{rotate: '-180deg'}],
  },
  bikeImageRtl: {
    transform: [{scaleX: -1}],
  },
});
