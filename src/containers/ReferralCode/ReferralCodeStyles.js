import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  submitBtnWrap: {
    marginTop: Metrics.doubleMediumBaseMargin,
    marginRight: 50,
    marginLeft: 50,
  },
  submitBtn: {
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.resolutionBlue,
  },

  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  advEarn: {opacity: 1, marginTop: 20},
  referralDes: {opacity: 0.5, textAlign: 'center', marginTop: 10},
  referralCodeView: {
    opacity: 1,
    height: 70,
    width: '70%',
    borderWidth: 2.3,
    borderStyle: 'dashed',
    borderRadius: 1,
    justifyContent: 'center',
  },
  referralCodeText: {opacity: 1, alignSelf: 'center', textAlign: 'center'},
});
