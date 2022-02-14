import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {ConfirmationModal, HTMLView, Text} from '..';
import styles from './ProductItemStyles';
import {Actions} from 'react-native-router-flux';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function ProductItemView(props) {
  const {
    item,
    isEdit,
    handleConfirmationModal,
    isDeleteModalShow,
    handleDeletePress,
    deleteable,
    deletePrdLoader,
    editable,
    fromAddProduct,
    selectProduct,
  } = props;
  return (
    <>
      <TouchableOpacity
        activeOpacity={fromAddProduct ? 0.7 : 1}
        onPress={
          fromAddProduct
            ? () => {
                selectProduct(item);
              }
            : () => {}
        }
        style={[
          styles.contentSec,
          styles.shadowStyle,
          util.isRTL() && AppStyles.rowReverse,
          util.isRTL() && AppStyles.pRight10,
          util.isRTL() && AppStyles.mRight10,
        ]}>
        <View style={styles.imageWrap}>
          <RnImage
            source={{uri: renderNameStringAndImageRender(item.image)}}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.infoSec}>
          <HTMLView
            htmlContent={renderNameStringAndImageRender(item.title)}
            color={Colors.text.primary}
            size={Fonts.size.xSmall}
            type="bold"
            numberOfLines={2}
            ellipsizeMode="tail"
            textAlign={util.rtlRightText()}
          />
          {/* <Text
            textAlign={util.rtlRightText()}
            type="bold"
            style={styles.nameText}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {renderNameStringAndImageRender(item.title)}
          </Text> */}
          <HTMLView
            htmlContent={renderNameStringAndImageRender(item.description)}
            color={Colors.text.hexa}
            size={Fonts.size.xxxxSmall}
            type="medium"
            textAlign={util.rtlRightText()}
          />
          {/* <Text
            multiline={true}
            type="medium"
            style={styles.descText}
            textAlign={util.rtlRightText()}>
            {renderNameStringAndImageRender(item.description)}
          </Text> */}
        </View>
        <View style={styles.optionWrap}>
          {/* edit */}
          {editable && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.size}
              onPress={
                isEdit
                  ? () => Actions.productAndCategoryForm({isEdit, item})
                  : () => {}
              }>
              <RnImage
                source={Images.EditIconBlack}
                style={styles.imageSize}
                tintColor={Colors.text.primary}
              />
            </TouchableOpacity>
          )}
          {/* delete press */}
          {deleteable && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.size}
              onPress={() => {
                handleConfirmationModal(item.id);
              }}>
              <RnImage source={Images.DeleteIcon} style={styles.imageSize} />
            </TouchableOpacity>
          )}
        </View>

        {isDeleteModalShow && (
          <ConfirmationModal
            isModalVisible={isDeleteModalShow}
            title={strings.ARE_YOU_SURE}
            successBtnPress={handleDeletePress}
            successBtnTitle={strings.DELETE}
            successBtnLoading={deletePrdLoader}
            negativeBtnPress={handleConfirmationModal}
            negativeBtnTitle={strings.CANCEL}
          />
        )}
        {item.is_featured && (
          <View
            style={[
              styles.badge,
              util.isRTL() ? styles.badgeStyleRTL : styles.badgeStyle,
            ]}>
            <View style={[styles.dot, util.isRTL() && {marginLeft: 4}]} />
            <Text
              size={Fonts.size.xxxxxSmall}
              color={Colors.text.secondary}
              type="bold">
              {strings.FEATURED}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}
