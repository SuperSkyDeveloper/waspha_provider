import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './QuantityInputStyles';
import {Fonts, Colors} from '../../theme';

export default function QuantityInputView(props) {
  const {itemQuantity, handleIncrement, handleDecrement, dark,fromOrderPlace} = props;
  return (
    <View style={[styles.quantitySec, dark&& !fromOrderPlace&&styles.darkStyle]}>
      {/* decrement */}
      <TouchableOpacity onPress={handleDecrement}>
        <View style={styles.decrementRoundBtnWrap}>
          <View style={[styles.roundBtnStyle, dark && styles.darkRoundBtn]}>
            <Text
              color={dark ? Colors.text.secondary : Colors.text.primary}
              style={{lineHeight: 20}}
              size={Fonts.size.normal}
              type="bold"
              textAlign="center">
              -
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* quantity */}
      <View style={styles.quantityWrap}>
        <Text
          size={dark ? Fonts.size.normal : Fonts.size.normal}
          color={dark ? Colors.text.secondary : Colors.text.primary}
          style={styles.quantityTextStyle}
          type="medium">
          {itemQuantity}
        </Text>
      </View>

      {/* increment */}
      <TouchableOpacity onPress={handleIncrement}>
        <View style={styles.incrementRoundBtnWrap}>
          <View style={[styles.roundBtnStyle, dark && styles.darkRoundBtn]}>
            <Text
              style={{lineHeight: 20}}
              color={dark ? Colors.text.secondary : Colors.text.primary}
              size={Fonts.size.normal}
              type="bold"
              textAlign="center">
              +
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
