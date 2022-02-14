import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  businessCategory: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.doubleBaseMargin,
  },
});
