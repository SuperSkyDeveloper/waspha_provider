import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  Switch,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Text, RiderListItem} from '../../components';
import styles from './AssignOfflineRiderStyles';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

const data = [
  {
    riderName: 'Rider ABC',
    riderNo: '+20 123546556',
  },
  {
    riderName: 'Rider ABC',
    riderNo: '+20 123546558',
  },
  {
    riderName: 'Rider ABC',
    riderNo: '+20 123546559',
  },
  {
    riderName: 'Rider ABC',
    riderNo: '+20 123546550',
  },
  {
    riderName: 'Rider ABC',
    riderNo: '+20 123546557',
  },
];

export default function AssignOfflineRiderView(props) {
  const {handleSwitchBtn, isSwitchActive} = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <ImageBackground style={styles.image} source={Images.RiderImage}>
          <View style={[AppStyles.flex]}>
            <Text
              textAlign={util.rtlRightText}
              color={Colors.text.secondary}
              size={Fonts.size.xxLarge}
              type="semiBold"
              style={styles.imageTextStyle}>
              {strings.ASSIGN.toLocaleUpperCase()}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              color={Colors.text.secondary}
              size={Fonts.size.xxxLarge}
              type="bold"
              style={styles.imageTextStyle}>
              {strings.OFFLINE.toLocaleUpperCase()}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              color={Colors.text.secondary}
              size={Fonts.size.xxLarge}
              type="semiBold"
              style={styles.imageTextStyle}>
              {strings.RIDER}
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* <View style={styles.switchFilterWrap}>
        <Text
          style={[AppStyles.mTop5]}
          type={'semiBold'}
          color={Colors.text.quaternary}
          size={Fonts.size.xxSmall}>
          {strings.VEHICLE_FILTER}
        </Text>
        <Switch
          trackColor={{
            false: Colors.button.tertiary,
            true: Colors.button.accent,
          }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitchBtn}
          value={isSwitchActive}
          style={util.isPlatformAndroid() ? styles.androidSize : styles.iosSize}
        />
      </View> */}

      <FlatList
        data={data}
        style={[AppStyles.mTop5]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({item}) => {
          return <RiderListItem item={item} />;
        }}
        ListEmptyComponent={
          <Text style={AppStyles.mTop30} textAlign="center">
            {strings.NO_ORDER_FOUNDS}
          </Text>
        }
      />
    </SafeAreaView>
  );
}
