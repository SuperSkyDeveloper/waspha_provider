import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
  },
  mainSection: {
    marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  showPwsdWrap: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: '15%',
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  showPwsdWrapRtl: {
    left: 0,
  },
  submitBtnWrap: {
    marginTop: Metrics.doubleMediumBaseMargin,
    marginBottom: Metrics.tripleMediumBaseMargin,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
  },
  submitBtn: {
    height: 50,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.button.primary,
  },
  submitBtnText: {
    fontSize: Fonts.size.small,
    color: Colors.text.secondary,
  },
  vehicleValueViewWrap: {
    elevation: 0,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleText: {
    alignSelf: 'center',
  },
  placeholderStyle: {
    color: Colors.text.quaternary,
    fontSize: Fonts.size.xSmall,
  },
  dropDownIconStyle: {
    alignSelf: 'center',
    marginRight: Metrics.smallMargin,
  },
  vehicleDetailsHeading: {
    marginTop: Metrics.doubleBaseMargin,
  },
  horizontalLineStyle: {
    backgroundColor: Colors.text.quaternary,
    flex: 1,
    height: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: 'hidden',
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
  },
  viewWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: Metrics.borderRadiusMedium,
    height: 50,
    // backgroundColor: Colors.button.primary,
    backgroundColor: Colors.button.secondary,
    alignItems: 'center',
  },
});
