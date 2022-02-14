import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Text, CustomNavbar, OrderListingItem, Loader} from '../../components';
import styles from './AcceptedOrdersStyles';
import {AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';

export default function AcceptedOrdersView(props) {
  const {
    acceptedOrders,
    enableVehicleIcon,
    showDeliveryMode,
    showCrossIconOfAccordian,
    enableUserInfoSec,
    shouldEnableContactOption,
    showPriceAndQtyOfItem,
    isLoading,
    onRefresh,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.ACCEPTED_ORDERS}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      {isLoading && (
        <View style={styles.listStyle}>
          <Loader loading={isLoading} />
        </View>
      )}

      {!isLoading && (
        <View style={styles.listStyle}>
          <FlatList
            data={acceptedOrders}
            showsVerticalScrollIndicator={false}
            onRefresh={() => onRefresh()}
            refreshing={isLoading}
            renderItem={({item, index}) => {
              return (
                <OrderListingItem
                  showDeliveryMode={true}
                  enableVehicleIcon={enableVehicleIcon}
                  showCrossIconOfAccordian={showCrossIconOfAccordian}
                  enableUserInfoSec={enableUserInfoSec}
                  shouldEnableContactOption={shouldEnableContactOption}
                  showPriceAndQtyOfItem={showPriceAndQtyOfItem}
                  fromLatestOrder={true}
                  item={item}
                  isUserChat={true}
                />
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
