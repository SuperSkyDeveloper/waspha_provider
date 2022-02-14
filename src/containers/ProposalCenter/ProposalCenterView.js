import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  ProposalCenterListItem,
  CustomNavbar,
  Loader,
} from '../../components';
import styles from './ProposalCenterStyles';
import {strings} from '../../constants';
import {Colors, AppStyles} from '../../theme';

export default function ProposalCenterView(props) {
  const {proposalData, isLoading, onRefresh} = props;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${strings.PROPOSAL_CENTER}`}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />
      {isLoading && (
        <View style={AppStyles.mTop20}>
          <Loader loading={isLoading} />
        </View>
      )}
      {!isLoading && (
        <FlatList
          style={AppStyles.mTop40}
          data={proposalData}
          showsVerticalScrollIndicator={false}
          onRefresh={() => onRefresh()}
          refreshing={isLoading}
          renderItem={({item, index}) => {
            return <ProposalCenterListItem item={item} />;
          }}
          ListEmptyComponent={
            <Text style={styles.emptyComponent} textAlign="center">
              {strings.NO_ORDER_FOUND}
            </Text>
          }
        />
      )}
    </View>
  );
}
