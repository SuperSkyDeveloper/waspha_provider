import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from '..';
import styles from './SelectLanguageModalStyles';
import {Colors, Fonts, AppStyles, Metrics, Images} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
export default function SelectLanguageModalView(props) {
  const {isModalOpen, closeModal, modalType, handleLangSelect} = props;
  return (
    <View>
      <Modal
        isVisible={isModalOpen}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}>
        <View style={styles.modalStyle}>
          <RnImage source={Images.LanguageModal} />
        </View>
        <View style={styles.contentWrap}>
          <View style={styles.selectLanguageWrap}>
            <Text
              type="bold"
              size={Fonts.size.medium}
              color={Colors.text.secondary}>
              {strings.SELECT_LANGUAGE}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleLangSelect('en');
            }}
            style={[styles.contentSec]}>
            <View
              style={[
                styles.amountWrap,
                {    paddingVertical: Metrics.xsmallMargin,
                },
                !util.isRTL() && {backgroundColor: Colors.button.octa},

              ]}>
              <Text
                color={Colors.text.secondary}
                size={Fonts.size.xxLarge}
                style={{fontFamily:util.isPlatformAndroid()?'Lateef-Regular':'Lateef'}}

                type="semiBold">
                ENGLISH
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleLangSelect('ar');
            }}
            style={[styles.contentSec]}>
            <View
              style={[
                styles.amountWrap,
                util.isRTL() && {backgroundColor: Colors.button.octa},
              ]}>
                                <View style={{height:58}}>

              <Text
                color={Colors.text.secondary}
                size={Fonts.size.xxLarge}
                style={{fontFamily:util.isPlatformAndroid()?'Lateef-Regular':'Lateef'}}

                type="semiBold">
                عربى
              </Text>
              </View>

            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
