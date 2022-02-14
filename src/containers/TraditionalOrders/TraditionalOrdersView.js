import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  CustomNavbar,
  Loader,
  Text,
  WasphaOrderListingItem,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import styles from './TraditionalOrdersStyles';
export default function TraditionalOrdersView(props) {
  const {traditionalOrders, loading} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.WASPHA_ORDERS}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      {loading && <Loader loading={loading} />}
      {!loading && (
        <View style={[AppStyles.flex, AppStyles.mTop40]}>
          <FlatList
            data={traditionalOrders}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={{marginHorizontal: 15}}>
                  <WasphaOrderListingItem item={item} />
                </View>
              );
            }}
            ListEmptyComponent={
              <Text style={AppStyles.mTop30} textAlign="center">
                {strings.NO_ORDER_FOUNDS}
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
}
