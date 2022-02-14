import React from 'react';
import {View, Image as RnImage, StatusBar, FlatList} from 'react-native';
import {
  Text,
  CustomNavbar,
  TrendingProductsItem,
  CategoriesList,
  ProductItem,
} from '../../components';
import styles from './ItemListStyles';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';

export default function ItemListView(props) {
  const {
    itemList,
    title,
    fromTrending,
    trendingProducts,
    fromAddProduct,
    selectProduct,
  } = props;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <CustomNavbar
        title={title}
        titleColor={Colors.background.primary}
        hasBottomRadius={true}
        hasBack={true}
      />
      <View style={[styles.wrap]}>
        <FlatList
          data={itemList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return [
              fromTrending && (
                <TrendingProductsItem
                  item={item}
                  storeDetail={trendingProducts}
                />
              ),
              fromAddProduct && (
                <View
                  style={[
                    AppStyles.mRight10,
                    AppStyles.mLeft10,
                    AppStyles.mTop10,
                  ]}>
                  <ProductItem
                    item={item}
                    fromAddProduct={fromAddProduct}
                    selectProduct={selectProduct}
                  />
                </View>
              ),
              !fromTrending && !fromAddProduct && (
                <CategoriesList item={item} />
              ),
            ];
          }}
          ListEmptyComponent={
            <Text style={styles.emptyComponent} textAlign="center">
              {strings.NO_PRODUCTS_FOUND}
            </Text>
          }
        />
      </View>
    </View>
  );
}
