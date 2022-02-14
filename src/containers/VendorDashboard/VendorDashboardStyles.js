import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  chartSec: {
    marginTop: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrap: {
    paddingHorizontal: Metrics.baseMargin,
    marginTop: 20,
  },

  selectWrap: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    marginHorizontal: 20,
    borderRadius: Metrics.borderRadius,
    marginTop: Metrics.smallMargin,
  },
  select: {
    height: 45,
    width: '100%',
    fontSize: 3,
  },
  todayEarnWrap: {alignItems: 'center', marginTop: Metrics.baseMargin},
  optionWrap: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderBottomColor: Colors.border.margin,
    borderBottomWidth: 1,
  },

  downBtnStyle:{tintColor:Colors.black, transform: [{rotate: '270deg'}],height:10,width:10,top:-14}
});
