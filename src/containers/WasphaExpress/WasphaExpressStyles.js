import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  locationSec: {
    position: 'absolute',

    marginTop: Metrics.tripleBaseMargin,
    paddingTop: Metrics.mediumBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
    flexDirection: 'row',
  },

  contentSec: {flex: 1, marginRight: Metrics.baseMargin},

  boxSec: {
    marginBottom: Metrics.baseMargin,
  },
  borderStyling: {
    paddingTop: Metrics.baseMargin,
    borderTopColor: Colors.border.quaternary,
    borderTopWidth: 1,
    opacity: 0.2,
  },
  mapWrap: {flex: 1},
  locationHeadingText: {
    color: Colors.text.quaternary,
    fontSize: Fonts.size.xxxSmall,
  },
  locationText: {
    color: Colors.text.hexa,
    fontSize: Fonts.size.small,
    width: '90%',
  },

  dotStyle: {
    borderRadius: Metrics.borderRadiusXXLarge,
    backgroundColor: Colors.border.accent,
    opacity: 0.9,
    height: 10,
    width: 10,
    marginLeft: Metrics.baseMargin,
  },
  dashWrap: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.background.primary,
  },

  dashStyle: {width: 2, height: 43, flexDirection: 'column'},
  locationTxt: {
    alignSelf: 'center',
    paddingVertical: 15,
  },
  confirmTxt: {
    paddingHorizontal: 30,
    alignSelf: 'center',
    paddingVertical: 15,
    color: Colors.white,
  },
  locationBtn: {
    backgroundColor: Colors.resolutionBlue,
    borderRadius: Metrics.smallMargin,
    width: Metrics.screenWidth - 80,
    alignSelf: 'center',
  },
  imageLocation: {},
  RBSheetView: {
    width: '100%',
    height: '100%',
  },
  RBSheetTxtView1: {
    padding: 10,
    marginTop: 0,

    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  RBSheettxt: {alignSelf: 'center', color: Colors.white},
  RBSheetTxtView2: {
    padding: 10,
    marginTop: 0,

    width: '100%',
    borderTopWidth: 0,
    borderRadius: 5,
  },
  RBSheetBtn: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#9c70a6',
    borderRadius: 5,
  },
  pickerImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    position: 'absolute',

    paddingTop: Metrics.baseMargin,

    top: Metrics.screenWidth - 30,
  },

  loaderStyle: {
    position: 'absolute',
    zIndex: 9999,
    top: Metrics.screenHeight / 3 + 20,
    left: Metrics.screenWidth / 2 - 66,
  },
  btnImageRtl: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
