import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, QuantityInput, ImagePicker, TextInput} from '..';
import styles from './AccordianItemStyles';
import {Colors, Images, AppStyles, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function AccordianItemView(props) {
  const {
    item,
    active,
    togglePress,
    btnOneFunc,
    index,
    itemImage,
    imageBase64,
    editAble,
    uploadImagePicker,
    closeImagePickerModal,
    openImagePickerModal,
    addItemImage,
    editAbleFromVendor,
    onChangeField,
    showCrossIconOfAccordian,
    showPriceAndQtyOfItem,

    isAccordionItemRemoveable,

    modalType,
  } = props;

  const isItemImageAvailable = item.image
    ? {uri: item.image}
    : Images.ItemImagePlaceholder;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          togglePress(index);
        }}
        style={[
          styles.titleWrap,
          editAbleFromVendor && styles.editTitleWrap,
          !_.isEmpty(item.nameError) && styles.errorBorder,
        ]}>
        {isAccordionItemRemoveable && (
          <>
            <TouchableOpacity onPress={() => btnOneFunc({[modalType]: true})}>
              <View style={styles.crossBtnWrap}>
                <View style={styles.removeItemButton}>
                  <Text
                    type={'semiBold'}
                    textAlign={'center'}
                    style={styles.crossTextStyle}>
                    X
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}

        {!editAbleFromVendor && (
          <Text size={Fonts.size.font18} type="semiBold">
            {item.name}
          </Text>
        )}
        {editAbleFromVendor && (
          <View style={{flex: 4}}>
            <TextInput
              style={styles.inputField}
              labelStyle={styles.labelStyle}
              placeholder={`${strings.WRITE_TITLE_HERE} ...`}
              value={item.name}
              placeholderTextColor={Colors.text.quaternary}
              onChangeText={(value) => {
                onChangeField('name', value, index);
              }}
            />
          </View>
        )}
        <View style={styles.optionWrap}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.option}
            onPress={() => {
              togglePress(index);
            }}>
            <RnImage
              source={Images.UpArrow}
              style={[
                !active && styles.iconStyle,
                {paddingRight: 10, paddingLeft: 10, paddingBottom: 21},
              ]}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {editAbleFromVendor && !_.isEmpty(item.nameError) && (
        <View>
          <Text type="bold" color={Colors.text.error} style={styles.errorText}>
            {item.nameError}
          </Text>
        </View>
      )}
      {active && (
        <View>
          <View
            style={[
              styles.accordionSec,
              (!_.isEmpty(item.descError) || !_.isEmpty(item.remarkError)) &&
                styles.errorBorder,
            ]}>
            <View style={styles.bodyWrap}>
              <View style={styles.leftSec}>
                {!editAbleFromVendor && (
                  <View style={styles.imageWrap}>
                    <RnImage
                      source={isItemImageAvailable}
                      style={styles.imageStyle}
                    />
                  </View>
                )}

                {editAbleFromVendor && (
                  <View style={styles.imageWrap}>
                    <RnImage
                      source={
                        _.isEmpty(itemImage)
                          ? Images.ItemImagePlaceholder
                          : {uri: itemImage}
                      }
                      style={styles.imageStyle}
                    />
                  </View>
                )}
                {!showPriceAndQtyOfItem && (
                  <View style={styles.quantityWrap}>
                    <QuantityInput
                      itemQuantity={item.quantity}
                      itemIndex={index}
                      dark={true}
                      handleChangeQuantity={onChangeField}
                    />
                  </View>
                )}

                {showPriceAndQtyOfItem && (
                  <View style={styles.leftRemarksSecWrap}>
                    <Text type="semiBold" size={Fonts.size.xSmall}>
                      {strings.REMARK}
                    </Text>
                    <Text size={Fonts.size.xxxxSmall}>{item.remarks}</Text>
                  </View>
                )}
              </View>
              <View
                style={[AppStyles.flex2, AppStyles.mLeft15, styles.rightCol]}>
                <View style={styles.contentWrap}>
                  {showPriceAndQtyOfItem && (
                    <View style={styles.priceQtyWrap}>
                      <View style={styles.priceWrap}>
                        <Text
                          type="semiBold"
                          style={
                            styles.priceAndQtyText
                          }>{`${strings.PRICE} : `}</Text>
                        <Text
                          type="semiBold"
                          style={styles.amount}>{` ${item.price}`}</Text>
                      </View>
                      <View style={styles.priceWrap}>
                        <Text
                          type="semiBold"
                          style={
                            styles.priceAndQtyText
                          }>{`${strings.QTY} : `}</Text>
                        <Text
                          type="semiBold"
                          style={
                            styles.amount
                          }>{`         ${item.quantity}`}</Text>
                      </View>
                    </View>
                  )}
                  <Text
                    size={Fonts.size.large}
                    type="bold"
                    color={Colors.text.penta}>
                    {strings.REQUIREMENTS}
                  </Text>
                  {!editAbleFromVendor && (
                    <Text style={AppStyles.mTop5} size={Fonts.size.xxxxSmall}>
                      {util.checkIsEmpty(item.requirements)}
                    </Text>
                  )}
                  {editAbleFromVendor && (
                    <TextInput
                      multiline
                      maxLines={3}
                      style={styles.inputFieldDescription}
                      labelStyle={[styles.labelStyle]}
                      placeholder={`${strings.WRITE_DESCRP_HERE} ...`}
                      value={item.description}
                      placeholderTextColor={Colors.text.quaternary}
                      onChangeText={(value) => {
                        onChangeField('description', value, index);
                      }}
                    />
                  )}
                  {!showPriceAndQtyOfItem && (
                    <View style={AppStyles.mTop15}>
                      {editAble && (
                        <>
                          <View style={styles.remarkImageWrap}>
                            <RnImage
                              source={
                                _.isEmpty(itemImage)
                                  ? Images.ItemImagePlaceholder
                                  : {uri: itemImage}
                              }
                              style={styles.imageStyle}
                            />
                          </View>
                          <Text
                            type="bold"
                            color={Colors.text.penta}
                            size={Fonts.size.xSmall}>
                            {strings.REMARK}
                          </Text>
                        </>
                      )}
                      {!editAbleFromVendor && !editAble && (
                        <>
                          <Text
                            type="bold"
                            color={Colors.text.penta}
                            size={Fonts.size.xSmall}>
                            {strings.REMARK}
                          </Text>
                          <Text size={Fonts.size.xxxxSmall}>{item.remark}</Text>
                        </>
                      )}
                      {editAble && (
                        <TextInput
                          multiline
                          style={styles.inputFieldDescription}
                          labelStyle={[styles.labelStyle]}
                          placeholder={`${strings.WRITE_REMARK_HERE} ...`}
                          value={item.remark}
                          placeholderTextColor={Colors.text.quaternary}
                          onChangeText={(value) => {
                            onChangeField('remark', value, index);
                          }}
                        />
                      )}
                    </View>
                  )}
                </View>
                {(editAble || editAbleFromVendor) && (
                  <View style={styles.imageUploadWrap}>
                    <TouchableOpacity
                      onPress={() => openImagePickerModal()}
                      style={styles.submitBtnWrap}>
                      <View style={styles.uploadImageIconStyleWrap}>
                        <RnImage
                          source={Images.UploadImageIcon}
                          style={AppStyles.mRight10}
                        />
                      </View>
                      <View>
                        <Text type="semiBold" style={styles.submitBtnText}>
                          {strings.UPLOAD_IMAGE}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          {!_.isEmpty(item.descError) && (
            <View>
              <Text
                type="bold"
                color={Colors.text.error}
                style={styles.errorText}>
                {item.descError}
              </Text>
            </View>
          )}
          {!_.isEmpty(item.remarkError) && (
            <View>
              <Text
                type="bold"
                color={Colors.text.error}
                style={styles.errorText}>
                {item.remarkError}
              </Text>
            </View>
          )}
        </View>
      )}
      {uploadImagePicker && (
        <ImagePicker
          addImage={addItemImage}
          showPickerModal={uploadImagePicker}
          closeModal={closeImagePickerModal}
          itemIndex={index}
        />
      )}
    </View>
  );
}
