import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {ProductItem, RichTextEditor, Text, TextInput} from '..';
import styles from './ProductPromotionsStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import {strings} from '../../constants';

export default function ProductPromotionsView(props) {
  const {
    selectedPromoOption,
    selectOption,
    setValue,
    discount,
    discountError,
    giftProduct,
    giftProductError,
  } = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={util.PROMO_OPTIONS()}
        //keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isSelected = item.key === selectedPromoOption;
          const activeSelectorImg = isSelected
            ? Images.TickCheckBox
            : Images.UnTickCheckBox;

          return (
            <>
              <TouchableOpacity onPress={() => selectOption(item.key)}>
                <View
                  style={[
                    styles.mainViewStyle,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <RnImage
                    style={[
                      styles.imageStyle,
                      util.isRTL() && AppStyles.mLeft10,
                    ]}
                    source={activeSelectorImg}
                  />
                  <Text
                    type="semiBold"
                    size={Fonts.size.xSmall}
                    style={styles.textStyle}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
              {isSelected && item.key === util.PROMO_OPTIONS()[1].key && (
                <View style={[AppStyles.mTop20, AppStyles.mBottom10]}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder={`${strings.DISCOUNT} %`}
                    placeholderTextColor={Colors.text.quaternary}
                    inputStyle={AppStyles.inputStyle}
                    value={discount}
                    error={discountError}
                    onChangeText={(discountAmt) => {
                      if (isNaN(discountAmt) || discountAmt > 100) {
                        return true;
                      }
                      setValue({discount: discountAmt});
                    }}
                  />
                  {!_.isEmpty(discount) && (
                    <View
                      style={[
                        styles.percentSignWrap,
                        util.isRTL() && styles.percentSignWrapRtl,
                      ]}>
                      <Text size={Fonts.size.small}>%</Text>
                    </View>
                  )}
                </View>
              )}

              {isSelected &&
                item.key === util.PROMO_OPTIONS()[2].key &&
                !_.isNil(giftProduct) && (
                  <View
                    style={[
                      AppStyles.marginHorizontalsmall,
                      AppStyles.mTop20,
                      AppStyles.mBottom15,
                    ]}>
                    <ProductItem item={giftProduct} />
                  </View>
                )}
            </>
          );
        }}
      />
    </View>
  );
}
