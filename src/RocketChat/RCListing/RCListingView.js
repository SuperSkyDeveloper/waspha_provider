import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {CHAT_SERVER} from '../RCConstants';
import {CustomNavbar, Loader, HTMLView, Text} from '../../components';
import styles from './RCListingStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import RCUtils from '../RCUtils';
import moment from 'moment';

export default function RCListingView(props) {
  const {isLoading, chatListing, user, activeOrders} = props;

  console.log({chatListing});

  let sortedArray = _.orderBy(chatListing, (a) => moment(a._updatedAt), 'desc');

  console.log({sortedArray});

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.CHATS}
        titleColor={Colors.text.secondary}
        hasBack={true}
        hasBottomRadius={true}
      />

      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <View style={[AppStyles.flex, AppStyles.mTop20]}>
          <FlatList
            data={sortedArray}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (chatListing.length === 1 && item._id === 'GENERAL') {
                return (
                  <Text style={AppStyles.mTop30} textAlign="center">
                    {strings.NO_CHATS_FOUNDS}
                  </Text>
                );
              }

              if (item._id === 'GENERAL') {
                return true;
              }

              let chatPersonName = '';
              let chatPersonNameRcUser = '';
              let orderId = '';
              if (item.usersCount < 3) {
                chatPersonNameRcUser = item.fname
                  .split('--')
                  .find(
                    (item) => !util.isNumber(item) && item !== user.rc_username,
                  );
                chatPersonName = _.capitalize(
                  chatPersonNameRcUser.split('_')[0],
                );
              }
              orderId = item.fname
                .split('--')
                .find((item) => util.isNumber(item));
              let isActive = activeOrders.includes(_.toNumber(orderId));
              let userImage = `${CHAT_SERVER}/avatar/${chatPersonNameRcUser}`;

              console.log({userImage});

              return (
                <TouchableOpacity
                  style={[styles.listWrap]}
                  activeOpacity={0.9}
                  onPress={() => {
                    Actions.rocketChatContainer({
                      fromChatListing: true,
                      fromListChannelName: item.fname,
                      chattingWithPersonName:
                        item.usersCount > 2
                          ? `${strings.WASPHA} @ Order ID ${orderId}`
                          : chatPersonName,
                      isChatActive: isActive,
                      userAvatar:
                        item.usersCount > 2 ? Images.WasphaIcon : userImage,

                      // userAvatar:
                      //   !_.isEmpty(item.lastMessage) &&
                      //   item.lastMessage.u.avatar,
                    });
                  }}>
                  <Text
                    // type="medium"
                    // textAlign={util.isRTL()?'left':'right'}

                    size={Fonts.size.xxxSmall}
                    color={Colors.text.quaternary}
                    style={[
                      styles.timeAgo,
                      util.isRTL()
                        ? {left: 10, alignSelf: 'flex-start'}
                        : {right: 5, alignSelf: 'flex-end'},
                    ]}>
                    {!_.isEmpty(item.lastMessage) &&
                      RCUtils.momentFromNow(item.lastMessage.ts)}
                  </Text>
                  <View
                    style={[
                      styles.row,
                      util.isRTL() && [
                        {
                          justifyContent: 'flex-end',
                          flexDirection: 'row-reverse',
                        },
                      ],
                    ]}>
                    {/* <View style={styles.dot} /> */}
                    <RnImage
                      source={
                        item.usersCount > 2
                          ? Images.WasphaIcon
                          : {uri: userImage}
                      }
                      style={styles.imageStyle}
                    />
                    <View
                      style={[
                        styles.contentWrap,
                        util.isRTL() && {alignItems: 'flex-end'},
                      ]}>
                      <View>
                        <View style={[!util.isRTL() && {width: '72%'}]}>
                          <Text
                            textAlign={util.isRTL() ? 'right' : 'left'}
                            type="medium"
                            size={Fonts.size.xSmall}
                            color={Colors.text.penta}>
                            {item.usersCount > 2
                              ? `${strings.WASPHA} @ Order ID ${orderId}`
                              : chatPersonName}
                          </Text>
                        </View>
                        {/* <Text
                          textAlign={util.isRTL() ? 'right' : 'left'}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          type="medium"
                          style={AppStyles.mTop5}
                          size={Fonts.size.xxSmall}
                          color={Colors.text.penta}>
                          {util.isValueEmpty(
                            !_.isEmpty(item.lastMessage) &&
                              item.lastMessage.msg,
                          )}
                        </Text> */}
                        <HTMLView
                          htmlContent={util.isValueEmpty(
                            !_.isEmpty(item.lastMessage) &&
                              item.lastMessage.msg,
                          )}
                          type="medium"
                          size={Fonts.size.xxSmall}
                          color={Colors.text.penta}
                          textAlign={util.isRTL() ? 'right' : 'left'}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={AppStyles.mTop30} textAlign="center">
                {strings.NO_CHATS_FOUNDS}
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
}
