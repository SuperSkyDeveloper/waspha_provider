import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  mapWraper: {
    flex: 1,
    zIndex: 9,
    width: Metrics.screenWidth,
    justifyContent: 'center',
  },
  btnWrap: {
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
    padding: 20,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 99,
  },
  mapContainer: {
    width: Metrics.screenWidth,
  },

  currentLocationWrap: {
    flex: 1,
    width: '100%',
    height: 50,
  },




  staticIcon:{ 
    position: 'absolute',
    marginTop: -42,
    marginLeft: -15,
    height: 27,
    width: 16,
    left: '50%',
    top: '52%',
    zIndex: 999,
  },

  currentPin:{height: 30, width: 30},

  searchWrap: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    top: Metrics.mediumBaseMargin,
  },

  searchWrapper: {
    backgroundColor: Colors.background.primary,
    height: 50,
    borderRadius: 10,
    ...AppStyles.flexRow,
    paddingRight: 10,
    marginHorizontal: Metrics.baseMargin,
    // ...AppStyles.centerInner,
  },
  icon: {
    width: 28,
    height: 28,
    marginVertical: 10,
    marginLeft: 10,
  },

  locationTextWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '75%',
  },
});
