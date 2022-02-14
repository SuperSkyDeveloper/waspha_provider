import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './RejectModalStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';
import util from '../../util';

export default function RejectModalView(props) {
  const {
    items,
    selectedItem,
    onCheckboxItemPress,
    handleRejectSubmitBtn,
    isLoading,
  } = props;

  return (
    <View style={styles.container}>
      <Modal
        isVisible={true}
        style={{
          alignItems: 'center',
        }}
        onBackButtonPress={() => {
          props.closeModal();
        }}
        onBackdropPress={() => {
          props.closeModal();
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}
        style={{flex: 1}}>
        <View style={styles.editLocation}>
          <TouchableOpacity
            onPress={() => {
              props.closeModal();
            }}
            style={[styles.crossWrap, util.isRTL() && styles.crossWrapRtl]}>
            <Text type="medium" style={styles.crossText}>
              X
            </Text>
          </TouchableOpacity>

          <View style={styles.headTextWrap}>
            <Text
              type="semiBold"
              style={styles.headTextStyle}
              textAlign={util.rtlRightText()}>
              {strings.WHY_DO_YOU_WISH_TO_REJECT_THE_PROPOSAL}
            </Text>
          </View>
          {items.map((item) => {
            const isSelected = selectedItem.includes(item.id);
            const activeSelectorImg = isSelected
              ? Images.TickCheckBox
              : Images.UnTickCheckBox;
            return (
              <TouchableOpacity
                onPress={() => {
                  onCheckboxItemPress(item.id);
                }}>
                <View
                  style={[
                    styles.mainViewStyle,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <RnImage
                    style={styles.imageStyle}
                    source={activeSelectorImg}
                    tintColor={Colors.text.secondary}
                  />
                  <Text
                    type="semiBold"
                    size={Fonts.size.xSmall}
                    style={[
                      styles.textStyle,
                      util.isRTL() && AppStyles.mRight15,
                    ]}>
                    {item.value[util.getLanguage()]}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <Button
            onPress={handleRejectSubmitBtn}
            textStyle={styles.btnTextStyle}
            style={styles.btnStyle}
            isLoading={isLoading}
            disabled={isLoading}
            indicatorColor={Colors.loader.secondary}>
            {strings.SUBMIT}
          </Button>
        </View>
      </Modal>
    </View>
  );
}
