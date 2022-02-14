import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  CustomNavbar,
  Loader,
  PromoCodeItem,
  TabsHeader,
  Text,
  TimerCounter,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './PromoCodesStyles';
export default function PromoCodesView(props) {
  const {
    handleTabIndex,
    getTabData,
    activeTabIndex,
    generalPromos,
    myPromos,
    loading,
  } = props;
  return (
    <View style={styles.container}>
      <TabsHeader
        activeTabIndex={activeTabIndex}
        tabList={util.PROMO_TABS()}
        headerMainText={strings.PROMO}
        headerSubText={strings.CODES}
        handleTabIndex={handleTabIndex}
      />

      {loading && (
        <View style={styles.content}>
          <Loader loading={loading} />
        </View>
      )}
      {!loading && (
        <View style={styles.content}>
          {activeTabIndex === 0 && (
            <FlatList
              data={generalPromos}
              showsVerticalScrollIndicator={false}
              onRefresh={() => getTabData('general')}
              refreshing={loading}
              renderItem={({item}) => {
                return <PromoCodeItem item={item} />;
              }}
              ListEmptyComponent={
                <Text style={AppStyles.mTop30} textAlign="center">
                  {strings.NO_PROMO_CODES_FOUND}
                </Text>
              }
            />
          )}
          {activeTabIndex === 1 && (
            <FlatList
              data={myPromos}
              showsVerticalScrollIndicator={false}
              onRefresh={() => getTabData('specific')}
              refreshing={loading}
              renderItem={({item}) => {
                return <PromoCodeItem item={item} />;
              }}
              ListEmptyComponent={
                <Text style={AppStyles.mTop30} textAlign="center">
                  {strings.NO_PROMO_CODES_FOUND}
                </Text>
              }
            />
          )}
        </View>
      )}
    </View>
  );
}
