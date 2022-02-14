import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentSec: {
    flex: 1,
    paddingLeft: Metrics.doubleMediumBaseMargin,
    paddingRight: Metrics.mediumBaseMargin,

    borderTopLeftRadius: Metrics.borderRadiusXLarge,
    borderTopRightRadius: Metrics.borderRadiusXLarge,
  },

  card: {
    flexDirection: 'row',
  },
  riderImageWrap: {
    borderRadius: Metrics.borderRadiusXXLarge,
    overflow: 'hidden',
    width: 65,
    height: 65,
    borderRadius: Metrics.borderRadiusXXLarge,
  },

  riderImage: {
    width: 65,
    height: 65,
    borderRadius: Metrics.borderRadiusXXLarge,
    resizeMode: 'cover',
  },

  driverCircularWrap: {
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
  driverCircularWrapRtl: {
    transform: [
      {
        rotate: '100deg',
      },
    ],
  },
  bikeWrap: {
    position: 'absolute',
    left: 50,
    top: 43,
    bottom: 0,
    zIndex: 99999,
  },

  bikeWrapRtl: {
    left: -10,
    top: 38,
    transform: [{scaleX: -1}],
  },
  bikeImage: {
    height: 25,
    width: 25,
    zIndex: 999,
  },
  sheetSec2: {
    ...AppStyles.flex3,
  },
  timeText: {
    textAlign: 'center',
    color: Colors.text.secondary,
    marginBottom: Metrics.xsmallMargin,
  },
  contactIconsParent: {
    ...AppStyles.flexRow,
    justifyContent: 'center',
    marginBottom: Metrics.smallMargin,
  },
  contactIconWrap: {
    padding: Metrics.smallMargin,
    backgroundColor: Colors.button.octa,
  },

  contactIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },

  riderNameWrap: {
    marginTop: Metrics.xsmallMargin,
    marginBottom: Metrics.xsmallMargin,
  },

  riderNameText: {
    alignItems: 'center',

    fontSize: Fonts.size.xSmall,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },

  riderRatingWrap: {
    flexDirection: 'row',
  },

  starIconStyle: {
    width: 15,
    height: 15,
  },
  btnWrap: {
    backgroundColor: Colors.button.octa,
    borderRadius: Metrics.borderRadiusMidLarge,
  },
  confirmBtnText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.xSmall,
  },

  textStyle: {
    color: Colors.text.secondary,
  },

  timeWrap: {
    marginTop: Metrics.smallMargin,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: Colors.border.secondary,
    borderStyle: 'dashed',
    padding: Metrics.xsmallMargin,
  },
  imageBg: {
    position: 'absolute',
  },
  takeUpper: {
    zIndex: 9,
  },
});
