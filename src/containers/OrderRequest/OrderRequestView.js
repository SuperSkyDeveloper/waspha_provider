import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Text, CustomNavbar, OrderRequestItem, Loader} from '../../components';
import styles from './OrderRequestStyles';
import {AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';

export default function OrderRequestView(props) {
  const {rfpListing, isLoading, onRefresh} = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.ORDER_REQUEST}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <View style={styles.orderListStyle}>
          <FlatList
            data={rfpListing}
            showsVerticalScrollIndicator={false}
            onRefresh={onRefresh}
            refreshing={isLoading}
            renderItem={({item, index}) => {
              return <OrderRequestItem item={item} onPress={onRefresh} />;
            }}
            ListEmptyComponent={
              <Text style={AppStyles.emptyComponent} textAlign="center">
                {strings.NO_ORDER_FOUND}
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
}
