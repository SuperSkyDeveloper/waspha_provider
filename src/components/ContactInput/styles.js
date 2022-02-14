// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.text.primary,
    paddingTop: 5,
    paddingBottom: 10,
    fontFamily: Fonts.type.base,
    color: Colors.text.primary,
    fontSize: Fonts.size.normal,
  },
  buttonOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
  fieldIcon: {height: 20, width: 20, marginEnd: 10},

  labelWrapper: {
    marginTop: 7,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: Colors.text.quaternary,
    marginTop: 8,
  },
  verticalLine: {
    backgroundColor: Colors.grey2,
    width: 1,
    top: 0,
    bottom: 0,
    position: 'absolute',
    left: 80,
  },
  btnImage: {
    width: 8,
    height: 6,
    top: 12,
    position: 'absolute',
    left: 40,
    resizeMode: 'contain',
  },
  textStyle: {
    color: Colors.text.primary,
    fontSize: 12,
    marginLeft: 7,
    marginRight: 10,
    height: 25,
  },
  flagStyle: {
    width: 35,
    height: 20,
    borderWidth: 1,
  },
});
