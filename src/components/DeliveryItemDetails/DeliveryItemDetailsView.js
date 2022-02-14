import React from 'react';
import {View, Image as RnImage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {HTMLView, Text} from '..';
import styles from './DeliveryItemDetailsStyles';
import {Colors, Images} from '../../theme';
import {strings} from '../../constants';
import Button from '../Button';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function DeliveryItemDetailsView(props) {
  const {
    isModalOpen,
    closeModal,
    modalType,
    showDataList,
    handleConfirm,
    isLoading,
  } = props;
  let isDataAvailable =
    util.isEmpty(showDataList) && util.isEmpty(showDataList.items);

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={Colors.gradient.primary}
          style={styles.card}>
          <View style={styles.headSec}>
            <RnImage source={Images.CartIcon} style={styles.iconStyle} />
            <View style={styles.headContent}>
              <Text type="bold" style={styles.deliverDetailText}>
                {strings.DELIVER_ITEM_DETAILS}
              </Text>
              <Text type="bold" style={styles.itemDetailsText}>{`${
                isDataAvailable ? showDataList.items.length : 0
              } ${strings.ITEM_DETAILS}`}</Text>
            </View>
          </View>
          <View style={styles.contentSec}>
            <View style={styles.tableHeadWrap}>
              <Text type="semiBold" style={styles.tableHeadText}>
                {strings.DETAILS}
              </Text>
            </View>
            <View style={[styles.tableHeadWrap, styles.borderLine]}>
              <Text type="semiBold" style={[styles.tableHeadText, {right: 35}]}>
                {strings.QTY}
              </Text>
            </View>
          </View>
          <View style={styles.itemsContent}>
            {isDataAvailable &&
              showDataList.items.map((list) => (
                <View style={styles.itemsSec}>
                  {/* <Text type="medium" style={styles.itemText}>
                    {renderNameStringAndImageRender(list.name)}
                  </Text> */}

                  <HTMLView
                    type="medium"
                    htmlContent={
                      renderNameStringAndImageRender(list.name)
                        ? renderNameStringAndImageRender(list.name)
                        : ''
                    }
                    style={styles.itemText}
                  />

                  <View style={styles.qtyWrap}>
                    <Text type="medium" style={styles.itemText}>
                      {list.quantity}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
          <View style={styles.btnWrap}>
            <Button
              isLoading={isLoading}
              onPress={handleConfirm}
              textStyle={styles.btnTextStyle}
              style={styles.btnStyle}>
              {strings.CONFIRM.toUpperCase()}
            </Button>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
