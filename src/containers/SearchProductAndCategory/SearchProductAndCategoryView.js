import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import {
  Text,
  CategoriesList,
  ProductItem,
  BackButton,
  StoreDashboardSearch,
  CustomNavbar,
} from '../../components';
import styles from './SearchProductAndCategoryStyles';
import {Images, Metrics, AppStyles, Colors, Fonts} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function SearchProductAndCategoryView(props) {
  const {
    categories,
    products,
    showNest,
    isForSearch,
    onSearchText,
    searchText,
    searchLoader,
    setValue,
    handleClearSearch,
    isClearSearchBtn,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.SEARCH}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      <View style={styles.searchWrap}>
        <StoreDashboardSearch
          onSearchText={onSearchText}
          searchText={searchText}
          showFilter={true}
          setValue={setValue}
          isLoading={searchLoader}
          onSearchClear={handleClearSearch}
          isSearchCleanBtn={isClearSearchBtn}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categorySec}>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              let isFullWidth = categories.length === 1;
              return (
                <View style={AppStyles.mRight15}>
                  <CategoriesList
                    item={item}
                    isFullWidth={isFullWidth}
                    nest={showNest}
                    editable={true}
                    deleteable={true}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={styles.productSec}>
          <FlatList
            data={products}
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
            ListEmptyComponent={
              <Text style={styles.emptyComponent} textAlign="center">
                {isForSearch ? '' : strings.NO_PRODUCTS_FOUND}
              </Text>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}
