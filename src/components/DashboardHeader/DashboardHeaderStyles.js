import {StyleSheet} from 'react-native';
import RootTagContext from 'react-native/Libraries/ReactNative/RootTagContext';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  header: {
    minHeight: 205,
    justifyContent: 'flex-end',
    paddingBottom: Metrics.mediumBaseMargin,
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerItem: {
    alignItems: 'center',
  },
  backBtnImgRtl: {
    transform: [{rotate: '190deg'}],
  },
  backBtnStyle: {
    position: 'absolute',
    top: 38,
    left: 12,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    flex: 1,
  },
  backBtnStyleRtl: {
    right: 12,
  },

  error: {
    position: 'absolute',
    right: 0,
    top: -10,
    zIndex: 999,
  },
  amountWrap: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: 2,
    borderRadius: 3,
    position: 'absolute',
    bottom: 23,
    flex: 1,
    flexDirection: 'row',
  },
  dashboardWrap: {},
  square: {
    width: 6,
    height: 8,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    alignItems: 'center',
    marginRight: Metrics.xsmallMargin,
    marginTop: 6,
    justifyContent: 'flex-end',
  },
  imgWrap: {
    backgroundColor: '#f7f7f778',
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  whiteBg: {
    backgroundColor: Colors.background.primary,
  },

  imgSize: {
    width: 58,
    height: 58,
  },
});
