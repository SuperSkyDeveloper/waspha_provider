import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  Switch,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  RiderListItem,
  Button,
  ConfirmationModal,
  Loader,
} from '../../components';
import styles from './RiderListingStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function RiderListingView(props) {
  const {
    handleSwitchBtn,
    isSwitchActive,
    isDeliveryGuyForm,
    ridersList,
    isLoading,
    vehicles,
    handleDeleteDriver,
    isAssignModalShow,
    handleAssignDriver,
    handleAssignModal,
    assignLoader,
    isForAssign,
    deleteRiderLoader,
    isDeleteBtnShow,
    isOnline,
    isDeletableDriver,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <ImageBackground
          style={styles.image}
          source={
            isOnline ? Images.OnlineGuyCoverImg : Images.OfflineGuyCoverImg
          }>
          <View style={styles.overlay} />
          <TouchableOpacity
            style={[styles.touchBox, util.isRTL() && styles.touchBoxRtl]}
            onPress={() => {
              Actions.pop();
            }}>
            <RnImage
              source={Images.BackBtn}
              style={[
                styles.backBtnStyle,
                util.isRTL() && styles.backBtnStyleRtl,
              ]}
            />
          </TouchableOpacity>
          {!isDeliveryGuyForm && (
            <View style={styles.imageTextWrap}>
              <Text
                color={Colors.text.secondary}
                size={Fonts.size.xxLarge}
                type="semiBold"
                style={styles.imageTextStyle}
                textAlign={util.rtlRightText()}>
                {strings.ASSIGN.toLocaleUpperCase()}
              </Text>
              <Text
                textAlign={util.rtlRightText()}
                color={Colors.text.secondary}
                size={Fonts.size.xxxLarge}
                type="bold"
                style={styles.imageTextStyle}>
                {strings.OFFLINE.toUpperCase()}
              </Text>
              <Text
                textAlign={util.rtlRightText()}
                color={Colors.text.secondary}
                size={Fonts.size.xxLarge}
                type="semiBold"
                style={styles.imageTextStyle}>
                {strings.RIDER}
              </Text>
            </View>
          )}
        </ImageBackground>
      </View>
      {/* 
      {!isDeliveryGuyForm && (
        <View style={styles.switchFilterWrap}>
          <Text
            style={[AppStyles.mTop5]}
            type={'semiBold'}
            color={Colors.text.quaternary}
            size={Fonts.size.xxSmall}>
            {strings.VEHICLE_FILTER}
          </Text>
          <Switch
            trackColor={{
              false: Colors.button.tertiary,
              true: Colors.button.accent,
            }}
            ios_backgroundColor="#3e3e3e"
            thumbTintColor={Colors.background.primary}
            onValueChange={handleSwitchBtn}
            value={isSwitchActive}
            style={
              util.isPlatformAndroid() ? styles.androidSize : styles.iosSize
            }
          />
        </View>
      )} */}

      {isLoading && <Loader loading={isLoading} />}

      {!isLoading && (
        <FlatList
          data={ridersList}
          style={[AppStyles.mTop5]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          renderItem={({item}) => {
            return (
              <RiderListItem
                isDeleteBtnShow={isDeleteBtnShow}
                deletePress={handleDeleteDriver}
                isDeliveryGuyForm={isDeliveryGuyForm}
                item={item}
                itemPress={handleAssignModal}
                vehicles={vehicles}
                isForAssign={isForAssign}
                deletable={isDeletableDriver}
                isLoading={deleteRiderLoader}
              />
            );
          }}
          ListEmptyComponent={
            <Text style={AppStyles.mTop30} textAlign="center">
              {strings.NO_DRIVER_FOUNDS}
            </Text>
          }
        />
      )}
      {isAssignModalShow && (
        <ConfirmationModal
          isModalVisible={isAssignModalShow}
          title={strings.ARE_YOU_SURE_ASSIGN}
          successBtnPress={handleAssignDriver}
          successBtnTitle={strings.ASSIGNS}
          successBtnLoading={assignLoader}
          negativeBtnPress={handleAssignModal}
          negativeBtnTitle={strings.CANCEL}
        />
      )}
    </SafeAreaView>
  );
}
