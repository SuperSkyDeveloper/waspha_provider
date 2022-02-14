import {StyleSheet} from 'react-native';
import {AppStyles, Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  modalStyle: {
    position: 'absolute',
    alignSelf: 'center',
  },

  contentWrap: {
    zIndex: 999,
  },

  selectLanguageWrap: {
    alignItems: 'center',
    marginBottom: Metrics.doubleBaseMargin,
  },

  amountWrap: {
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.reca,
    marginLeft: Metrics.tripleBaseMargin,
    height: 48,

    minWidth: 150,
    alignItems: 'center',
  },
  contentSec: {
    paddingRight: Metrics.tripleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin,
  },
});
