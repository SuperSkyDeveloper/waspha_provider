import {StyleSheet} from 'react-native';
import {AppStyles, Metrics, Colors, Fonts} from '../../theme';
import util from '../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
    paddingVertical: Metrics.mediumBaseMargin,
    paddingRight: Metrics.baseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.xsmallMargin,
    marginBottom: Metrics.baseMargin,
    borderTopColor: Colors.text.secondary,
  },
  timeSec: {...AppStyles.flexRow, alignSelf: 'flex-end'},
  codeDateWrap: {alignItems: 'flex-end'},
  dateWrap: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timerWrapRTL: {
    alignItems: 'center',
    left: 10,
    marginBottom: 10,
  },

  contentWrap: {
    marginTop: Metrics.xsmallMargin,
    marginRight: Metrics.doubleBaseMargin,
  },
  orderCodeWrap: {
    ...AppStyles.mBottom5,
    ...AppStyles.flexRow,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
  deliveryTimeWrap: {
    marginBottom: Metrics.mediumBaseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingVertical: Metrics.xsmallMargin,
    backgroundColor: Colors.label.primary,
    alignSelf: 'flex-end',
  },

  deliveryTime: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.secondary,
  },

  textColor: {
    color: Colors.text.primary,
  },

  giftIconWrapStyle: {
    position: 'absolute',
    top: 10,
  },

  timerWrap: {
    justifyContent: 'center',
    marginRight: 60,
    marginBottom: 10,
    alignItems: 'center',
  },
});
