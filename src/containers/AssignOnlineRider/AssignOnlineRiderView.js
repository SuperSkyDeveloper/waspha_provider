import React from 'react';
import {View, Image as RnImage, ActivityIndicator} from 'react-native';
import {Text, Maps, CustomNavbar, Loader} from '../../components';
import styles from './AssignOnlineRiderStyles';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';

export default function AssignOnlineRiderView(props) {
  const {
    riders,
    storeProfile,
    isLoading,
    onlineRiderList,
    handleAssignDriver,
    assignOnlineLoader,
  } = props;

  //map initial location
  const storeLocation = [
    {
      latitude: storeProfile.location.lat,
      longitude: storeProfile.location.lng,
    },
  ];

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.ASSIGN_ONLINE_RIDER}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      {isLoading && <Loader loading={isLoading} />}

      {!isLoading && (
        <Maps
          handleAssignDriver={handleAssignDriver}
          riders={onlineRiderList}
          initialRoute={storeLocation[0]}
          assignOnlineLoader={assignOnlineLoader}
        />
      )}
    </View>
  );
}
