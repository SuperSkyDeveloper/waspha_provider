import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  bgImage: {
    width: '100%',
  },
  content: {
    marginTop: 100,
    marginBottom: 45,
    paddingHorizontal: 26,
  },
  headingSec: {
    alignItems: 'center',
    marginTop: 30,
  },

  backBtnStyle: {
    top: 20,
    left: 0,
    paddingRight: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.mediumBaseMargin,
    width: 55,
  },
  mask1: {
    position: 'absolute',
    left: 0,
    bottom: -60,
  },
  drawerImgimgStyle: {
    marginLeft: 20,
    marginTop: 30,
  },
  leftImgViewWrapper: {
    width: 55,
  },
  imageStyle: {
    resizeMode: 'stretch',
    alignSelf: 'flex-end',
  },
  backWrap: {
    width: 40,
    height: 40,
    backgroundColor: Colors.text.secondary,
    position: 'absolute',
    top: 60,
    left: 20,
    borderRadius: 40,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowReverseRtl: {
    left: 'auto',
    right: 20,
  },
  rtlWrap: {
    marginLeft: 'auto',
  },
  backWrapRtl: {
    transform: [{rotate: '180deg'}],
  },
  imageStyleRtl: {
    transform: [
      {
        rotate: '190deg',
      },
    ],
  },
});
