import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSelectorWrapper: {
    borderRadius: Metrics.borderRadiusMedium,
    marginTop: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageDetails: {
    flex: 1,
    paddingTop: Metrics.baseMargin,

    paddingBottom: Metrics.smallMargin,

    paddingLeft: Metrics.mediumBaseMargin,

    paddingRight: Metrics.smallMargin,
  },

  crossIconWrap: {
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin,
  },
  selectImageText: {
    color: Colors.text.secondary,
    fontWeight: 'bold',
    opacity: 0.9,
    fontSize: Fonts.size.xLarge,
  },
  selectImageTextWrap: {
    marginRight: Metrics.tripleBaseMargin,
  },
  selectImageWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crossIconStyle: {
    color: Colors.text.secondary,
    right: Metrics.smallMargin,
  },

  imageSelectorChild: {
    marginTop: Metrics.smallMargin,

    borderTopColor: Colors.border.secondary,
    borderTopWidth: 0.6,
  },

  submitBtnWrap: {
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
  },
  submitBtn: {
    height: 50,
    borderRadius: Metrics.smallMargin,

    backgroundColor: Colors.background.primary,
  },

  submitBtnText: {
    fontSize: Fonts.size.small,
    color: Colors.text.accent,
  },

  imagePlaceholderStyle: {
    marginTop: Metrics.baseMargin,

    marginBottom: Metrics.smallMargin,

    alignItems: 'center',
  },

  imageStyle: {
    width: 120,
    height: 120,
  },

  circularPlusIconStyle: {
    position: 'absolute',
    top: -12,
    bottom: 20,
    right: 90,
    width: 29,
    height: 29,
  },
});
