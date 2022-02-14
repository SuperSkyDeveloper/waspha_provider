// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imgWrap: {
    width: 75,
    height: 75,
    overflow: 'hidden',
    borderColor: Colors.background.seca,
    borderRadius: 50,
    borderWidth: 3,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileSec: {
    flexDirection: 'row',
    marginTop: 0,
    paddingBottom: 22,
    paddingHorizontal: Metrics.smallMargin,
  },
  hLine: {
    marginHorizontal: 10,
    borderBottomColor: Colors.border.secondary,
    borderBottomWidth: 1,
  },
  linkSec: {
    paddingTop: 15,
    paddingHorizontal: Metrics.smallMargin,
  },
  linkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
    marginLeft: Metrics.baseMargin,
  },
  icon: {
    marginRight: 12,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  badge: {
    backgroundColor: Colors.label.primary,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    marginLeft: 10,
  },
  baseIconSec: {
    alignItems: 'flex-end',
    marginTop: 29,
    marginRight: 12,
  },
  baseIconSecRtl: {
    alignItems: 'flex-start',
  },
  //

  pinStyle: {
    height: 17,
    width: 17,
    marginTop: Metrics.xsmallMargin,
    marginRight: Metrics.xsmallMargin,
    resizeMode: 'contain',
  },
  // modal
  modalContainer: {
    backgroundColor: Colors.transparent,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: Metrics.smallMargin,
    flex: 1,
    justifyContent: 'center',
  },
  bgStyle: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 65,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headingText: {
    marginBottom: 65,
  },
  btnStyle: {
    height: 60,
  },
  activeLangStyle: {
    backgroundColor: Colors.button.octa,
  },
});
