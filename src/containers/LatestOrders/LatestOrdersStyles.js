import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    paddingTop: 76,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrics.smallMargin,
  },
  tabWrap: {
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 3,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
  },
  active: {
    borderBottomColor: Colors.white,
  },

  tabSec: {
    marginTop: Metrics.tripleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  opacity: {
    opacity: 0.43,
  },
  content: {
    flex: 1,
    marginTop: Metrics.mediumBaseMargin,
  },
  backWrap: {
    position: 'absolute',
    top: '15%',
    left: 0,
    paddingVertical: Metrics.baseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.doubleMediumBaseMargin,
  },
  backWrapRtl: {
    right: 0,
    flexDirection: 'row-reverse',
  },
  backBtnRtl: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
