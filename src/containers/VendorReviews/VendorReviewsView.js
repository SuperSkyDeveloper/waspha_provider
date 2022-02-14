import React from 'react';
import _ from 'lodash';
import {View, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import {
  Text,
  ReviewItem,
  VendorHeader,
  CustomNavbar,
  BackButton,
  Loader,
} from '../../components';
import styles from './VendorReviewsStyles';
import {AppStyles, Colors, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function VendorReviewsView(props) {
  const {reviews, isLoading, storeProfile} = props;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VendorHeader data={storeProfile} showBackBtn={true} />
      <View style={styles.ratingSec}>
        <View style={styles.wrap}>
          <Text
            size={Fonts.size.xxLarge}
            style={AppStyles.width100}
            textAlign={util.rtlRightText()}
            type="semiBold">
            {strings.REVIEWS}
          </Text>
        </View>
        {isLoading && <Loader loading={isLoading} />}
        {!isLoading && (
          <FlatList
            data={reviews.reviews_ratings}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <ReviewItem data={item} />;
            }}
            ListEmptyComponent={
              <Text style={AppStyles.mTop30} textAlign="center">
                {strings.REVIEW_NOT_FOUND}
              </Text>
            }
          />
        )}
      </View>
    </ScrollView>
  );
}
