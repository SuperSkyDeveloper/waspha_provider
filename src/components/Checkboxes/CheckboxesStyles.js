import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Metrics.mediumBaseMargin,
  },
  textStyle: {
    marginLeft: Metrics.smallMargin,
  },
  imageStyle: {
    width: 19,
    height: 19,
  },
});
