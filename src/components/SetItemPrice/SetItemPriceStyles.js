import {StyleSheet} from 'react-native';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {marginTop: Metrics.mediumBaseMargin},
  titleStyle: {fontSize: Fonts.size.medium},
  parentSec: {
    flexDirection: 'row',
    borderStartColor: Colors.border.tertiary,
    borderStartWidth: 13,
    backgroundColor: Colors.background.primary,
    // paddingLeft: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.baseMargin,
    margin: Metrics.xsmallMargin,
    paddingHorizontal: Metrics.smallMargin,
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
  parentSecRtl: {
    borderEndColor: Colors.border.tertiary,
    borderEndWidth: 13,
    flexDirection: 'row-reverse',
    borderStartWidth: 0,
    paddingLeft: Metrics.baseMargin,
  },
  titleWrap: {
    marginBottom: Metrics.smallMargin,
  },
  inputParent: {
    flex: 5,
    flexDirection: 'row',
  },
  labelStyle: {
    color: Colors.text.primary,
    fontSize: Fonts.size.xSmall,
    fontWeight: 'bold',
  },

  textInput: {
    // opacity: 0.8,
    fontSize: Fonts.size.xxSmall,
    fontWeight: 'bold',
    height: 35,
    borderBottomWidth: 1,
  },
  inputWrap: {
    flex: 1,
    marginTop: Metrics.baseMargin,
  },

  quantityWrap: {
    marginLeft: Metrics.doubleBaseMargin,
    ...AppStyles.flex,
  },

  quantityStyle: {
    fontSize: Fonts.size.xxxxSmall,
  },
  percentSignWrap: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: 20,
  },
  percentSignWrapRtl: {
    top: 26,
  },
});
