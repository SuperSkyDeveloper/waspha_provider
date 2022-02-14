import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {Text, Button} from '../../components';
import styles from './ConfirmationModalStyles';
import {AppStyles, Colors, Fonts} from './../../theme';
import Modal from 'react-native-modal';
import util from '../../util';

export default function ConfirmationModalView(props) {
  const {
    title,
    successBtnPress,
    successBtnTitle,
    negativeBtnPress,
    isModalVisible,
    negativeBtnTitle,
    successBtnLoading,
    subTitle,
  } = props;
  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={negativeBtnPress}
      onBackdropPress={negativeBtnPress}>
      <View style={styles.modalWrap}>
        <Text
          size={Fonts.size.large}
          textAlign={util.rtlRightText()}
          color={Colors.text.secondary}
          type="bold">
          {title}
        </Text>
        {!_.isEmpty(subTitle) && (
          <Text
            style={AppStyles.mTop5}
            size={Fonts.size.normal}
            color={Colors.text.secondary}
            textAlign={util.rtlRightText()}
            type="medium">
            {subTitle}
          </Text>
        )}
        <View style={[{flexDirection: 'row'}, AppStyles.mTop20]}>
          <Button
            color={Colors.text.primary}
            textStyle={styles.btnTextStyle}
            style={AppStyles.flex}
            size={Fonts.size.normal}
            onPress={successBtnPress}
            isLoading={successBtnLoading}
            indicatorColor={Colors.text.secondary}
            disabled={successBtnLoading}
            type="semiBold">
            {successBtnTitle}
          </Button>
          <View style={AppStyles.mLeft15} />
          <Button
            color={Colors.text.primary}
            textStyle={styles.btnTextStyle}
            style={AppStyles.flex}
            size={Fonts.size.normal}
            onPress={negativeBtnPress}
            // isLoading={isLoading}
            indicatorColor={Colors.text.secondary}
            // disabled={isLoading}
            type="semiBold">
            {negativeBtnTitle}
          </Button>
        </View>
      </View>
    </Modal>
  );
}
