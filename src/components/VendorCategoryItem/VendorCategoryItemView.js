import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './VendorCategoryItemStyles';
import {Colors, Fonts} from './../../theme';
import LinearGradient from 'react-native-linear-gradient';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function VendorCategoryItemView(props) {
  const {data, onCategoryItemPress, index, categoryListIndex} = props;

  let isSelected = data.isSelected;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onCategoryItemPress(data.id, index, categoryListIndex);
      }}>
      <View style={styles.categoryImageWrap}>
        <LinearGradient
          start={{x: 0.2, y: 0.2}}
          end={{x: 0.9, y: 0.1}}
          colors={
            isSelected ? Colors.gradient.primary : Colors.gradient.secondary
          }
          style={styles.iconWrapStyle}>
          {!_.isEmpty(data.image) && (
            <RnImage
              source={{uri: data.image}}
              style={[
                styles.imgStyle,
                // isSelected && {tintColor: Colors.image.quaternary},
              ]}
            />
          )}
        </LinearGradient>
        <View>
          <Text
            fontSize={Fonts.size.xxSmall}
            type={'semiBold'}
            style={[styles.categoryName, {textAlign: 'center'}]}>
            {renderNameStringAndImageRender(data.name)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
