import React from 'react';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {Text, ReasonListItem, Button} from '../../components';
import styles from './ReasonModalStyles';
import {Colors, Fonts, Images} from '../../theme';
import Modal from 'react-native-modal';
import {strings} from '../../constants';

export default function ReasonModalView(props) {
  const {
    handleSelectOption,
    selectedOptions,
    handleCloseModal,
    isModalVisible,
  } = props;

  const REASON = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet,consecteturaip isc ingelit, sed',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consecteturaip ',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet, isc ingelit, sed ingelit, sed',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet,consecteturaip isc ingelit, sed',
    },
  ];

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modal}
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}>
      <View style={styles.modalWrap}>
        <View>
          <Text
            style={styles.modalHeader}
            size={Fonts.size.medium}
            color={Colors.text.secondary}
            type="bold">
            {strings.REASON_FOR_REPORTING}
          </Text>
          <TouchableOpacity style={styles.closeBtn} onPress={handleCloseModal}>
            <RnImage source={Images.CloseIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.listWrap}>
          <FlatList
            data={REASON}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              let isOptionSelect = selectedOptions.includes(item.id);
              return (
                <ReasonListItem
                  item={item}
                  onPress={handleSelectOption}
                  isOptionSelect={isOptionSelect}
                />
              );
            }}
          />
        </View>

        <Button
          color={Colors.button.hexa}
          background={Colors.button.quaternary}
          style={styles.reportBtn}
          size={Fonts.size.normal}
          onPress={handleCloseModal}
          isLoading={false}
          indicatorColor={Colors.button.hexa}
          disabled={false}>
          <Text
            textAlign={'center'}
            type="semiBold"
            color={Colors.text.secondary}>
            {strings.REPORT}
          </Text>
        </Button>
      </View>
    </Modal>
  );
}
