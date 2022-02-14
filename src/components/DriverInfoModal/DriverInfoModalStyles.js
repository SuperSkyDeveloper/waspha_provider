import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  callOutStyle: {
    flex: 1,

    justifyContent: 'center',
  },
  starsImageStyle: {
    height: 17,
    width: 17,
    resizeMode: 'cover',
  },
  riderDetailWrap: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    width: '100%',
    backgroundColor: Colors.background.primary,
    borderRadius: 5,
  },

  riderRatingWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 6,
  },
  starIconStyle: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },
  kmText: {
    color: Colors.text.quaternary,
    textAlign: 'center',
  },
  kmWrap: {
    marginTop: -5,
  },
  assignBtnWrap: {
    alignItems: 'center',
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.xsmallMargin,
    borderWidth: 1,
    borderColor: Colors.border.margin,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: Metrics.xsmallMargin,
  },
});
