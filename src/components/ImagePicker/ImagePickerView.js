import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from '..';
import styles from './ImagePickerStyles';
import {Colors, Images, Metrics} from '../../theme';
import {strings} from '../../constants';
import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';
import util from '../../util';

export default function ImagePickerView(props) {
  const {
    showPickerModal,
    handleSelectImagePress,
    handleUploadPress,
    onModalClose,
    image,
    loading,
    setValue,
    alertMessage,
  } = props;
  return (
    <View style={styles.container}>
      <Modal
        isVisible={showPickerModal}
        style={{
          alignItems: 'center',
        }}
        onBackButtonPress={() => {
          onModalClose();
        }}
        onBackdropPress={() => {
          onModalClose();
        }}
        backdropOpacity={0.3}
        backdropColor={Colors.background.primary}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.9, y: 1.7}}
          colors={Colors.gradient.primary}
          style={styles.imageSelectorWrapper}>
          <View style={styles.imageDetails}>
            <View style={styles.selectImageWrap}>
              <View style={styles.selectImageTextWrap}>
                <Text style={styles.selectImageText}>
                  {strings.SELECT_IMAGE}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  onModalClose();
                }}
                style={styles.crossIconWrap}>
                <Text style={styles.crossIconStyle}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageSelectorChild}>
              <TouchableOpacity
                onPress={() => handleSelectImagePress()}
                style={styles.imagePlaceholderStyle}>
                <RnImage
                  source={
                    _.isEmpty(image)
                      ? Images.ImagePlaceHolder
                      : {uri: image.path}
                  }
                  style={styles.imageStyle}
                />
                {!_.isEmpty(image) && (
                  <RnImage
                    source={Images.ImagePlusIcon}
                    style={styles.circularPlusIconStyle}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.submitBtnWrap}>
                <Button
                  isLoading={loading}
                  disabled={loading}
                  color={Colors.text.primary}
                  style={styles.submitBtn}
                  textStyle={styles.submitBtnText}
                  type="semiBold"
                  onPress={() => {
                    if (_.isEmpty(image)) {
                      // return util.topAlert(strings.PLEASE_SELECT_IMAGE);
                      return alertMessage(strings.PLEASE_SELECT_IMAGE);
                    }
                    setValue({loading: true}, handleUploadPress());
                  }}>
                  {strings.UPLOAD}
                </Button>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
