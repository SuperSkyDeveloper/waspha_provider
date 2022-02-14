import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  VendorHeader,
  AmountDetailItem,
  Chart,
  ChartWhite,
  Loader,
} from '../../components';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './EarningDetailStyles';

export default function EarningDetailView(props) {
  const {
    ativeIndex,
    handleAccordinClick,
    vendorStoreEarning,
    isLoading,
    storeProfile,
  } = props;

  const tempEarning = [
    {
      earning_date: '2020-10-23T00:00:00.000Z',
      earning_day: 'Friday',
      total_earning: 600,
    },
    {
      earning_date: '2020-11-23T00:00:00.000Z',
      earning_day: 'Friday',
      total_earning: 100,
    },
    {
      earning_date: '2020-12-23T00:00:00.000Z',
      earning_day: 'Friday',
      total_earning: 1100,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VendorHeader
        showBackBtn={true}
        isAmountVisible={true}
        isTodayEarningVisible={true}
        data={{...vendorStoreEarning, ...storeProfile}}
      />

      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <>
          <View style={styles.dashboardSec}>
            <View style={styles.chartWrap}>
              {/* <ChartWhite data={tempEarning} /> */}
            </View>
            <View style={[styles.amountWrap]}>
              <FlatList
                data={util.EARNING_DETAIL()}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  let active = index === ativeIndex;
                  return (
                    <AmountDetailItem
                      item={item}
                      active={active}
                      index={index}
                      togglePress={handleAccordinClick}
                    />
                  );
                }}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
