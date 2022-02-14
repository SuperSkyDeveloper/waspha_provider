import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4.65,

    elevation: 8,
    borderTopColor: Colors.text.secondary,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
  },
  cardWrap: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
  },
  orderCodeSec: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryStatus: {
    borderColor: Colors.border.primary,
    borderRadius: Metrics.borderRadius,
    borderWidth: 1.56,
    borderStyle: 'dashed',
    paddingHorizontal: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin - 2,
    paddingBottom: Metrics.smallMargin - 2,
    marginRight: Metrics.baseMargin,
  },
  orderCodeTextStyle: {
    marginLeft: Metrics.mediumBaseMargin,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.hexa,
  },
  deliveryTypeText: {
    fontSize: Fonts.size.xSmall,
  },
  dateStyle: {
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.mediumBaseMargin,
    justifyContent: 'space-around',
    width: 120,
    paddingVertical: Metrics.baseMargin - 5,
    paddingHorizontal: Metrics.baseMargin,
  },

  proposalDetailStyle: {
    flex: 1,
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.hexa,
    // marginTop: Metrics.baseMargin,
    marginLeft: Metrics.mediumBaseMargin,
    paddingBottom: Metrics.baseMargin,
    marginHorizontal: Metrics.smallMargin,
  },
});
