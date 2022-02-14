import React from 'react';
import _ from 'lodash';
import styles from './TextMessageStyles';
import {View} from 'react-native';
import RCUtils from '../../RCUtils';
import {TIME_FORMAT1} from '../../RCConstants';
import {Text} from '../../RCComponents';
import {Colors, Fonts} from '../../RCTheme/';
import {AppStyles} from '../../../theme';
import {HTMLView} from '../../../components';
export default function TextMessageView(props) {
  const {isMyMsg, item} = props;
  return (
    <View style={styles.chatWrap}>
      {isMyMsg && (
        <View style={AppStyles.mBottom15}>
          <View style={[styles.triangle, styles.trianglePositionOther]} />
          <View style={[styles.otherMessages, styles.myMessage]}>
            {/* <Text
              style={styles.flexWrap}
              color={Colors.white}
              textAlign="right"
              size={Fonts.size.small}>{`${item.msg}`}</Text> */}
            <HTMLView
              htmlContent={`${item.msg}`}
              size={Fonts.size.xxSmall}
              color={Colors.white}
              textAlign="right"
            />
          </View>
          <Text
            type={'medium'}
            style={[styles.timingsWrap, AppStyles.mTop5]}
            color={Colors.trout}
            size={Fonts.size.xxxSmall}>
            {`${RCUtils.ISOToFormat(
              item._updatedAt.$date ? item._updatedAt.$date : item._updatedAt,
              TIME_FORMAT1,
            )}`}
          </Text>
        </View>
      )}
      {!isMyMsg && (
        <View style={AppStyles.mBottom15}>
          <Text style={AppStyles.mLeft15}>
            {_.capitalize(item.u.username.split('_')[0])}
          </Text>
          <View style={[styles.triangle, styles.trianglePosition]} />
          <View style={[styles.otherMessages, styles.otherMessage]}>
            {/* <Text
              style={styles.flexWrap}
              color={Colors.trout}
              size={Fonts.size.small}>{`${item.msg}`}</Text> */}
            <HTMLView
              htmlContent={`${item.msg}`}
              size={Fonts.size.xxSmall}
              color={Colors.trout}
              textAlign="right"
            />
          </View>
          <Text
            type={'medium'}
            style={[styles.timingsWrap, AppStyles.mTop5]}
            color={Colors.trout}
            size={Fonts.size.xxxSmall}>
            {`${RCUtils.ISOToFormat(
              item._updatedAt.$date ? item._updatedAt.$date : item._updatedAt,
              TIME_FORMAT1,
            )}`}
          </Text>
        </View>
      )}
    </View>
  );
}
