import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  itemWrap: {
    backgroundColor: Colors.background.primary,
    elevation: 4,
    margin: Metrics.smallMargin,
    height: 100,
    flex: 1,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImageStyle: {
    resizeMode: 'cover',
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  vehicleStyle: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    left: 4,
    top: 3,
  },
  imageWrap: {
    flex: 1,
  },
  imageWrap: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  riderInfoWrap: {
    flex: 2,
    alignSelf: 'center',
  },
  imageCircularWrap: {
    height: 70,
    width: 70,
    borderRadius: Metrics.borderRadiusXLargeMedium,
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
  },
  deliveryVehicleTypeWrap: {
    backgroundColor: Colors.background.primary,
    height: 30,
    width: 30,
    position: 'absolute',
    right: 6,
    bottom: 0,
    zIndex: 9,
    elevation: 4,
    borderRadius: Metrics.borderRadiusXLargeMedium,
  },
  deliveryVehicleTypeWrapRtl: {
    left: -20,
  },
  riderNameStyle: {
    alignSelf: 'center',
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    color: Colors.text.quaternary,
  },
  riderNameStyleRtl: {
    alignSelf: 'flex-end',
  },
  delWrap: {
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
  },
  size: {
    ...AppStyles.mTop5,
    padding: 12,
    backgroundColor: Colors.background.primary,
    borderRadius: 30,

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
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  badgeWrap: {
    backgroundColor: Colors.badge.primary,
    position: 'absolute',
    zIndex: 9999,
    right: 0,
    padding: Metrics.xsmallMargin,
  },
});
