import React from 'react';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './CheckboxesStyles';
import {Colors, Images, Fonts, AppStyles} from '../../theme';
import util from '../../util';

export default function CheckboxesView(props) {
  const {
    subCategories,
    selectedSubCategory,
    handleSelectSubCategory,
    categoryListIndex,
  } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={subCategories}
        //keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isSelected = item.isSelected;
          const activeSelectorImg = isSelected
            ? Images.TickCheckBox
            : Images.UnTickCheckBox;
          return (
            <TouchableOpacity
              onPress={() => {
                handleSelectSubCategory(item.id, categoryListIndex);
              }}>
              <View
                style={[
                  styles.mainViewStyle,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <RnImage
                  style={[styles.imageStyle, util.isRTL() && AppStyles.mLeft10]}
                  source={activeSelectorImg}
                />
                <Text
                  type="semiBold"
                  size={Fonts.size.xSmall}
                  style={styles.textStyle}>
                  {item.name[util.getLanguage()]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
