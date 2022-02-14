import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';
import {COUNTRY_ITEM_HEIGHT} from '../../constants';

export default StyleSheet.create({
  listingWrap: {
    height: COUNTRY_ITEM_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.singleBaseMargin,
  },

  category_text: {
    marginBottom: 0,
    fontSize: 16,
  },

  category_text_active: {
    marginBottom: 0,
    fontSize: 16,
    color: Colors.texasRose,
  },

  imageWrap: {
    width: 42,
    height: 42,
    marginRight: 20,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.white,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    width: 55,
    height: 65,
    borderRadius: 50,
    marginTop: -10,
    marginLeft: -6,
  },
  singleList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textWrap: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 0.9,
  },
  checkIcon: {
    width: 17,
    height: 17,
    margin: 2,
    marginRight: 10,
  },

  loginBtnWrap: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 40,
  },

  fieldWrapper: {
    marginHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
    height: 45,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray7,
  },
  titleStyle: {
    fontWeight: 'bold',
  },
  textFiled: {fontSize: Fonts.size.normal},

  placeholder: {
    color: Colors.gray8,
  },
});
