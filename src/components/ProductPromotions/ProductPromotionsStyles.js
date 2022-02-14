import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
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
  percentSignWrap: {
    position: 'absolute',
    top: 8,
    left: 50,
    width: 20,
  },
});
