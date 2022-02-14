import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../../theme';

export default StyleSheet.create({
  optionList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    marginBottom: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
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

    tintColor: Colors.text.primary,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -14,
    left: -13,
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
  leftArrow: {
    transform: [{rotate: '280deg'}],
  },
});
