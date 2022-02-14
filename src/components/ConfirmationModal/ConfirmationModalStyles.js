import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from './../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    padding: 10,
  },
  modalWrap: {
    backgroundColor: Colors.background.accent,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadius,
  },
  btnTextStyle: {
    fontSize: Fonts.size.xSmall,
  },
});
