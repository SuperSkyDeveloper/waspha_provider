import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  Txt: {alignSelf: 'center', color: Colors.white},
  imageInnerView: {
    borderRadius: 35,
    backgroundColor: Colors.white,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 10,
    width: 40,
    height: 40,
    padding: 10,
  },
});
