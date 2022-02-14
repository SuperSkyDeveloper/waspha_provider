import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    borderLeftColor: Colors.text.quaternary,
    borderLeftWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    flex: 1,
  },
  rightBorder: {
    borderRightColor: Colors.text.quaternary,
    borderRightWidth: 1,
  },
  bottomBorder: {
    borderBottomColor: Colors.text.quaternary,
    borderBottomWidth: 1,
  },
});
