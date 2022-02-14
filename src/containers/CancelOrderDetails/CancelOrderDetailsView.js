import React from 'react';
import {View, Image as RnImage, FlatList, ScrollView} from 'react-native';
import {Text, CustomNavbar} from '../../components';
import styles from './CancelOrderDetailsStyles';
import {strings} from '../../constants';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import util from '../../util';

export default function CancelOrderDetailsView(props) {
  const {data} = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${strings.CANCELLATION_DETAILS}`}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      <ScrollView>
        <View
          style={[AppStyles.mTop20, AppStyles.mLeft30, AppStyles.mBottom10]}>
          <Text
            type="semiBold"
            size={Fonts.size.medium}
            color={Colors.text.primary}
            textAlign={util.rtlRightText()}>
            {strings.REASON_FOR_ORDER_CANCELLING}
          </Text>

          <FlatList
            style={[AppStyles.mTop5]}
            data={data.cancellation && data.cancellation.reasons}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const activeImg = Images.TickCheckBox;

              return (
                <>
                  <View style={styles.reasonSecWrap}>
                    <RnImage
                      tintColor={Colors.image.accent}
                      style={styles.imageStyle}
                      source={activeImg}
                    />
                    o
                    <Text
                      style={[AppStyles.mLeft10]}
                      size={Fonts.size.xxSmall}
                      type={'semiBold'}
                      color={Colors.text.hexa}>
                      {item.value}
                    </Text>
                  </View>
                </>
              );
            }}
            ListEmptyComponent={
              <Text style={AppStyles.mTop30} textAlign="center">
                {strings.NO_REASON_FOUND}
              </Text>
            }
          />
          {util.isEmpty(data.cancellation) && (
            <View style={[AppStyles.mTop60]}>
              <Text
                type="semiBold"
                size={Fonts.size.medium}
                color={Colors.text.primary}>
                {strings.OTHER_REASON}
              </Text>

              <View style={styles.otherReasonWrap}>
                <Text style={styles.otherReasonText}>
                  {data.cancellation && data.cancellation.other_reason}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
