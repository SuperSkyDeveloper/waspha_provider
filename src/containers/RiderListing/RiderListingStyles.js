import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    opacity: 0.98,
  },
  imageTextWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
  },
  imageWrap: {
    height: 250,
  },
  touchBox: {
    marginTop: Metrics.mediumBaseMargin,
    marginLeft: Metrics.baseMargin,
    paddingBottom: Metrics.mediumBaseMargin,
  },
  touchBoxRtl: {marginLeft: 'auto', width: 30},
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    backgroundColor: 'black',
  },

  backBtnStyle: {
    width: 12,
    height: 12,
    marginTop: Metrics.smallMargin,
    padding: Metrics.smallMargin + 2,
  },

  imageTextStyle: {
    marginBottom: -Metrics.smallMargin,
    marginRight: Metrics.baseMargin,
  },
  header: {
    minHeight: 280,
  },
  androidSize: {
    transform: [{scaleX: 0.9}, {scaleY: 0.85}],
  },
  iosSize: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
  },
  switchFilterWrap: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginRight: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
  },
  backBtnStyleRtl: {transform: [{rotate: '180deg'}]},
});
