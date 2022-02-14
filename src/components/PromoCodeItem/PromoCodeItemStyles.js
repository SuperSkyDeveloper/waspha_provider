import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 9,
    paddingVertical: 20,
    marginTop: 20,

    marginHorizontal: 10,
    backgroundColor: Colors.background.primary,
  },
  contentStyle: {
    flex: 1,
    ...AppStyles.Bottom5,
    width: '100%',
    flexDirection: 'row',
  },
  imageWrap: {
    // borderRadius: 100,'
    top: -15,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },

  promoCodeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 66,
    maxWidth: '53%',
  },
  expiryTimeWrap: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 28,
    marginTop: 10,
  },
  noOfUsesWrap: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    top: 22,
  },

  discountWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },

  dateWrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  dateWrapRtl: {
    marginRight: Metrics.mediumBaseMargin,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
