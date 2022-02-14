import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    paddingLeft: 19,
    paddingRight: 16,
    marginTop: 20,
  },
  newItemWrap: {
    justifyContent: 'space-between',
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.resolutionBlue,
    paddingLeft: 32,
    paddingRight: 33,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 30,
  },
  dateTimeItemWrap: {
    borderRadius: 10,
    borderColor: Colors.resolutionBlue,
    paddingLeft: 32,
    borderWidth: 1,
    paddingRight: 33,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 20,
    flex: 1,
  },
  newItemText: {
    fontSize: 20,
    color: Colors.bluishPurple,
  },
  circularPlusStyleWrap: {
    marginTop: 6,
  },
  circularPlusStyle: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
  dateTimeText: {
    fontSize: Fonts.size.font16,
    color: Colors.bluishPurple,
    flex: 3,
    marginTop: -4,
    marginLeft: 10,
  },

  calendarStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',    
    tintColor:Colors.bluishPurple
  },
  dropDownArrowStyle: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginTop: 3,
    tintColor:Colors.bluishPurple

  },

  btnSec: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    marginBottom: 20,
  },

  submitBtnWrap: {
    flex: 1,
    paddingHorizontal: 40,
  },
  submitBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.resolutionBlue,
  },

  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  accordinWrap: {
    marginTop: 8,
  },
});
