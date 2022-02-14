import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {HTMLView, Text, TimerCounter} from '..';
import styles from './ProposalCenterListItemStyles';
import {Fonts, Metrics, Colors, AppStyles} from '../../theme';
import {DateItem} from '..';
import {ISOToFormat} from '../../helpers/generalHelper';
import {strings, DATE_FORMAT2, DUMMY_TEXT} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function ProposalCenterListItemView(props) {
  const {item, totalDuration} = props;

  const handleTimer = () => {
    if (props.totalDuration) {
      return <TimerCounter time={totalDuration} />;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        Actions.proposalCenterDetails({
          id: item.id,
          title: strings.PROPOSAL_CENTER,
        });
      }}
      style={styles.container}>
      <View style={styles.cardWrap}>
        <View
          style={[styles.orderCodeSec, util.isRTL() && AppStyles.rowReverse]}>
          <View style={util.isRTL() && AppStyles.mRight15}>
            <Text
              textAlign={util.rtlRightText()}
              style={[styles.orderCodeTextStyle, AppStyles.mBottom5]}>{`${
              strings.ORDER_CODE
            }: ${util.checkIsEmpty(item.id)}`}</Text>
            <Text
              style={[styles.orderCodeTextStyle, AppStyles.mBottom5]}
              textAlign={util.rtlRightText()}>{`${
              strings.REQUEST_CODE
            } : ${util.checkIsEmpty(item.request_code)}`}</Text>
            <View style={util.isRTL() && {marginLeft: 'auto'}}>
              <DateItem
                date={ISOToFormat(item.order_date, DATE_FORMAT2)}
                fontSize={Fonts.size.xxxxSmall}
                dateTimeStyle={[
                  styles.dateStyle,
                  util.isRTL() && AppStyles.mLeft0,
                ]}
                color={Colors.text.primary}
              />
            </View>
          </View>

          <View style={util.isRTL() && AppStyles.mLeft15}>
            {item.revision_number === 0 && (
              <View
                style={[
                  AppStyles.mTop15,
                  AppStyles.mRight10,
                  AppStyles.mBottom10,
                ]}>
                {handleTimer()}
              </View>
            )}
            <View style={styles.deliveryStatus}>
              <Text
                type="semiBold"
                style={styles.deliveryTypeText}>{`${util.checkIsEmpty(
                util.capitalizeFirstLetter(item.type),
              )}`}</Text>
            </View>
            {item.is_revised && (
              <View style={[styles.deliveryStatus, AppStyles.mTop10]}>
                <Text type="semiBold" style={styles.deliveryTypeText}>
                  {strings.REVISED}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* <Text style={styles.proposalDetailStyle} textAlign={util.rtlRightText()}>
        {util.checkIsEmpty(item.description)}
      </Text> */}
      <View
        style={{
          marginLeft: Metrics.mediumBaseMargin,
          paddingBottom: Metrics.baseMargin,
          marginHorizontal: Metrics.smallMargin,
        }}>
        <HTMLView
          htmlContent={util.checkIsEmpty(item.description)}
          textAlign={util.rtlRightText()}
          size={Fonts.size.xxxSmall}
          color={Colors.text.hexa}
        />
      </View>
    </TouchableOpacity>
  );
}
