import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {CustomNavbar, OptionListItem, Text} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './WasphaOptionsStyles';
export default function WasphaOptionsView(props) {
  const {getTraditionalOrderDetailsSuccess} = props;
  const OPTION_LIST = [
    {
      id: 1,
      title: strings.CREATE_ORDER,
      icon: Images.createOrder,

      action: () => {
        getTraditionalOrderDetailsSuccess({});
        Actions.wasphaExpress();
      },
    },
    {
      id: 2,
      title: strings.WASPHA_ORDERS,
      icon: Images.wasphaOrders,

      action: () => {
        Actions.traditionalOrders();
      },
    },
  ];

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.WASPHA_BOX}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      <View style={styles.optionSec}>
        <FlatList
          data={OPTION_LIST}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={AppStyles.mBottom20}>
                <OptionListItem item={item} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
