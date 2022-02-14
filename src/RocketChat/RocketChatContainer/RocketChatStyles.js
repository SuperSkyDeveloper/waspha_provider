import {StyleSheet} from 'react-native';
import util from '../../util';
import {Colors, Fonts, Metrics} from '../RCTheme';

export default StyleSheet.create({
  backWrap: {
    tintColor: Colors.deepCove,
    // position: 'absolute',
    top: 10,
    left: 20,
    width: 90,
    height: 70,
  },
  backImg: {
    top:10,
    left:9,
    tintColor: Colors.deepCove,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  chatListWrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  chatViewWrap: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  chatMessageSec: {
    flexDirection: 'row',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
    borderTopWidth: 1,
    borderTopColor: Colors.alto1,
    paddingTop: Metrics.smallMargin,
  },
  sendBtnBg: {
    backgroundColor: Colors.grey,
    height: 45,
    width: 45,
    marginLeft: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.borderRadiusXLargeMedium,
  },
  textInputStyle: {
    flex: 1,
  },
  // sendBtnSecWrap: {
  //   justifyContent: 'center',
  //   height: 50,
  //   width: 50,
  //   alignItems: 'center',
  // },
  stickyDate: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.pictonBlue,
    borderRadius: Metrics.borderRadiusMedium,
    marginBottom: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
  },
  stickyDateText: {
    color: Colors.grey5,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
    fontSize: Fonts.size.small,
  },
  sendBtnStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  textInput: {
    paddingLeft: Metrics.smallMargin,
    fontSize: Fonts.size.small,
    height: 50,
    backgroundColor: Colors.white,
  },
  titleStyle: {
    color: Colors.white,
    fontSize: Fonts.size.large,
  },
  customNavBarStyle: {
    height: 60,
    backgroundColor: Colors.whatsappGreen,
  },
  sectionListPadding: {padding: Metrics.smallMargin},
  connectingStatusStyle: {
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: '#A8A8A8',
  },
  connectingStatusTextStyle: {
    textAlign: 'center',
  },
  noInternetConnSec: {
    backgroundColor: Colors.background.primary,
    padding: 15,
  },
  okBtn: {
    alignSelf: 'flex-end',
  },
  noInternetErrorStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.text.primary,
  },
  okBtnTextStyle: {
    fontSize: Fonts.size.small,
    color: Colors.whatsappGreen,
  },
  attachStyle: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 66,
    height: 66,
    borderRadius: 100,
    borderWidth: 1,

  },
  InfoWrap: {
    marginTop: Metrics.mediumBaseMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
