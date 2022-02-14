import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  shiftWrap: {
    flexDirection: 'row',

    marginBottom: Metrics.smallMargin,
    textAlign: 'center',
    justifyContent: 'center',
  },
  opacity: {
    opacity: 0.3,
  },
  lableStyle: {
    fontSize: Fonts.size.xSmall,
  },
  width75: {
    width: 75,
  },
  shiftInput: {
    width: 75,
    borderWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: Metrics.smallMargin,
    fontSize: Fonts.size.xxxxSmall,
    borderBottomColor: Colors.text.quaternary,
    color: Colors.black,
  },
  addShiftText: {
    color: Colors.text.accent,
    fontSize: Fonts.size.xxxxSmall,
    marginLeft: 'auto',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  checkImg: {
    width: 23,
    height: 20,
  },
});
