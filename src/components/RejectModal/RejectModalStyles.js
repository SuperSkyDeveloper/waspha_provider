import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  editLocation: {
    borderTopStartRadius: Metrics.borderRadiusMedium,
    borderTopRightRadius: Metrics.borderRadiusMedium,
    borderBottomLeftRadius: Metrics.borderRadiusMedium,
    borderBottomRightRadius: Metrics.borderRadiusMedium,
    marginTop: Metrics.smallMargin,

    backgroundColor: Colors.background.accent,
    paddingBottom: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
  },

  crossWrap: {
    alignSelf: 'flex-end',
    top: -10,
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.baseMargin,
    paddingLeft: Metrics.mediumBaseMargin,
  },

  crossText: {fontSize: Fonts.size.large, color: Colors.text.secondary},

  headTextWrap: {
    marginHorizontal: Metrics.mediumBaseMargin,
  },

  headTextStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.text.secondary,
  },
  mainViewStyle: {
    flexDirection: 'row',
    marginTop: Metrics.mediumBaseMargin,
    marginLeft: Metrics.doubleBaseMargin,
    marginRight: Metrics.tripleBaseMargin,
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: Metrics.baseMargin,

    color: Colors.text.secondary,
  },
  imageStyle: {marginTop: Metrics.smallMargin, width: 22, height: 22},

  btnStyle: {
    marginTop: Metrics.baseMargin,
    borderRadius: Metrics.borderRadiusMedium,
    backgroundColor: Colors.button.secondary,
    marginTop: Metrics.doubleBaseMargin,

    marginHorizontal: Metrics.doubleBaseMargin,
  },

  btnTextStyle: {
    fontSize: Fonts.size.normal,
    color: Colors.text.secondary,
    fontWeight: 'bold',
  },
  crossWrapRtl: {
    alignSelf: 'flex-start',
  },
});
