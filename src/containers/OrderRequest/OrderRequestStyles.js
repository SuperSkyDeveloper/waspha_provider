import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },

  orderListStyle: {
    flex: 1,
    marginTop: Metrics.baseMargin,
  },
});
