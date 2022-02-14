import {StyleSheet} from 'react-native';
import util from '../../util';
import {Colors, Fonts, Metrics} from './../../theme';

export default StyleSheet.create({
  textInputContainer: {
    backgroundColor: Colors.background.primary,
    borderWidth: 0,
    borderTopWidth: 0,
    textAlign: util.isRTL() ? 'right' : 'left',
  },
  textInput: {
    borderTopWidth: 0,
    marginTop: Metrics.smallMargin,
    backgroundColor: Colors.background.secondary,
    height: 52,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 0,
    zIndex: 999,

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
  textInputLeft: {
    textAlign: 'left',
  },
  textInputRight: {
    textAlign: 'right',
  },
  listView: {
    backgroundColor: Colors.background.primary,
    borderWidth: 0,
    marginTop: 20,
  },
  row: {
    borderWidth: 0,
  },
  container: {
    backgroundColor: Colors.background.primary,
    flex: 1,
    borderWidth: 0,
  },
});
