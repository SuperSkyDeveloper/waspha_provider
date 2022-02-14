import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  DashboardHeader,
  NotificationListItem,
  ReasonModal,
  Loader,
} from '../../components';
import styles from './NotificationStyles';
import {AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';

export default function NotificationView(props) {
  const {
    isModalVisible,
    handleModalVisible,
    notifications,
    isLoading,
    isNotificationScreen,
    accountApproved,
  } = props;

  return (
    <View style={styles.container}>
      <DashboardHeader
        isNotificationScreen={isNotificationScreen}
        accountApproved={accountApproved}
      />
      <View style={AppStyles.flex}>
        {isLoading && <Loader loading={isLoading} />}
        {!isLoading && (
          <FlatList
            data={notifications}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <NotificationListItem
                  item={item}
                  handleModalVisible={handleModalVisible}
                />
              );
            }}
            ListEmptyComponent={
              <Text style={AppStyles.mTop30} textAlign="center">
                {strings.NOTIFICATION_NOT_FOUND}
              </Text>
            }
          />
        )}
      </View>
      <View>
        {isModalVisible && (
          <ReasonModal
            isModalVisible={isModalVisible}
            handleCloseModal={handleModalVisible}
          />
        )}
      </View>
    </View>
  );
}
