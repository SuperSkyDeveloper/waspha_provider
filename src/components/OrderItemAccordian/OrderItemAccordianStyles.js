import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.mBottom10,
    marginHorizontal: Metrics.smallMargin,
  },
  cardContainer: {
    borderRadius: Metrics.borderRadius,
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.baseMargin,
    ...AppStyles.mBottom10,
    ...AppStyles.alignItemsCenter,

    backgroundColor: Colors.background.primary,
    // shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.05,
    // elevation: 5,


    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
      shadowOffset: {
      width: 1.6,
      height: 1.8,
    },
        shadowOpacity: 0.44,
        shadowRadius: 6,
      },
    }),

  },
  titlebarContainer: {
    ...AppStyles.flexRow,
    paddingVertical: Metrics.smallMargin,
  },
  titleContainer: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
  },
  titleInput: {
    borderWidth: 0,
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium,
  },
  removeItemContainer: {
    height: 24,
    width: 24,
    ...AppStyles.centerInner,
  },
  toggleIcon: {
    height: 24,
    width: 24,
  },
  bodyContainer: {
    alignItems: 'flex-start',
  },
  orderItemDescContainer: {
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
  },
  descriptionText: {
    color: Colors.text.primary,
    fontSize: Fonts.size.xxSmall,
    textAlignVertical: 'top',
  },
  orderAtts: {
    justifyContent: 'space-between',
    ...AppStyles.flexRow,
  },
  remarksContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: Colors.border.primary,
    ...AppStyles.mTop10,
  },

  remarksWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  remarksText: {
    flex: 1,
  },
  remarksImage: {
    height: 50,
    width: 50,
  },

  submitBtnWrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: Colors.button.quaternary,
    paddingVertical: Metrics.smallMargin,
    borderRadius: Metrics.borderRadiusLarge,
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },

  submitBtnText: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
  },
  uploadImgWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: Metrics.borderRadius,
  },
  activeBtn: {
    transform: [{rotate: '180deg'}],
  },
  qtyInputWrap: {},
});
