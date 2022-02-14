import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  SearchBar,
  StoreDashboardSearch,
  CustomNavbar,
  TrendingProductsItem,
  CategoriesList,
  ProductItem,
  Loader,
} from '../../components';
import styles from './StoreMenuStyles';
import {strings, LIST_ITEMS_COUNT} from '../../constants';
import {Colors, Fonts, Metrics, AppStyles} from '../../theme';
import {filterUncategorizeProduct} from '../../helpers/generalHelper';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function StoreMenuView(props) {
  const {
    trendingProductsList,
    rootCategoriesList,
    onSearchText,
    searchText,
    trendingPrdLoading,
    mainCategoryLoading,
    setValue,
    searchLoader,
    storeDetail,
    storeProfile,
    products,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={renderNameStringAndImageRender(storeProfile.name)}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View style={styles.searchWrap}>
            <StoreDashboardSearch
              onInputPress={() => {
                Actions.searchProductAndCategory({
                  isForSearch: true,
                });
              }}
            />
          </View>
          {/* trending sec start */}
          <View style={styles.trendingSec}>
            <View
              style={[
                styles.headingWrap,
                util.isRTL() && AppStyles.rowReverse,
                util.isRTL() && AppStyles.mLeft15,
              ]}>
              <Text
                size={Fonts.size.normal}
                color={Colors.text.seca}
                type="semiBold"
                textAlign={util.rtlRightText()}>
                {strings.TRENDING_PRODUCTS}
              </Text>
              {trendingProductsList &&
                trendingProductsList.length > LIST_ITEMS_COUNT && (
                  <TouchableOpacity
                    onPress={() => {
                      Actions.itemList({
                        itemList: trendingProductsList,
                        fromTrending: true,
                        title: strings.TRENDING_PRODUCTS,
                      });
                    }}>
                    <Text
                      size={Fonts.size.xxxxSmall}
                      size={Fonts.size.xSmall}
                      color={Colors.text.peca}
                      type="semiBold">
                      {strings.SEE_ALL} ({trendingProductsList.length})
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
            {trendingPrdLoading && <Loader loading={trendingPrdLoading} />}
            {!trendingPrdLoading && (
              <FlatList
                data={
                  trendingProductsList &&
                  trendingProductsList.slice(0, LIST_ITEMS_COUNT)
                }
                horizontal={true}
                contentContainerStyle={styles.flatContainer}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <TrendingProductsItem
                      storeDetail={storeDetail}
                      item={item}
                      horizontal={true}
                    />
                  );
                }}
                // ListEmptyComponent={
                //   <Text
                //     size={Fonts.size.xSmall}
                //     style={styles.emptyComponent}
                //     textAlign="center">
                //     {strings.NO_TRENDING_PRODUCTS_FOUND}
                //   </Text>
                // }
              />
            )}
          </View>
          {/* trending sec end */}

          <View
            style={[styles.trendingSec, {marginTop: Metrics.doubleBaseMargin}]}>
            {!_.isEmpty(rootCategoriesList) && (
              <View
                style={[
                  styles.headingWrap,
                  util.isRTL() && AppStyles.rowReverse,
                  util.isRTL() && AppStyles.mLeft15,
                ]}>
                <Text
                  size={Fonts.size.normal}
                  color={Colors.text.seca}
                  type="semiBold"
                  textAlign={util.rtlRightText()}>
                  {strings.CATEGORIES}
                </Text>
                {rootCategoriesList.length > LIST_ITEMS_COUNT && (
                  <TouchableOpacity
                    onPress={() => {
                      Actions.itemList({
                        itemList: rootCategoriesList,
                        title: strings.CATEGORIES,
                      });
                    }}>
                    <Text
                      size={Fonts.size.xxxxSmall}
                      color={Colors.text.peca}
                      type="semiBold">
                      {strings.SEE_ALL} ({rootCategoriesList.length})
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            <View style={AppStyles.mRight15}>
              {mainCategoryLoading && <Loader loading={mainCategoryLoading} />}
              {!mainCategoryLoading && (
                <>
                  <FlatList
                    data={rootCategoriesList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <CategoriesList
                          item={item}
                          editable={true}
                          deleteable={true}
                        />
                      );
                    }}
                    // ListEmptyComponent={
                    //   <Text
                    //     style={styles.emptyComponent}
                    //     size={Fonts.size.xSmall}
                    //     textAlign="center">
                    //     {strings.NO_CATEGORY_FOUND}
                    //   </Text>
                    // }
                  />

                  {/* uncategorize product start */}

                  {!_.isEmpty(products) && (
                    <View>
                      {/* <View
                        style={[
                          styles.headingWrap,
                          AppStyles.mTop10,
                          util.isRTL() && AppStyles.rowReverse,
                        ]}>
                        <Text
                          size={Fonts.size.normal}
                          color={Colors.text.seca}
                          type="semiBold"
                          textAlign={util.rtlRightText()}>
                          {strings.UNCATEGORISED_PRODUCT}
                        </Text>
                      </View> */}
                      <FlatList
                        data={filterUncategorizeProduct(products)}
                        keyExtractor={(item, index) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          return (
                            <View style={AppStyles.mRight15}>
                              <ProductItem
                                isEdit={true}
                                item={item}
                                deleteable={true}
                                editable={true}
                              />
                            </View>
                          );
                        }}
                        // ListEmptyComponent={
                        //   <Text
                        //     style={styles.emptyComponent}
                        //     textAlign="center">
                        //     {strings.NO_PRODUCTS_FOUND}
                        //   </Text>
                        // }
                      />
                    </View>
                  )}
                  {/* uncategorize product end */}
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
