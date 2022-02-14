import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  card: {
    borderRadius: Metrics.borderRadiusMedium,
  },

  headSec: {
    ...AppStyles.flexRow,
    paddingTop: Metrics.doubleMediumBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  headContent: {
    marginTop: Metrics.smallMargin,
    alignItems: 'center',
  },
  iconStyle: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    marginRight: Metrics.baseMargin,
  },
  deliverDetailText: {
    fontSize: Fonts.size.medium,
    color: Colors.text.secondary,
  },
  itemDetailsText: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.secondary,
    opacity: 0.5,
  },
  contentSec: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border.secondary,
    marginBottom: Metrics.baseMargin,
  },
  tableHeadWrap: {
    marginHorizontal: Metrics.mediumBaseMargin,
    paddingTop: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.baseMargin,
  },

  tableHeadText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.normal,
  },

  borderLine: {
    paddingLeft: Metrics.tripleBaseMargin,
    borderLeftColor: Colors.border.secondary,
    borderLeftWidth: 1,
  },
  itemsContent: {
    marginHorizontal: Metrics.mediumBaseMargin,
  },
  itemsSec: {
    ...AppStyles.flexRow,
    marginBottom: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
  qtyWrap: {
    marginRight: Metrics.doubleMediumBaseMargin,
  },
  itemText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.small,
    opacity: 0.6,
  },

  btnWrap: {
    marginBottom: Metrics.mediumBaseMargin,
    marginHorizontal: Metrics.doubleMediumBaseMargin,
  },

  btnStyle: {
    marginTop: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.octa,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },
});
