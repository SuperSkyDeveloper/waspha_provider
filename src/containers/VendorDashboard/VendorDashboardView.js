import React from 'react';
import _, {filter} from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Text,
  DashboardHeader,
  AmountItem,
  Chart,
  DaysListItem,
  ChartWhite,
  Loader,
} from '../../components';
import styles from './VendorDashboardStyles';
import {Colors, Fonts, AppStyles, Images} from './../../theme';
import {strings} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import util from '../../util';

export default function VendorDashboardView(props) {
  const {
    vendorStoreEarning,
    storeDashboard,
    isLoading,
    filterValue,
    handleFilterPress,
    handleEarningFilterOpt,
    currencyCode,
  } = props;

  // let sortedEarnings = _.sortBy(storeDashboard.earning, [
  //   function (item) {
  //     return item.earning_date;
  //   },sortedEarnings
  // ]).slice(0, 6);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DashboardHeader />
      <TouchableOpacity
        onPress={() => {
          handleEarningFilterOpt('show');
        }}
        style={[styles.selectWrap]}>
        <Text textAlign={util.rtlRightText()} type="medium">
          {filterValue.title}
        </Text>
        <View style={[!util.isRTL() && {alignItems: 'flex-end'}]}>
          <RnImage source={Images.BackBtn} style={[styles.downBtnStyle]} />
        </View>
      </TouchableOpacity>
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <>
          <View style={styles.chartSec}>
            <Text
              size={Fonts.size.small}
              color={Colors.text.quaternary}
              type="medium"
              textAlign="center">
              {filterValue.title}
            </Text>
            <AmountItem
              amount={storeDashboard.todays_earning}
              currencyCode={currencyCode}
            />
          </View>
          <View style={AppStyles.mTop20}>
            <ChartWhite data={storeDashboard.earning} />
          </View>
          <View style={styles.listWrap}>
            <FlatList
              keyExtractor={(item, index) => `${item.earning_day} + ${index}`}
              data={storeDashboard.earning}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <DaysListItem
                    item={item}
                    filterValue={filterValue}
                    currencyCode={currencyCode}
                  />
                );
              }}
            />
          </View>
        </>
      )}

      <RBSheet
        ref={(ref) => {
          props.refRBSheet(ref);
        }}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000009e',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {util.EARNING_FILTER().map((item) => {
          return (
            <TouchableOpacity
              style={styles.optionWrap}
              onPress={() => {
                handleFilterPress(item);
              }}>
              <Text textAlign={util.rtlRightText()} type="medium">
                {item && item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </RBSheet>
    </ScrollView>
  );
}
