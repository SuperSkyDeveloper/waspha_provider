import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    paddingLeft: Metrics.mediumBaseMargin,
    paddingRight: Metrics.smallMargin,
    borderRadius: Metrics.baseMargin,
    paddingVertical: Metrics.xsmallMargin,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  searchFieldWrap: {
    flex: 1,
  },
  searchField: {
    backgroundColor: Colors.background.primary,
    width: '100%',
    paddingHorizontal: Metrics.smallMargin,
    height: 50,
  },
  labelStyle: {
    fontSize: Fonts.size.font14,
  },
  searchBtn: {
    padding: Metrics.smallMargin,
  },
});
