import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  submitBtn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#002286',
  },

  submitBtnText: {
    fontWeight: 'bold',
  },

  cancelBtnWrap: {
    paddingBottom: 50,
    paddingRight: 39,
    paddingLeft: 39,
    marginTop: Metrics.screenHeight / 2.2,
  },
});
