import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: 22,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  rightSec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.mediumBaseMargin,
    marginTop: 10,
    marginBottom: Metrics.baseMargin,
  },
  profileImgWrap: {
    width: 85,
    height: 85,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 50,
    padding: 2,
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: Metrics.baseMargin,
    borderBottomColor: Colors.text.quaternary,
    borderBottomWidth: 1,
  },
  listingSec: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },
  arrowImg: {
    width: 7,
    height: 12,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cameraIconWrap: {
    position: 'absolute',
    bottom: -4,
    right: -10,
    backgroundColor: Colors.white,
    padding: 10,
    zIndex: 999,
    borderRadius: 100,
  },

  ////////////////////////////////
  inputStyle: {
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: Fonts.size.small,
    borderBottomColor: Colors.text.quaternary,
    borderBottomWidth: 0,

    color: Colors.text.primary,
  },

  btnWrap: {
    paddingHorizontal: 35,
    marginBottom: 20,
    marginTop: 40,
  },
  btn: {
    height: 55,
    borderRadius: 10,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  contactWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: Colors.athensGray,
    borderBottomWidth: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  editWrap: {
    position: 'absolute',
    bottom: 0,
    right: 30,
    width: 30,
    height: 30,
    backgroundColor: Colors.background.primary,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImg: {
    tintColor: Colors.text.primary,
  },
  loginBtnWrap: {
    marginTop: Metrics.doubleBaseMargin,
  },
  loginBtn: {
    height: 50,
  },
  fieldWrap: {
    marginLeft: 20,
    flex: 1,
  },
  disabled: {
    backgroundColor: Colors.background.secondary,
  },
  imageRotate: {
    transform: [{rotate: '-180deg'}],
  },
});
