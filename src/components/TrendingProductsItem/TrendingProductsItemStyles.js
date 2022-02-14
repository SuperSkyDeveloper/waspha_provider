import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  horizontalWrp: {
    minWidth: 320,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.xsmallMargin,
  },
  trendingWrp: {
    marginVertical: Metrics.baseMargin,
  },

  shadowStyle: {
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

  trendImg: {
    width: '100%',
    minHeight: 148,
  },
  infoSec: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
  leftSec: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imgWrap: {
    flexDirection: 'row',
    marginRight: -Metrics.smallMargin,
  },
  badge1: {
    paddingVertical: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.smallMargin,
    borderRadius: Metrics.mediumBaseMargin,
    marginLeft: Metrics.smallMargin,
    marginTop: Metrics.xsmallMargin,
  },
  badge2: {
    backgroundColor: Colors.badge.primary,
    paddingVertical: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.smallMargin,
    borderRadius: Metrics.mediumBaseMargin,
    marginLeft: Metrics.xsmallMargin,
    marginTop: Metrics.xsmallMargin,
  },
  peoplesImgWrap: {
    width: 23,
    height: 23,
    borderColor: Colors.border.secondary,
    borderWidth: 3,
    resizeMode: 'contain',
    borderRadius: Metrics.borderRadiusXLarge,
    marginLeft: -Metrics.smallMargin,
  },
  peoplesImg: {
    width: '100%',
    height: '100%',
  },
  openBadge: {
    paddingVertical: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadius,
    position: 'absolute',
    top: 12,
    left: 10,
    zIndex: 999,

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
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.xsmallMargin,
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 999,

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
  starImg: {
    width: 9,
    height: 9,
    marginRight: Metrics.xsmallMargin,
  },
  leftTextStyle: {maxWidth: 140},
});
