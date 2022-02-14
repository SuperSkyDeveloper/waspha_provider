import React, {Component} from 'react';
import {
  View,
  FlatList,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Dash from 'react-native-dash';
import {
  Text,
  CustomNavbar,
  Maps,
  RiderDetailBottomSheet,
  ButtonView,
  Button,
  Loader,
  RemoveItemModal,
} from '../../components';
import _ from 'lodash';
import styles from './WasphaExpressStyles';
import {strings} from '../../constants';
import {Colors, Fonts, Metrics, AppStyles, Images} from '../../theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import ItemListvehicle from './ItemListvehicle';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
export default class WasphaExpressView extends Component {
  renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',

          marginTop: 15,

          paddingTop: Metrics.baseMargin,
          width: '100%',
          flex: 1,
        }}>
        {!util.isRTL() && (
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{flex: 0.3, marginLeft: 10}}>
            <RnImage
              source={Images.BackBtn}
              style={{tintColor: Colors.black}}
            />
          </TouchableOpacity>
        )}

        <View
          style={[
            {
              flex: 0.8,

              marginLeft: 10,
              alignSelf: 'center',

              backgroundColor: Colors.transparent,
            },
            util.isRTL() && {alignItems: 'center'},
          ]}>
          <Text color={Colors.black} type="bold">
            WASPHA BOX
          </Text>
        </View>
        {util.isRTL() && (
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{
              flex: 0.2,
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: 0,
            }}>
            <RnImage
              source={Images.BackBtn}
              tintColor={Colors.black}
              style={[{}, util.isRTL() && styles.btnImageRtl]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderConfirmBtn = () => {
    const {
      renderPickLocation,
      isPickShow,
      RBSheetRef,
      renderOrderplace,
    } = this.props;
    return (
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          width: Metrics.screenWidth - 80,
          paddingTop: Metrics.baseMargin,
          top: Metrics.screenHeight / 1.13,
          backgroundColor: Colors.transparent,
        }}>
        {!isPickShow && (
          <ButtonView
            onPress={() => renderPickLocation()}
            style={styles.locationBtn}>
            <Text
              type="bold"
              size="xxSmall"
              color={Colors.white}
              style={styles.locationTxt}>
              {strings.CONFIRM_PICKUP_LOCATION}
            </Text>
          </ButtonView>
        )}

        {isPickShow && (
          <ButtonView
            onPress={() => renderOrderplace()}
            style={styles.locationBtn}>
            <Text
              type="bold"
              size="xxSmall"
              color={Colors.white}
              style={styles.locationTxt}>
              {strings.CONFIRM_DROPOFF_LOCATION}
            </Text>
          </ButtonView>
        )}
      </View>
    );
  };
  renderBSheetBtn = () => {
    const {
      renderPickLocation,
      isPickShow,
      RBSheetRef,
      renderOrderplace,
      isShowBSheet,
      isFindingRider,
    } = this.props;
    return (
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          width: Metrics.screenWidth - 80,
          paddingTop: Metrics.baseMargin,
          // bottom: 20,
          top: Metrics.screenHeight / 1.13,
          backgroundColor: Colors.transparent,
        }}>
        {
          <ButtonView
            disabled={isFindingRider}
            onPress={() => {
              RBSheetRef.current.open();
            }}
            style={[styles.locationBtn, isFindingRider && {opacity: 0.7}]}>
            <Text
              type="bold"
              size="xxSmall"
              color={Colors.white}
              style={styles.locationTxt}>
              {strings.AVAILABLE_VEHICLES}
            </Text>
          </ButtonView>
        }
      </View>
    );
  };

  renderLocation = () => {
    const {
      pickAddress,
      dropAddress,
      isPickShow,
      PickLocationChange,
    } = this.props;
    return (
      <View style={styles.locationSec}>
        <View>
          <View style={[styles.dotStyle, {top: 5}]} />
          <View style={styles.dashWrap}>
            {isPickShow && (
              <Dash
                style={styles.dashStyle}
                dashGap={3}
                dashLength={3}
                dashColor={Colors.border.accent}
              />
            )}
          </View>
          {isPickShow && <View style={[styles.dotStyle]} />}
        </View>
        <View style={styles.contentSec}>
          <ButtonView
            onPress={() => PickLocationChange()}
            style={[AppStyles.flexRow, AppStyles.flex]}>
            <View style={[styles.boxSec, {flex: 0.9}]}>
              <Text type="semiBold" style={styles.locationHeadingText}>
                {strings.PICK_UP_LOCATION}
              </Text>
              <Text type="medium" numberOfLines={1} style={styles.locationText}>
                {pickAddress ? pickAddress : strings.ADDRESS_PLACEHOLDER}
              </Text>
            </View>
            <RnImage
              tintColor={Colors.black}
              style={styles.imageLocation}
              source={Images.pickUp}
            />
          </ButtonView>

          {isPickShow && (
            <View style={[AppStyles.flexRow, AppStyles.flex, {marginTop: 10}]}>
              <View style={[styles.boxSec, {flex: 0.9}]}>
                <Text type="semiBold" style={styles.locationHeadingText}>
                  {strings.DROP_OFF_LOCATION}
                </Text>
                <Text
                  type="medium"
                  numberOfLines={1}
                  style={styles.locationText}>
                  {dropAddress}
                  {dropAddress ? dropAddress : strings.ADDRESS_PLACEHOLDER}
                </Text>
              </View>
              <RnImage
                tintColor={Colors.black}
                style={styles.imageLocation}
                source={Images.dropOff}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  picker = () => {
    const {isPickShow} = this.props;
    return (
      <View style={styles.pickerImage}>
        {!isPickShow && (
          <RnImage
            tintColor={Colors.black}
            style={styles.imageLocation}
            source={Images.pickUp}
          />
        )}
        {isPickShow && (
          <RnImage
            tintColor={Colors.black}
            style={styles.imageLocation}
            source={Images.dropOff}
          />
        )}
      </View>
    );
  };

  renderDelivery = () => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 30,
          top: 300,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: 'center',
            backgroundColor: Colors.white,

            borderColor: Colors.black,
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Text size={Fonts.size.xxxSmall}>Hani</Text>

          <Text
            type="semiBold"
            style={{marginTop: 5}}
            size={Fonts.size.xxxSmall}>
            Delivery fees 16 EGP
          </Text>
          <Text style={{marginTop: 5}} size={Fonts.size.xxxSmall}>
            22 Min 2.5 KM
          </Text>
          <ButtonView
            style={{
              marginTop: 5,
              width: 80,
              height: 30,
              backgroundColor: Colors.resolutionBlue,
              paddingHorizontal: 10,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text
              type="semiBold"
              color={Colors.white}
              style={styles.locationTxt}
              size={Fonts.size.xxxSmall}>
              Assign
            </Text>
          </ButtonView>
        </View>
      </View>
    );
  };

  renderBottomSheetConfirm = () => {
    const {
      RBSheetRef,
      renderEachItemClick,
      renderDevilery,
      itemId,
      item,
      totalCharges,
      user,
      vehicleLoader,
      wasphaVehicles,
      traditionalOrderDetails,
    } = this.props;

    let currency = _.isNil(user.currency_code) ? 'ESP' : user.currency_code;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <RBSheet
          ref={RBSheetRef}
          height={375}
          keyboardAvoidingViewEnabled={true}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          <LinearGradient
            start={{x: 0.2, y: 0.8}}
            end={{x: 0.9, y: -0.9}}
            colors={Colors.gradient.primary}
            style={{width: '100%', height: '100%'}}>
            <View style={styles.RBSheetView}>
              <View style={styles.RBSheetTxtView1}>
                <Text size="small" style={styles.RBSheettxt}>
                  {strings.TOTAL_TO_COLLECT} = {currency}{' '}
                  {_.isEmpty(item)
                    ? _.toNumber(totalCharges).toFixed(2)
                    : (
                        _.toNumber(totalCharges) + _.toNumber(item.price)
                      ).toFixed(2)}
                </Text>
              </View>

              <View style={styles.RBSheetTxtView2}>
                <Text size="small" style={styles.RBSheettxt}>
                  {strings.SELECT_VEHICLE_OR_SCROLL}
                </Text>
              </View>
              <View style={{alignSelf: 'center', width: '100%'}}>
                <FlatList
                  data={wasphaVehicles}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{width: '100%'}}
                  keyExtractor={(data) => data.id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => renderEachItemClick(item)}>
                      <ItemListvehicle
                        item={item}
                        currency={currency}
                        itemId={itemId}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>

              <Button
                isLoading={vehicleLoader}
                disabled={vehicleLoader}
                onPress={() => renderDevilery()}
                style={[styles.RBSheetBtn, {marginTop: 20}]}>
                <Text
                  type="semiBold"
                  size="small"
                  style={[styles.confirmTxt, {textAlign: 'center'}]}>
                  {strings.CONFIRM_WASPHA_EXPRESS}
                </Text>
              </Button>

              <Button
                onPress={() =>
                  Actions.cancelOrder({orderId: traditionalOrderDetails.id})
                }
                style={[styles.RBSheetBtn, {marginTop: 12}]}>
                <Text
                  type="semiBold"
                  size="small"
                  style={[styles.confirmTxt, {textAlign: 'center'}]}>
                  {strings.CANCEL_ORDER}
                </Text>
              </Button>
            </View>
          </LinearGradient>
        </RBSheet>
      </View>
    );
  };
  render() {
    const {
      coordinates,
      getAddress,
      selectedRider,
      isBottomSheet,
      setValue,
      pickAddress,
      renderPickLocation,
      dropAddress,
      isPickShow,
      PickLocationChange,
      RBSheet,
      showDevivery,
      isShowBSheet,
      loader,
      showRider,
      isFindingRider,
      showMessageModal,
      traditionalOrderDetails,
      RBSheetRef,
    } = this.props;

    let directionData = [];

    let riders = [];

    if (
      !_.isNil(traditionalOrderDetails) &&
      !_.isEmpty(traditionalOrderDetails) &&
      !_.isNil(traditionalOrderDetails.driver) &&
      !_.isEmpty(traditionalOrderDetails.driver)
    ) {
      directionData = [
        {
          latitude: traditionalOrderDetails.delivery_location.lat,
          longitude: traditionalOrderDetails.delivery_location.lng,
        },

        {
          latitude: traditionalOrderDetails.pickup_location.lat,
          longitude: traditionalOrderDetails.pickup_location.lng,
        },
      ];

      riders = [
        {
          ...traditionalOrderDetails.driver,
        },
      ];
    }

    return (
      <View style={[styles.container]}>
        <Loader loading={loader} />
        {isFindingRider && (
          <View style={styles.loaderStyle}>
            <ActivityIndicator size={'large'} color={Colors.green} />
            <Text type="bold" size={18}>
              {strings.FINDING_RIDER}
            </Text>
          </View>
        )}
        {!loader && (
          <Maps
            riders={riders}
            fromWasphaExpress={true}
            directionData={directionData}
            initialRoute={coordinates}
            getAddress={getAddress}
            onMapDrag={() => setValue({isBottomSheet: false})}
          />
        )}

        {this.renderHeader()}
        {!isShowBSheet && this.renderConfirmBtn()}
        {isShowBSheet && this.renderBSheetBtn()}
        {!isShowBSheet && this.renderLocation()}
        {!isShowBSheet && this.picker()}
        {showDevivery && this.renderDelivery()}
        {this.renderBottomSheetConfirm()}
        {showMessageModal && (
          <RemoveItemModal
            title={strings.NO_RIDER_FOUND}
            btnOneText={strings.CHANGE_VEHICLE}
            btnTwoText={strings.CANCEL_ORDER}
            btnPositiveFunc={() => {
              setValue({showMessageModal: false});
              RBSheetRef.current.open();
            }}
            btnNegativeFunc={() => {
              setValue({showMessageModal: false});

              Actions.cancelOrder({orderId: traditionalOrderDetails.id});
            }}
            isModalOpen={showMessageModal}
            closeModal={setValue}
            modalType="showMessageModal"
            backPressEnable={false}
          />
        )}
      </View>
    );
  }
}
