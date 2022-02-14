import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    // width: '100%',
    // height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,

    width: Metrics.screenWidth,
  },
  currentPin: {height: 27, width: 26, resizeMode: 'contain'},
  currentLocationWrap: {
    flex: 1,
    width: '100%',
    height: 50,
  },
  vehicleIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  callOutStyle: {
    flex: 1,

    justifyContent: 'center',
  },
  riderDetailWrap: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    width: '100%',
    backgroundColor: Colors.background.primary,
    borderRadius: 5,
  },
  kmText: {
    color: Colors.text.quaternary,
    textAlign: 'center',
  },
  kmWrap: {
    marginTop: -5,
  },
  assignBtnWrap: {
    alignItems: 'center',
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.xsmallMargin,
    borderWidth: 1,
    borderColor: Colors.border.margin,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  vendorDetailWrap: {
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.xsmallMargin,
    paddingVertical: Metrics.smallMargin,
    backgroundColor: Colors.white,
    minWidth: 90,
    minHeight: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
