import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  ConfirmationModal,
  ImagePicker,
  QuantityInput,
  Text,
  RichTextEditor,
  HTMLView,
  TextInput,
  Image,
} from '../../components';
import styles from './OrderItemAccordianStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {MODAL_TYPE, PROMO_TYPES, strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default class OrderItemAccordianView extends React.PureComponent {
  render() {
    const {
      data,
      active,
      toggleAccordinPress,
      config,
      itemType,
      isAllowedtoRead,
      index,
      isAllowedtoWrite,
      isPlaceholderVisible,
      onChange,
      isImgUploadVisible,
      handleImgModal,
      addItemImage,
      itemImage,
      imgModalFor,
      handleCrossItem,
      handleRemovePrdItem,
      crossItemModal,
      fromOrderPlace,
      isChangeMode,
      reftitle,
      refDes,
      refremarks,
    } = this.props;

    // if image not availbe then show placeholder
    let prdImg = handleImage();

    // here some confusion in user rfp lisiting image
    // availble in image key but vendor create proposal then image available
    // in productImage key
    function handleImage() {
      if (data.image) {
        return {uri: renderNameStringAndImageRender(data.image)};
      } else if (data.productImage && data.productImage.image) {
        return {uri: renderNameStringAndImageRender(data.productImage.image)};
      } else {
        return Images.ItemImagePlaceholder;
      }
    }

    let remarkPrdImg = _.isEmpty(data.remarksImgData)
      ? Images.ItemImagePlaceholder
      : {uri: data.remarksImgData.image};

    return (
      <View style={[styles.container]}>
        {/* Titlebar */}
        <View
          activeOpacity={0.9}
          style={[
            styles.cardContainer,
            styles.titlebarContainer,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          {/* REMOVE ITEM */}
          {isAllowedtoWrite(config[itemType].removeItem) && (
            <TouchableOpacity
              style={styles.removeItemContainer}
              onPress={() => {
                handleCrossItem();

                // handleRemovePrdItem(index);
              }}>
              <Text
                color={Colors.background.hepta}
                type={'semiBold'}
                textAlign={'center'}
                fontSize={20}>
                X
              </Text>
            </TouchableOpacity>
          )}
          {/* Title */}
          {isAllowedtoWrite(config[itemType].title) && (
            <View style={[styles.titleContainer]}>
              {/* <TextInput
                placeholder={isPlaceholderVisible(
                  isAllowedtoWrite(config[itemType].title),
                  strings.WRITE_TITLE_HERE,
                )}
                onChangeText={(value) => {
                  onChange('name', index, value);
                }}
                style={[styles.titleInput]}
                editable={isAllowedtoWrite(config[itemType].title)}
                value={renderNameStringAndImageRender(data.name || data.title)}
                value={renderNameStringAndImageRender(data.name)}
              /> */}

              <View style={{marginTop: 5}}>
                <RichTextEditor
                  value={renderNameStringAndImageRender(data.name)}
                  onChange={(text) => onChange('name', index, text)}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  fontSize={Fonts.size.xSmall}
                  heightInput="40"
                  refRichText={reftitle}
                  placeholder={isPlaceholderVisible(
                    isAllowedtoWrite(config[itemType].title),
                    strings.WRITE_TITLE_HERE,
                  )}
                />
              </View>
            </View>
          )}
          {isAllowedtoRead(config[itemType].title) && (
            <View style={[styles.titleContainer, {margin: 10}]}>
              <HTMLView
                htmlContent={
                  renderNameStringAndImageRender(data.name)
                    ? renderNameStringAndImageRender(data.name)
                    : ''
                }
                textAlign={util.isRTL() ? 'right' : 'left'}
                color={Colors.text.penta}
                size={Fonts.size.xSmall}
              />
            </View>
          )}

          {/* Toggle Icon */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[util.isRTL() && AppStyles.rowReverse]}
            onPress={() => {
              toggleAccordinPress(index);
            }}>
            <View>
              <RnImage
                source={Images.UpArrow}
                style={[styles.toggleIcon, !active && styles.activeBtn]}
              />
            </View>
          </TouchableOpacity>
        </View>
        {!_.isEmpty(data.nameError) && (
          <Text
            type="medium"
            size={Fonts.size.xxxxSmall}
            color={Colors.error.primary}
            style={[
              AppStyles.mBottom5,
              util.isRTL()
                ? {textAlign: 'right', ...AppStyles.mRight15}
                : {...AppStyles.mLeft15},
              {top: -6},
            ]}>
            {data.nameError}
          </Text>
        )}
        {/* Body */}
        {active && (
          <View style={[styles.cardContainer, styles.bodyContainer]}>
            {/* Customer Description Container */}
            <View
              style={[AppStyles.flexRow, util.isRTL() && AppStyles.rowReverse]}>
              <View style={[AppStyles.flex, util.isRTL() && AppStyles.mLeft25]}>
                {/* Product Image */}
                {isAllowedtoRead(config[itemType].requirementsImage) && (
                  <View style={[styles.orderItemImageContainer]}>
                    {!_.isEmpty(data.image) && (
                      <Image source={prdImg} style={styles.imageStyle} />
                    )}
                  </View>
                )}
                {(isAllowedtoWrite(config[itemType].descriptionImage) ||
                  isAllowedtoRead(config[itemType].descriptionImage)) && (
                  <View style={[styles.orderItemImageContainer]}>
                    <Image source={prdImg} style={styles.imageStyle} />
                  </View>
                )}

                {/* Editable Quanity Field */}
                {isAllowedtoWrite(config[itemType].quantity) && !isChangeMode && (
                  <View style={styles.qtyInputWrap}>
                    <QuantityInput
                      itemQuantity={data.quantity}
                      itemIndex={index}
                      dark={true}
                      handleChangeQuantity={onChange}
                      fromOrderPlace={fromOrderPlace}
                    />
                    {!_.isEmpty(data.quantityError) && (
                      <Text
                        type="medium"
                        size={Fonts.size.xxxxSmall}
                        color={Colors.error.primary}
                        style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                        {data.quantityError}
                      </Text>
                    )}
                  </View>
                )}
              </View>

              <View style={[styles.orderItemDescContainer, AppStyles.flex]}>
                {/* Price */}
                {isAllowedtoRead(config[itemType].price) && (
                  <View
                    style={[
                      styles.orderAtts,
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <Text>{strings.PRICE} :</Text>
                    <Text>{data.price}</Text>
                  </View>
                )}
                {/* Qty */}
                {isAllowedtoRead(config[itemType].quantityRead) && (
                  <View
                    style={[
                      styles.orderAtts,
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <Text>{strings.QTY} :</Text>
                    <Text>{data.quantity}</Text>
                  </View>
                )}
                {/* Description */}
                {isAllowedtoRead(config[itemType].requirements) &&
                  !_.isNil(data.requirements) &&
                  !_.isEmpty(data.requirements) && (
                    <View style={[AppStyles.mTop20]}>
                      <Text
                        style={[AppStyles.mTop5]}
                        size={Fonts.size.medium}
                        type="bold"
                        color={Colors.text.penta}
                        textAlign={util.rtlRightText()}>
                        {strings.REQUIREMENTS}
                      </Text>
                      <HTMLView
                        htmlContent={renderNameStringAndImageRender(
                          data.requirements,
                        )}
                        textAlign={util.rtlRightText()}
                        color={Colors.text.penta}
                        size={Fonts.size.xxxSmall}
                      />
                      {/* <Text
                        style={[AppStyles.mTop5, styles.descriptionText]}
                        color={Colors.text.penta}
                        textAlign={util.rtlRightText()}>
                        {renderNameStringAndImageRender(data.requirements)}
                      </Text> */}
                    </View>
                  )}
                {/* Description */}
                {isAllowedtoWrite(config[itemType].description) && (
                  <View style={!fromOrderPlace && AppStyles.mTop20}>
                    <Text
                      style={[AppStyles.mTop5]}
                      size={Fonts.size.medium}
                      type="bold"
                      color={Colors.text.penta}
                      textAlign={util.rtlRightText()}>
                      {strings.DESCRIPTION}
                    </Text>
                    {/* <TextInput
                      multiline
                      maxLines={3}
                      value={data.description}
                      style={[styles.descriptionText]}
                      placeholder={strings.WRITE_DESCRP_HERE}
                      value={data.description}
                      onChangeText={(value) => {
                        onChange('description', index, value);
                      }}
                      placeholderTextColor={Colors.text.quaternary}
                    /> */}
                    <RichTextEditor
                      value={data.description}
                      onChange={(text) => onChange('description', index, text)}
                      textAlign={util.isRTL() ? 'right' : 'left'}
                      labelType={'semiBold'}
                      fontSize={Fonts.size.xxSmall}
                      heightInput="40"
                      refRichText={refDes}
                      placeholder={strings.WRITE_DESCRP_HERE}
                    />
                    {!_.isEmpty(data.descriptionError) && (
                      <Text
                        type="medium"
                        size={Fonts.size.xxxxSmall}
                        color={Colors.error.primary}
                        style={[AppStyles.mBottom5]}>
                        {data.descriptionError}
                      </Text>
                    )}
                  </View>
                )}
                {isAllowedtoWrite(config[itemType].descriptionImage) && (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleImgModal(MODAL_TYPE.PRDOUCT_IMG)}
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
                    {!_.isEmpty(data.imageDataError) && (
                      <Text
                        type="medium"
                        size={Fonts.size.xxxxSmall}
                        color={Colors.error.primary}
                        style={[
                          AppStyles.mTop5,
                          AppStyles.mBottom5,
                          AppStyles.mLeft20,
                        ]}>
                        {data.imageDataError}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>
            {!_.isEmpty(data.additional_notes) && (
              <View style={[styles.remarksContainer, AppStyles.mTop30]}>
                <Text
                  style={[AppStyles.mTop10]}
                  size={Fonts.size.normal}
                  type="bold"
                  color={Colors.text.penta}>
                  {strings.ADDTIONAL_NOTES}
                </Text>
                <View style={AppStyles.mTop5}>
                  <HTMLView
                    htmlContent={data.additional_notes}
                    color={Colors.text.penta}
                    size={Fonts.size.small}
                  />
                </View>

                {/* <Text
                  style={AppStyles.mTop5}
                  size={Fonts.size.small}
                  color={Colors.text.penta}>
                  {data.additional_notes}
                </Text> */}
              </View>
            )}
            {/* Remarks */}
            {(isAllowedtoWrite(config[itemType].remarks) ||
              isAllowedtoRead(config[itemType].remarks)) && (
              <>
                <View style={[styles.remarksContainer]}>
                  {!isChangeMode && (
                    <>
                      <View
                        style={[
                          styles.remarksWrap,
                          util.isRTL() && AppStyles.rowReverse,
                        ]}>
                        <Text
                          style={[AppStyles.mTop5]}
                          size={Fonts.size.normal}
                          type="bold"
                          color={Colors.text.penta}>
                          {strings.REMARK}
                        </Text>
                        {/* Qty */}
                        {isAllowedtoRead(config[itemType].quantityRead) &&
                          util.isEmpty(data.revised_quantity) && (
                            <View
                              style={[
                                styles.orderAtts,
                                AppStyles.mRight10,
                                AppStyles.mTop5,
                              ]}>
                              <Text>{strings.QTY} :</Text>
                              <Text>
                                {util.isValueEmpty(data.revised_quantity)}
                              </Text>
                            </View>
                          )}
                      </View>

                      <View
                        style={
                          [
                            //AppStyles.flexRow,
                            // util.isRTL() && AppStyles.rowReverse,
                          ]
                        }>
                        {isAllowedtoWrite(config[itemType].remarks) && (
                          <View>
                            {/* <TextInput
                              multiline
                              maxLines={3}
                              style={[AppStyles.mTop5, styles.descriptionText]}
                              placeholder={isPlaceholderVisible(
                                isAllowedtoWrite(config[itemType].remarks),
                                strings.WRITE_REMARK_HERE,
                              )}
                              value={data.remarks}
                              placeholderTextColor={Colors.text.quaternary}
                              editable={isAllowedtoWrite(
                                config[itemType].remarks,
                              )}
                              onChangeText={(value) => {
                                onChange('remarks', index, value);
                              }}
                            /> */}

                            <RichTextEditor
                              value={data.remarks ? data.remarks : ''}
                              textAlign={util.isRTL() ? 'right' : 'left'}
                              color={Colors.text.primary}
                              heightInput="40"
                              onChange={(text) =>
                                onChange('remarks', index, text)
                              }
                              fontSize={Fonts.size.xxSmall}
                              placeholder={isPlaceholderVisible(
                                isAllowedtoWrite(config[itemType].remarks),
                                strings.WRITE_REMARK_HERE,
                              )}
                              refRichText={refremarks}
                            />
                          </View>
                        )}
                        {isAllowedtoRead(config[itemType].remarks) && (
                          <View>
                            <HTMLView
                              htmlContent={data.remarks ? data.remarks : ''}
                              textAlign={util.isRTL() ? 'right' : 'left'}
                              color={Colors.text.penta}
                              size={Fonts.size.xxSmall}
                            />
                          </View>
                        )}
                      </View>
                      <View
                        style={[
                          styles.uploadImgWrap,
                          util.isRTL() && AppStyles.rowReverse,
                        ]}>
                        <View>
                          {/* remarks uploaded image*/}
                          {(isAllowedtoWrite(config[itemType].remarks) ||
                            isAllowedtoRead(config[itemType].remarks)) &&
                            util.isEmpty(data.remarksImgData) && (
                              <Image
                                resizeMode="contain"
                                style={[styles.remarksImage]}
                                source={{uri: data.remarksImgData.image}}
                              />
                            )}
                        </View>

                        {/* upload image btn */}
                        {isAllowedtoWrite(config[itemType].remarksImage) && (
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                handleImgModal(MODAL_TYPE.PRDOUCT_IMG_REMARKS)
                              }
                              style={styles.submitBtnWrap}>
                              <View style={styles.uploadImageIconStyleWrap}>
                                <RnImage
                                  source={Images.UploadImageIcon}
                                  style={AppStyles.mRight10}
                                />
                              </View>
                              <View>
                                <Text
                                  type="semiBold"
                                  style={styles.submitBtnText}>
                                  {strings.UPLOAD_IMAGE}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </>
                  )}
                  {/* changes to be made */}
                  {!_.isNil(data.menu_promotion) && (
                    <View>
                      <Text
                        style={[
                          AppStyles.mTop5,
                          util.isRTL() && {textAlign: 'right'},
                        ]}
                        size={Fonts.size.normal}
                        type="bold"
                        color={Colors.text.penta}>
                        {strings.PROMOTIONS}
                      </Text>
                      {!_.isEmpty(data.menu_promotion.description) &&
                        !_.isNil(data.menu_promotion.description) && (
                          <View style={[AppStyles.mTop15]}>
                            <Text
                              size={Fonts.size.xSmall}
                              type="semiBold"
                              style={[util.isRTL() && {textAlign: 'right'}]}>
                              {strings.DESCRIPTION}
                            </Text>
                            {/* <TextInput
                              multiline
                              maxLines={3}
                              style={[
                                AppStyles.mTop5,
                                styles.descriptionText,
                                {top: -10},
                              ]}
                              placeholder={isPlaceholderVisible(
                                isAllowedtoRead(config[itemType].promotions),
                                strings.WRITE_DESCRP_HERE,
                              )}
                              value={data.menu_promotion.description}
                              placeholderTextColor={Colors.text.quaternary}
                              editable={false}
                            /> */}

                            <HTMLView
                              multiline
                              maxLines={3}
                              style={[
                                AppStyles.mTop5,
                                styles.descriptionText,
                                {top: -10},
                              ]}
                              placeholder={isPlaceholderVisible(
                                isAllowedtoRead(config[itemType].promotions),
                                strings.WRITE_DESCRP_HERE,
                              )}
                              htmlContent={data.menu_promotion.description}
                              placeholderTextColor={Colors.text.quaternary}
                              editable={false}
                            />
                          </View>
                        )}
                      <View
                        style={[
                          util.isRTL() && {alignSelf: 'flex-end'},
                          {top: 10},
                        ]}>
                        <Text size={Fonts.size.xSmall}>
                          {`${strings.PROMO_TYPE}: ${
                            data.menu_promotion.type === PROMO_TYPES.BUY_1_GET_1
                              ? strings.BUY_1_GET_1
                              : ''
                          }${
                            data.menu_promotion.type ===
                            PROMO_TYPES.GIFT_PRODUCT
                              ? strings.GIFT_PRODUCT
                              : ''
                          }${
                            data.menu_promotion.type === PROMO_TYPES.DISCOUNT
                              ? `${strings.DISCOUNT} ---> ${data.menu_promotion.extra_data.discount} %`
                              : ''
                          }
                    
                    `}
                        </Text>
                      </View>
                    </View>
                  )}
                  {/* changes to be made */}
                </View>
              </>
            )}
          </View>
        )}
        {/* image upload modal */}
        {isImgUploadVisible && (
          <ImagePicker
            addImage={addItemImage}
            showPickerModal={handleImgModal}
            closeModal={handleImgModal}
            itemIndex={index}
            imgModalFor={imgModalFor}
          />
        )}

        {crossItemModal && (
          <ConfirmationModal
            isModalVisible={crossItemModal}
            title={strings.ARE_YOU_SURE}
            successBtnPress={() => {
              handleRemovePrdItem(index);
            }}
            successBtnTitle={strings.DELETE}
            // successBtnLoading={deleteLoader}
            negativeBtnPress={handleCrossItem}
            negativeBtnTitle={strings.CANCEL}
          />
        )}
      </View>
    );
  }
}
