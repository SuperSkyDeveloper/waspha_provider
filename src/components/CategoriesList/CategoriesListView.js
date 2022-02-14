import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './CategoriesListStyles';
import Text from '../Text';
import {AppStyles, Images} from '../../theme';
import {ConfirmationModal, HTMLView} from '..';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function CategoriesListView(props) {
  const {
    item,

    handleConfirmationModal,
    handleDeletePress,
    isDeleteModalShow,
    deleteLoader,
    deleteable,
    editable,
    isFullWidth,
    nest,
  } = props;

  return (
    <View style={[styles.container, isFullWidth && styles.fullWidth]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Actions.productAndCategories({item, nest: nest})}>
        <RnImage
          source={{uri: renderNameStringAndImageRender(item.image)}}
          style={[styles.trendImg]}
        />
        <View style={[styles.nameWrap]}>
          {/* <Text
            style={styles.textStyle}
            type="semiBold"
            textAlign={util.rtlRightText()}>
            {renderNameStringAndImageRender(item.name)}
          </Text> */}
          <HTMLView
            htmlContent={renderNameStringAndImageRender(item.name)}
            style={styles.textStyle}
            type="semiBold"
            textAlign={util.rtlRightText()}
          />
        </View>
        <View style={styles.overlay} />

        <View style={[styles.optionWrap, util.isRTL() && {left: 10}]}>
          {/* delete press */}
          {editable && (
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.size}
                onPress={() => {
                  Actions.productAndCategoryForm({
                    isEdit: true,
                    item,
                    isCategory: true,
                  });
                }}>
                <RnImage
                  source={Images.EditIconBlack}
                  style={styles.imageSize}
                />
              </TouchableOpacity>
            </View>
          )}
          {/* delete press */}
          {deleteable && (
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.size}
                onPress={() => {
                  handleConfirmationModal(item.id);
                }}>
                <RnImage source={Images.DeleteIcon} style={styles.imageSize} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {isDeleteModalShow && (
        <ConfirmationModal
          isModalVisible={isDeleteModalShow}
          title={strings.ARE_YOU_SURE}
          successBtnPress={handleDeletePress}
          successBtnTitle={strings.DELETE}
          successBtnLoading={deleteLoader}
          negativeBtnPress={handleConfirmationModal}
          negativeBtnTitle={strings.CANCEL}
        />
      )}
    </View>
  );
}
