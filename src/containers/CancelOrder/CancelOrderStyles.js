import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentSec: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 38,
  },

  questionStyleWrap: {
    paddingTop: 30,
  },
  mainContent: {
    paddingTop: 36,
  },
  radioBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox: {
    height: 23,
    width: 23,
  },

  itemParent: {
    paddingRight: 20,
    alignItems: 'center',
  },
  radioBtnActive: {
    height: 11,
    width: 11,
    borderRadius: 6,
    backgroundColor: 'red',
  },

  itemWrap: {
    ...AppStyles.mBottom30,
  },

  labelStyle: {
    fontSize: util.isRTL()?22:14,
    color: Colors.black,
    fontWeight: '500',
    // marginBottom: 15,
  },

  questionStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535353',
  },

  addressInputWrap: {
    paddingTop: 16,
    paddingBottom: 120,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginTop:22
  },

  contentTextStyle: {
    color: '#535353',
  },
  inputStyle: {
    fontSize: 10,
    opacity: 0.77,
  },

  contentTextWrap: {
    paddingTop: 5,
  },

  inputWrap: {
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 42,

    backgroundColor: Colors.white,
  },

  submitBtnWrap: {
    paddingTop: 69,
    paddingBottom: 20,
    paddingRight: 69,
    paddingLeft: 69,
  },
  submitBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#002286',
  },

  submitBtnText: {
    fontWeight: 'bold',
  },

  cancelBtnWrap: {
    paddingBottom: 50,
    paddingRight: 69,
    paddingLeft: 69,
  },
});
