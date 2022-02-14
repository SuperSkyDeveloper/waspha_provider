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
  Loader,
  HTMLView,
} from '../../components';
import styles from './ProductsAndCategoriesStyles';
import {Images, Metrics, AppStyles, Colors, Fonts} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function ProductsAndCategoriesView(props) {
  const {
    categories,
    products,
    showNest,
    productLoader,
    productInitialReq,
    item,
  } = props;

  let isSingleCategory = categories.length === 1;

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.backWrap, util.isRTL() && styles.backWrapRtl]}>
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={[util.isRTL() && styles.imageStyleRtl, styles.imageStyle]}>
            <RnImage source={Images.BackBtn} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.overlay} />
          <RnImage
            source={util.categoryImagePlaceholder(item.image)}
            style={styles.headImage}
          />
        </View>
        <View style={[styles.showNestWrap]}>
          {/* <Text
            color={Colors.text.secondary}
            type="semiBold"
            size={Fonts.size.normal}
            numberOfLines={1}
            ellipsizeMode="head"
            textAlign={util.rtlRightText()}
            style={[{zIndex: 999}, AppStyles.flex]}>
            {!_.isEmpty(showNest) && showNest}
          </Text> */}

          <HTMLView
            style={[{zIndex: 999, colors: 'red'}, AppStyles.flex]}
            htmlContent={!_.isEmpty(showNest) && showNest}
            type="semiBold"
            size={Fonts.size.normal}
            numberOfLines={1}
            ellipsizeMode="head"
            textAlign={util.rtlRightText()}
            // color={Colors.white}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.firstSec,
              util.rtlRightText() && AppStyles.rowReverse,
            ]}>
            <TouchableOpacity
              onPress={() =>
                Actions.productAndCategoryForm({
                  isCategory: true,
                  mainCategory: item,
                })
              }
              style={[
                AppStyles.flexRow,
                styles.shadowStyle,
                styles.createCategoryWrap,
                {
                  justifyContent: 'center',
                  marginRight: Metrics.baseMargin,
                  flex: 2,
                },
              ]}>
              <RnImage
                source={Images.CircularPlusIcon}
                style={styles.plusIconStyle}
              />
              <Text style={styles.btnText}>{strings.CREATE_CATEGORY}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Actions.productAndCategoryForm({
                  mainCategory: item,
                })
              }
              style={[
                util.rtlRightText() && AppStyles.mRight20,
                styles.shadowStyle,
                styles.createCategoryWrap,
                {
                  flex: 1,
                  alignItems: 'center',
                },
              ]}>
              <Text style={styles.btnText}>{strings.ADD_PRODUCT}</Text>
            </TouchableOpacity>
          </View>
          {productLoader && (
            <View style={styles.listStyle}>
              <Loader loading={productLoader} />
            </View>
          )}
          {!productLoader && (
            <>
              <View style={styles.categorySec}>
                <FlatList
                  data={categories}
                  keyExtractor={(item, index) => item.id}
                  horizontal={!isSingleCategory}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View style={AppStyles.mRight15}>
                        <CategoriesList
                          item={item}
                          isFullWidth={isSingleCategory}
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
                  // ListEmptyComponent={
                  //   <Text style={styles.emptyComponent} textAlign="center">
                  //     {strings.NO_PRODUCTS_FOUND}
                  //   </Text>
                  // }
                />
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}
