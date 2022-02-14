import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    marginBottom: Metrics.baseMargin,
  },

  trendImg: {
    minWidth: Metrics.screenWidth - 50,
    minHeight: 180,
    resizeMode: 'cover',
    borderRadius: Metrics.borderRadiusMidLarge,
  },

  nameWrap: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    width: '100%',
  },

  textStyle: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.medium,
    marginBottom: 10,
    zIndex: 999,
    marginHorizontal: Metrics.baseMargin,
  },

  size: {
    ...AppStyles.mTop5,
    width: 32,
    height: 32,
    padding: 12,
    backgroundColor: Colors.background.primary,
    borderRadius: 30,
    marginRight: Metrics.smallMargin + 2,
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
  overlay: {
    backgroundColor: Colors.overlay.primary,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    borderRadius: Metrics.borderRadiusMidLarge,
  },
  optionWrap: {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    top: 5,
    flexDirection: 'row',
  },
  fullWidth: {
    minWidth: Metrics.screenWidth - 16,
  },
});
