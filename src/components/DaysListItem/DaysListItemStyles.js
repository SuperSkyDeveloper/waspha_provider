import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  optionList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    marginBottom: Metrics.baseMargin,
    marginHorizontal: 3,

    // shahdow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  optionIcon: {
    marginRight: Metrics.mediumBaseMargin,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -16,
    left: -15,
    zIndex: 99,
  },

  arrowWrap: {
    width: 32,
    height: 32,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowImg: {
    transform: [{rotate: '90deg'}],
  },
});
