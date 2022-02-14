import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './FaqItemStyles';
import {Metrics, Images, Colors, Fonts, AppStyles} from '../../theme';
import util from '../../util';

export default function FaqItemView(props) {
  const {item, toggler, active} = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => toggler(item.id)}
        style={[styles.spacing, util.isRTL() && AppStyles.rowReverse]}>
        <Text style={styles.idTextStyle} type="semiBold">{`${
          util.isRTL() ? ` .${item.id}` : `${item.id}.`
        } `}</Text>
        <Text style={styles.questionText} type="semiBold">
          {item.title}
        </Text>

        <RnImage
          source={Images.UpArrowIcon}
          style={[styles.arrow, !active && styles.iconStyle, styles.icon]}
        />
      </TouchableOpacity>
      <View style={styles.hLine} />
      {active && (
        <>
          <View style={styles.descText}>
            <Text
              style={util.isRTL() && {textAlign: 'right'}}
              size={Fonts.size.xxSmall}
              type="semiBold"
              color={Colors.text.penta}>
              {item.description}
            </Text>
          </View>
          <View style={styles.hLine} />
        </>
      )}
    </View>
  );
}
