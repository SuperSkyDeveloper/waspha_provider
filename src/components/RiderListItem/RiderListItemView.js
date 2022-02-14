import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {ConfirmationModal, Text} from '..';
import styles from './RiderListItemStyles';
import {AppStyles, Fonts, Images, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {LATEST_ORDER_STATUS, strings} from '../../constants';
import util from '../../util';
import {filterList} from '../../helpers/generalHelper';

export default function RiderListItemView(props) {
  const {
    item,
    isDeliveryGuyForm,
    vehicles,
    deletePress,
    orderId,
    itemPress,
    isForAssign,
    isDeleteModalShow,
    handleConfirmationModal,
    handleDelete,
    isLoading,
    isDeleteBtnShow,
  } = props;

  let vehicleIcon = vehicles && filterList(vehicles, item.vehicle_id);

  let handleOnPress = () => {};

  // assign Order modal
  if (isForAssign && item.type === 'offline') {
    handleOnPress = () => {
      itemPress(item.id);
    };
  }

  // assigned order Detail
  if (item.ride_status && item.type === 'offline') {
    handleOnPress = () => {
      Actions.orderDetails({
        enableUserInfoSec: true,
        showDeliveryMode: false,
        showCrossIconOfAccordian: false,
        shouldEnableContactOption: false,
        showPriceAndQtyOfItem: true,
        showAssignedOrderTime: true,
        id: item.proposal_id,
        fromLatestOrder: true,
      });
    };
  }

  return (
    <>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.8}>
        <View style={[styles.itemWrap, util.isRTL() && AppStyles.rowReverse]}>
          {/* assign status */}
          {item.ride_status && (
            <View style={styles.badgeWrap}>
              <Text size={Fonts.size.xxxxxSmall} color={Colors.text.secondary}>
                {strings.ASSIGNED}
              </Text>
            </View>
          )}
          <View style={styles.imageCircularWrap}>
            <View style={styles.imageWrap}>
              <RnImage
                style={styles.profileImageStyle}
                source={util.profilePlaceHolderImage(item.avatar)}
              />
            </View>
            {!_.isNil(vehicleIcon) && (
              <View
                style={[
                  styles.deliveryVehicleTypeWrap,
                  util.isRTL() && styles.deliveryVehicleTypeWrapRtl,
                ]}>
                <RnImage
                  style={styles.vehicleStyle}
                  source={{
                    uri: vehicleIcon.image.color,
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.riderInfoWrap}>
            <Text
              style={[
                styles.riderNameStyle,
                util.isRTL() && styles.riderNameStyleRtl,
              ]}
              textAlign={util.rtlRightText()}>
              {item.name}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              style={[
                styles.riderNameStyle,
                util.isRTL() && styles.riderNameStyleRtl,
              ]}>{`${item.country_code}${item.contact}`}</Text>
          </View>
          {/* delete press */}
          {!item.ride_status && isDeleteBtnShow && (
            <View style={styles.delWrap}>
              <TouchableOpacity
                activeOpacity={0.7}
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
          successBtnPress={handleDelete}
          successBtnTitle={strings.DELETE}
          successBtnLoading={isLoading}
          negativeBtnPress={handleConfirmationModal}
          negativeBtnTitle={strings.CANCEL}
        />
      )}
    </>
  );
}
