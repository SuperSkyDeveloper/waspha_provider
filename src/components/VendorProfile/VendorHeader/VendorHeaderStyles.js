import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from './../../../theme';

export default StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 330,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Metrics.doubleMediumBaseMargin,
    paddingTop: Metrics.baseMargin,
  },
  firstSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.mediumBaseMargin,
    marginTop: Metrics.baseMargin,
  },
  space: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  touchBox: {
    paddingRight: Metrics.tripleBaseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
    marginRight: Metrics.baseMargin,
  },
  image: {
    height: 125,
    width: 125,
    resizeMode: 'cover',
    borderRadius: 100,
    marginBottom: Metrics.baseMargin,
  },
  ratingWrap: {
    flexDirection: 'row',
    marginTop: Metrics.xsmallMargin,
    alignItems: 'center',
  },
  starIcon: {
    width: 17,
    height: 17,
    marginHorizontal: 1,
  },
  reviewSec: {
    ...AppStyles.mTop10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.button.accent,
    paddingHorizontal: Metrics.mediumBaseMargin,
    paddingVertical: Metrics.smallMargin,
    borderRadius: Metrics.borderRadiusLarge,
  },
  reviewBtn: {},
  noticationBadge: {
    backgroundColor: Colors.label.primary,
    width: 22,
    height: 22,
    borderRadius: Metrics.borderRadiusXLarge,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 15,
  },

  androidSize: {
    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
  },
  iosSize: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
  },
  // bellIcon: {
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  // },

  noticationWrap: {
    padding: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtlStyle: {
    transform: [{rotate: '-180deg'}],
  },
});
