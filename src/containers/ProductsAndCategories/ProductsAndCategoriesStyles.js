import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  headImage: {width: '100%', height: 190},

  showNestWrap: {
    position: 'absolute',
    top: 130,
    left: 20,
    width: Metrics.screenWidth - 30,
  },

  firstSec: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },

  createCategoryWrap: {
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusMedium,
  },

  btnText: {textAlignVertical: 'center', fontSize: Fonts.size.xSmall},

  plusIconStyle: {
    width: 19,
    height: 19,
    marginRight: Metrics.doubleBaseMargin,
  },

  categorySec: {
    ...AppStyles.flex,
    marginLeft: Metrics.smallMargin,
    marginTop: Metrics.baseMargin,
  },

  productSec: {
    ...AppStyles.flex,
    marginLeft: Metrics.baseMargin,

    marginTop: Metrics.smallMargin,
  },

  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  overlay: {
    backgroundColor: Colors.overlay.primary,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
  },
  backWrap: {
    position: 'absolute',
    zIndex: 99999,
    padding: 10,
  },
  searchWrap: {
    marginTop: Metrics.mediumBaseMargin,
    paddingHorizontal: 10,
  },
  backWrapRtl: {
    right: 10,
  },
  imageStyleRtl: {
    transform: [{rotate: '-180deg'}],
  },
  imageStyle: {
    marginTop: util.isPlatformAndroid()
      ? Metrics.doubleMediumBaseMargin
      : Metrics.tripleMediumBaseMargin,
  },
});
