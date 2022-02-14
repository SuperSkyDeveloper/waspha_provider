import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  loginViaSec: {
    marginTop: 22,
    alignItems: 'center',
  },
  loginViaWrap: {
    marginVertical: 11,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginHorizontal: 3,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  iconSize: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  fb: {
    backgroundColor: Colors.social.fb,
  },
  gmail: {
    backgroundColor: Colors.social.gmail,
  },
  linkedin: {
    backgroundColor: Colors.background.tertiary,
  },
  paddingHr: {
    paddingHorizontal: 48,
  },
  fullScreenLoader: {
    position: 'absolute',
    width: Metrics.screenWidth * 3,
    height: Metrics.screenHeight * 2,
    zIndex: 9,
    top: -Metrics.screenHeight,
    left: -Metrics.screenWidth,
    ...AppStyles.centerInner,
  },
  screenLoaderIndicator: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  screenLoaderIndicator: {
    zIndex: 999,
  },
});
