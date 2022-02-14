import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  contentSec: {
    ...AppStyles.flexRow,
    paddingVertical: Metrics.smallMargin,
    paddingLeft: Metrics.baseMargin,
    marginLeft: Metrics.xsmallMargin,
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
  },

  imageWrap: {
    height: 80,
    width: 50,
    // ...AppStyles.alignItemsCenter,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  infoSec: {
    marginLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.smallMargin,
    flex: 1,
  },

  nameText: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.primary,
  },

  descText: {
    fontSize: Fonts.size.xxxxSmall,
    color: Colors.text.hexa,
  },

  shadowStyle: {
    backgroundColor: Colors.background.primary,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  // delWrap: {
  //   justifyContent: 'center',
  //   paddingHorizontal: Metrics.baseMargin,
  //   backgroundColor: 'red',
  //   zIndex: 9999,
  // },
  size: {
    ...AppStyles.mTop5,
    width: 32,
    height: 32,
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
  optionWrap: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.hepta,

    transform: [{rotate: '-15deg'}],
    position: 'absolute',

    zIndex: 99999,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.white,
    borderRadius: 40,
    marginRight: 2,
  },

  badgeStyleRTL: {
    right: -9,
    top: 8,
    paddingVertical: 2,
    paddingHorizontal: 20,
    flexDirection: 'row-reverse',
  },
  badgeStyle: {
    right: -7,
    top: 8,
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
});
