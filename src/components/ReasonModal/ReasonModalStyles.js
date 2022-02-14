import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from './../../theme';

export default StyleSheet.create({
  modalWrap: {
    borderRadius: Metrics.borderRadiusMidLarge,
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.mediumBaseMargin,
  },
  listWrap: {
    marginTop: Metrics.baseMargin,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: 47,
    height: 36,
    position: 'absolute',
    right: 1,
    top: 3,
  },
  modal: {
    top: 50,
  },
  reportBtn: {
    top: 15,
    marginBottom: Metrics.mediumBaseMargin,
    borderRadius: Metrics.borderRadiusMidLarge,
  },
  modalHeader: {
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
});
