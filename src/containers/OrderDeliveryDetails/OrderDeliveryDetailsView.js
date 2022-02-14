import React from 'react';
import {View, Image as RnImage, FlatList, ScrollView} from 'react-native';
import {
  Text,
  CustomNavbar,
  DateItem,
  RiderDetailBottomSheet,
} from '../../components';
import styles from './OrderDeliveryDetailsStyles';
import {strings, DATE_FORMAT2, PLACED_ORDER_TYPE} from '../../constants';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function OrderDeliveryDetailsView(props) {
  const {data} = props;
  console.log({data});
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${strings.DELIVERY_DETAILS}`}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        showstyle={styles.listWrap}>
        <View style={styles.contentSec}>
          <FlatList
            data={data.order_flow}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (
                data.order_type === PLACED_ORDER_TYPE.TRADITIONAL &&
                (item.id === 2 || item.id === 3)
              ) {
                return;
              }
              return (
                <View style={styles.detailsWrap}>
                  <Text
                    textAlign={util.rtlRightText()}
                    style={[
                      AppStyles.mLeft30,
                      AppStyles.mTop20,
                      util.isRTL() && styles.textStyle,
                    ]}
                    type="semiBold"
                    size={Fonts.size.xSmall}>
                    {`    ${item.title}`}
                  </Text>
                  <View
                    style={[
                      styles.valueSec,
                      util.isRTL() && AppStyles.rowReverse,
                      util.isRTL() && AppStyles.mLeft30,
                      ,
                    ]}>
                    {item.status ? (
                      <RnImage
                        style={[
                          styles.imageStyle,
                          util.isRTL() && AppStyles.mLeft20,
                        ]}
                        tintColor={Colors.image.secondary}
                        source={Images.TickCheckBox}
                      />
                    ) : (
                      <RnImage
                        style={styles.imageStyle}
                        tintColor={Colors.image.secondary}
                        source={Images.UnTickCheckBox}
                      />
                    )}
                    <View style={styles.dateViewWrap}>
                      {true && (
                        <DateItem
                          imageStyle={styles.imageStyleOfDateItem}
                          date={ISOToFormat(item.date, DATE_FORMAT2)}
                          fontSize={Fonts.size.xxxxSmall}
                          dateTimeStyle={styles.dateStyle}
                          color={Colors.text.quaternary}
                        />
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <RiderDetailBottomSheet fromDetails={true} data={data} />
      </ScrollView>
    </View>
  );
}
