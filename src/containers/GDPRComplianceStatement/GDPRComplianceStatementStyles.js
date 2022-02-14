import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  policySec: {
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  loaderWrap: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  noPolicyFoundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.tripleBaseMargin,
  },
});
