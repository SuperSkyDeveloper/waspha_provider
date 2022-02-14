import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  cardWrap: {
    margin: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,

    borderColor: Colors.border.peta,
    marginBottom: Metrics.smallMargin,

    //// shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardSec: {
    flex: 1,
  },
  imgStyle: {
    resizeMode: 'cover',
    height: 320,
    width: '100%',
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.xsmallMargin,
    paddingBottom: Metrics.smallMargin,
  },
  addBtn: {
    borderRadius: Metrics.borderRadiusMidLarge,
    borderWidth: 1,
    backgroundColor: Colors.background.hexa,
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.smallMargin - 4,
    paddingLeft: Metrics.smallMargin + 4,
    paddingRight: Metrics.smallMargin + 4,
    paddingTop: Metrics.xsmallMargin - 3,
    paddingBottom: Metrics.xsmallMargin - 3,
  },
  listBtn: {
    borderRadius: Metrics.borderRadiusMidLarge,
    borderWidth: 1,
    backgroundColor: Colors.background.primary,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    marginRight: Metrics.smallMargin - 4,
    width: 85,
    paddingTop: Metrics.xsmallMargin - 4,
    paddingBottom: Metrics.xsmallMargin - 4,
  },
  titleTextStyle: {
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  listTextStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: Fonts.size.small,
  },
});
