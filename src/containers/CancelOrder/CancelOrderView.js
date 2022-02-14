import React from 'react';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Text, CustomNavbar, TextInput, Button} from '../../components';
import styles from './CancelOrderStyles';
import {strings} from '../../constants';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import util from '../../util';

export default function CancelOrderView(props) {
  const {cancelOrderPoints, setValue, description, loading} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.CANCEL_ORDER}
        titleColor={Colors.white}
        hasBottomRadius={true}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentSec}>
          <View style={styles.questionStyleWrap}>
            <Text
              style={[
                util.isRTL() && {textAlign: 'right'},
                styles.questionStyle,
              ]}>
              {strings.WHY_CANCEL_ORDER}
              {util.isRTL() ? '؟' : '?'}
            </Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.list}>
              <FlatList
                data={cancelOrderPoints}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  const isItemSelected = props.selectedItems.includes(item.id);
                  return (
                    <TouchableOpacity
                      style={styles.itemWrap}
                      onPress={() => props.handleItemSelect(item.id)}>
                      <View
                        style={[
                          util.isRTL()
                            ? AppStyles.rowReverse
                            : AppStyles.flexRow,
                          styles.itemParent,
                        ]}>
                        <View
                          style={[
                            util.isRTL() ? {marginLeft: 12} : {marginRight: 12},
                            styles.radioBtn,
                          ]}>
                          <RnImage
                            source={
                              isItemSelected
                                ? Images.TickCheckBox
                                : Images.UnTickCheckBox
                            }
                            style={
                              (styles.checkBox,
                              {tintColor: Colors.resolutionBlue})
                            }
                          />
                        </View>
                        <View style={styles.contentTextWrap}>
                          <Text style={styles.contentTextStyle} size={12}>
                            {util.isRTL() ? item.value.ar : item.value.en}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            multiline={true}
            textAlign={util.isRTL() ? 'right' : 'left'}
            inputStyle={[styles.inputStyle]}
            labelStyle={styles.labelStyle}
            label={strings.ADD_DESCRP}
            style={[
              styles.addressInputWrap,
              util.isRTL() ? {paddingRight: 14} : {paddingLeft: 14},
            ]}
            value={description}
            onChangeText={(value) => {
              setValue({description: value});
            }}
          />
        </View>

        <View style={styles.submitBtnWrap}>
          <Button
            isLoading={loading}
            disabled={loading}
            color={Colors.white}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            onPress={props.handleSubmit}>
            {strings.SUBMIT}
          </Button>
        </View>

        <View style={styles.cancelBtnWrap}>
          <Button
            color={Colors.white}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            onPress={() => {
              Actions.pop();
            }}>
            {strings.CANCEL.toUpperCase()}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
