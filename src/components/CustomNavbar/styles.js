// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.statusBarHeight,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
    paddingRight: Metrics.xsmallMargin,
    paddingLeft: Metrics.smallMargin,
    overflow: 'hidden',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
  },
  btnImage: {},
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 80,
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
  borderRadius: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  bgImage: {
    width: '100%',
  },
  btnImageRtl: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
