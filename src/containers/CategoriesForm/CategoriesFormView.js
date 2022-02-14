import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  CustomNavbar,
  StoreDashboardSearch,
  Loader,
  HTMLView,
} from '../../components';
import styles from './CategoriesFormStyles';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts} from '../../theme';
import style from '../../components/PhoneInput/style';
import util from '../../util';
import {
  arabicEnglishCategoryText,
  renderNameStringAndImageRender,
} from '../../helpers/multilingualHelper';

export default function CategoriesFormView(props) {
  const {
    showCategories,
    getCategoriesNest,
    searchText,
    onSearchText,
    isLoading,
    categories,
    parentCategories,
    hasChild,
    getSubCategory,
    setValue,
    showSearchCategory,
    handleClearSearch,
    fromArabicForm,
  } = props;
  const renderCategoryByLevel = (parentID = null) => {
    const temp = getSubCategory(categories, parentID);
    return temp.map((category) => {
      return renderCategoryItem(category);
    });
  };

  const renderCategoryItem = (category) => {
    return (
      <View
        style={[
          styles.categoryContainer,

          [
            util.isRTL() || fromArabicForm
              ? [
                  styles.categoryContainerRtl,
                  {marginRight: 10, paddingRight: 10},
                ]
              : {paddingLeft: 14},
          ],
        ]}>
        <TouchableOpacity
          onPress={() => getCategoriesNest(category)}
          style={[
            styles.categoryStyle,
            [(util.isRTL() || fromArabicForm) && AppStyles.rowReverse],
          ]}>
          {/* <Text
            type="medium"
            style={[styles.categoryText]}
            textAlign={util.rtlRightText()}>
            {arabicEnglishCategoryText(category.name, fromArabicForm)}
          </Text> */}

          <HTMLView
            htmlContent={arabicEnglishCategoryText(
              category.name,
              fromArabicForm,
            )}
            type="medium"
            style={[styles.categoryText]}
            textAlign={util.rtlRightText()}
          />
        </TouchableOpacity>
        {hasChild(category.id) && renderCategoryByLevel(category.id)}
      </View>
    );
  };

  // use this function to show search cateory
  const renderSearchCategory = () => {
    return categories.map((item) => {
      return (
        <View
          style={[
            styles.categoryContainer,
            [(util.isRTL() || fromArabicForm) && styles.categoryContainerRtl],
          ]}>
          <TouchableOpacity
            onPress={() => getCategoriesNest(item)}
            style={[
              styles.categoryStyle,
              [(util.isRTL() || fromArabicForm) && AppStyles.rowReverse],
            ]}>
            <Text
              type="medium"
              style={[styles.categoryText]}
              textAlign={util.isRTL() || fromArabicForm ? 'right' : 'left'}>
              {arabicEnglishCategoryText(item.name)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${strings.CATEGORIES}`}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.categoryWrap}
          enableOnAndroid
          scrollEnabled
          //keyboardShouldPersistTaps="always"
        >
          <>
            <View style={styles.searchWrap}>
              <StoreDashboardSearch
                fromArabicForm={fromArabicForm}
                onSearchText={onSearchText}
                searchText={searchText}
                setValue={(text) => {
                  setValue({searchText: text});
                }}
                onSearchClear={handleClearSearch}
                isSearchCleanBtn={showSearchCategory}
              />
            </View>

            {showSearchCategory
              ? renderSearchCategory()
              : renderCategoryByLevel()}
          </>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
