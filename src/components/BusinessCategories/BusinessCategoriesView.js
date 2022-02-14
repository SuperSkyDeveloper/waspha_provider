import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, FlatList} from 'react-native';
import {Checkboxes, Text, VendorCategoryItem} from '../../components';
import {strings} from '../../constants';
import styles from './BusinessCategoriesStyles';
import {Fonts, Colors, AppStyles} from '../../theme';
import util from '../../util';

export default function BusinessCategoriesView(props) {
  const {
    mainCategories,
    selectedCategoryId,
    selectedCategoryError,
    subcategoryCategories,
    handleSelectSubCategory,
    onCategoryItemPress,
    selectedSubCategoryError,
    categoryListIndex,
    selectedSubCategory,
    data,
  } = props;

  return (
    <View>
      {/* main category section */}
      <FlatList
        data={data.mainCategories}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        //keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <VendorCategoryItem
              data={item}
              onCategoryItemPress={onCategoryItemPress}
              index={index}
              categoryListIndex={categoryListIndex}
            />
          );
        }}
      />
      {!_.isEmpty(selectedCategoryError) && (
        <Text
          type="medium"
          size={Fonts.size.xxSmall}
          color={Colors.error.primary}
          textAlign={util.rtlRightText()}
          style={[AppStyles.mTop5, AppStyles.mBottom5]}>
          {selectedCategoryError}
        </Text>
      )}
      {/* sub categories */}
      {!_.isEmpty(subcategoryCategories) && (
        <View>
          <View
            style={[
              styles.businessCategory,
              util.isRTL() && AppStyles.rowReverse,
            ]}>
            <Text
              color={Colors.text.primary}
              fontSize={Fonts.size.xxxSmall}
              type={'bold'}>
              {strings.SUB_CATEGORY}
            </Text>
          </View>
          {/* checkboxes of sub category */}
          <Checkboxes
            subCategories={subcategoryCategories}
            selectedSubCategory={selectedSubCategory}
            categoryListIndex={categoryListIndex}
            handleSelectSubCategory={handleSelectSubCategory}
          />
        </View>
      )}
      {!_.isEmpty(selectedSubCategoryError) && (
        <Text
          type="medium"
          size={Fonts.size.xxSmall}
          textAlign={util.rtlRightText()}
          color={Colors.error.primary}
          style={[AppStyles.mTop10, AppStyles.mBottom5]}>
          {selectedSubCategoryError}
        </Text>
      )}
    </View>
  );
}
