import {StyleSheet} from 'react-native';
import {AppStyles, Metrics, Colors, Fonts} from '../../theme';
import {APP_DOMAIN} from '../../constants';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    paddingVertical: Metrics.mediumBaseMargin,

    marginTop: Metrics.xsmallMargin,
    marginBottom: Metrics.baseMargin,
    borderTopColor: Colors.text.secondary,
  },
  dateWrap: {
    marginRight: Metrics.baseMargin,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },
  dateWrapRtl: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: Metrics.baseMargin,
  },
  itemWrap: {
    marginTop: Metrics.smallMargin,
    flex: 1,
    height: 300,
    elevation: 10,
    width: '100%',
    backgroundColor: Colors.background.primary,
  },
  orderItemWrap: {
    ...AppStyles.mBottom5,
    width: '100%',
  },
  rowWrap: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
  },
  itemPickedStatus: {
    backgroundColor: Colors.background.hepta,
    minWidth: 80,
    height: util.isRTL() ? 33 : 25,
    top: Metrics.baseMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  pickedText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.xSmall,
    fontWeight: 'bold',
  },
  userInfoItemWrap: {
    flex: 1,
    ...AppStyles.flexRow,
    marginTop: Metrics.smallMargin,
  },
  imageWrap: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  orderCodeWrap: {
    ...AppStyles.flexRow,
    alignItems: 'center',
  },
  userDetailsWrap: {
    marginLeft: Metrics.mediumBaseMargin,
  },
  textStyle: {
    color: Colors.text.hexa,
    fontSize: Fonts.size.small,
    marginHorizontal: 2,
  },
  orderDescText: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.xxxxSmall,
    color: Colors.text.hexa,
  },
  orderDescpWrap: {
    width: 180,
  },
  profileImageStyle: {
    resizeMode: 'cover',
    height: 100,
    width: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  imageCircularWrap: {
    height: 100,
    width: 100,
    borderRadius: Metrics.borderRadiusXLargeMedium,
    marginLeft: Metrics.doubleBaseMargin,
  },
  deliveryVehicleTypeWrap: {
    backgroundColor: Colors.background.primary,
    height: 33,
    width: 33,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 9,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleStyle: {
    height: 24,
    width: 24,
    resizeMode: 'cover',
    left: 4,
  },
  wasphaBoxIcon: {height: 50, width: 50, marginLeft: 20, marginTop: -10},
});
