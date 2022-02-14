import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Text, OrderListingItem, TabsHeader, Loader} from '../../components';
import styles from './LatestOrdersStyles';
import {Fonts, Colors, Images, AppStyles} from '../../theme';
import {LATEST_ORDER_STATUS, strings, TAB_LIST} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function LatestOrdersView(props) {
  const {
    activeTabIndex,
    handleTabIndex,
    orders,
    assignedOrders,
    completedOrders,
    cancelledOrders,
    showDeliveryMode,
    showCrossIconOfAccordian,
    enableUserInfoSec,
    shouldEnableContactOption,
    showPriceAndQtyOfItem,
    isLoading,
    onRefresh,
  } = props;

  return (
    <View style={AppStyles.flex}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        {/* header start */}
        {/* <LinearGradient
          start={{x: 0, y: 2.1}}
          end={{x: 3, y: 0}}
          colors={Colors.gradient.primary}
          style={styles.header}>
          <TouchableOpacity
            style={[styles.backWrap, util.isRTL() && styles.backWrapRtl]}
            onPress={() => {
              Actions.pop();
            }}>
            <RnImage
              source={Images.BackBtn}
              style={[util.isRTL() && styles.backBtnRtl]}
            />
          </TouchableOpacity>
          <Text
            size={Fonts.size.large}
            color={Colors.text.secondary}
            type="bold"
            textAlign="center">
            {`${strings.LATEST}
${strings.ORDERS}`}
          </Text>
          <View style={styles.tabSec}>
            {util.TAB_LIST().map((item, index) => {
              const active = index === activeTabIndex;
              return (
                <TouchableOpacity
                  key={item.title}
                  style={[styles.tabWrap, active && styles.active]}
                  onPress={() => {
                    handleTabIndex(index);
                  }}>
                  <Text
                    size={Fonts.size.xSmall}
                    color={Colors.text.secondary}
                    type="medium"
                    style={active && styles.opacity}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient> */}

        <TabsHeader
          activeTabIndex={activeTabIndex}
          tabList={util.TAB_LIST()}
          headerMainText={strings.LATEST}
          headerSubText={strings.ORDERS}
          handleTabIndex={handleTabIndex}
        />

        {isLoading && (
          <View style={styles.content}>
            <Loader loading={isLoading} />
          </View>
        )}
        {!isLoading && (
          <View style={styles.content}>
            {activeTabIndex === 0 && (
              <FlatList
                data={assignedOrders}
                showsVerticalScrollIndicator={false}
                onRefresh={() => onRefresh(0)}
                refreshing={isLoading}
                renderItem={({item}) => {
                  return (
                    <OrderListingItem
                      // showDeliveryMode={showDeliveryMode}
                      showCrossIconOfAccordian={showCrossIconOfAccordian}
                      enableUserInfoSec={enableUserInfoSec}
                      shouldEnableContactOption={shouldEnableContactOption}
                      showPriceAndQtyOfItem={showPriceAndQtyOfItem}
                      item={item}
                      fromLatestOrder={true}
                      isCameFrom={LATEST_ORDER_STATUS.ASSIGNED}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_ORDER_FOUNDS}
                  </Text>
                }
              />
            )}
            {activeTabIndex === 1 && (
              <FlatList
                data={completedOrders}
                showsVerticalScrollIndicator={false}
                onRefresh={() => onRefresh(1)}
                refreshing={isLoading}
                renderItem={({item}) => {
                  return (
                    <OrderListingItem
                      // showDeliveryMode={showDeliveryMode}
                      showCrossIconOfAccordian={showCrossIconOfAccordian}
                      enableUserInfoSec={enableUserInfoSec}
                      shouldEnableContactOption={shouldEnableContactOption}
                      showPriceAndQtyOfItem={showPriceAndQtyOfItem}
                      item={item}
                      fromLatestOrder={true}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_ORDER_FOUNDS}
                  </Text>
                }
              />
            )}
            {activeTabIndex === 2 && (
              <FlatList
                data={cancelledOrders}
                showsVerticalScrollIndicator={false}
                onRefresh={() => onRefresh(2)}
                refreshing={isLoading}
                renderItem={({item}) => {
                  return (
                    <OrderListingItem
                      // showDeliveryMode={showDeliveryMode}
                      showCrossIconOfAccordian={showCrossIconOfAccordian}
                      enableUserInfoSec={enableUserInfoSec}
                      shouldEnableContactOption={shouldEnableContactOption}
                      showPriceAndQtyOfItem={showPriceAndQtyOfItem}
                      item={item}
                      fromLatestOrder={true}
                    />
                  );
                }}
                ListEmptyComponent={
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_ORDER_FOUNDS}
                  </Text>
                }
              />
            )}
          </View>
        )}
        {/* header end */}
      </View>
    </View>
  );
}
