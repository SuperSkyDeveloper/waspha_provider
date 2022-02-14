import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  SectionList,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {
  Text,
  CustomNavbar,
  ImageViewer,
  VideoPlayer,
  Loader,
  TextMessage,
  ImageMessage,
  VideoMessage,
} from '../RCComponents';
import {RichTextEditor} from '../../components';
import {Colors, Images} from '../RCTheme';
import _ from 'lodash';
import styles from './RocketChatStyles';
import RCUtils from '../RCUtils';
import Modal from 'react-native-modal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {AppStyles, Fonts, Images as SrcImages} from '../../theme';
import util from '../../util';

let isMyMsg = false;

export default function RocketChatView(props) {
  const {
    sendMessage,
    onInputText,
    inputText,
    sectionListArray,
    renderStickyDate,
    updateStickyDate,
    handleImagePress,
    attachments,
    isImageViewVisible,
    setImageViewerVisibility,
    setImageObjectForImageViewer,
    isVideoModalVisible,
    setVideoModalVisibility,
    videoUri,
    userAvatar,
    isLoading,
    progressNumber,
    isChatLoader,
    chattingWithPersonName,
    isInternetConnected,
    hideNoInternetConnectionModal,
    isChatActive,
    refChat,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomNavbar
        title={`${chattingWithPersonName}`}
        titleStyle={styles.titleStyle}
        style={styles.customNavBarStyle}
      /> */}

      <TouchableOpacity
        style={styles.backWrap}
        onPress={() => {
          Actions.pop();
        }}>
        <Image source={Images.BackBtn} style={styles.backImg} />
      </TouchableOpacity>
      <View style={styles.InfoWrap}>
        <Image
          style={styles.imageStyle}
          // source={util.profilePlaceHolderImage(userAvatar)}
          source={
            _.isNil(userAvatar)
              ? SrcImages.ProfilePlaceholder
              : util.isValidURL(userAvatar)
              ? {uri: userAvatar}
              : userAvatar
          }
        />
        <Text
          style={AppStyles.mTop5}
          size={Fonts.size.xLarge}
          type={'semiBold'}>
          {chattingWithPersonName}
        </Text>
      </View>
      {!isInternetConnected && false && (
        <Modal
          isVisible={!isInternetConnected}
          onBackButtonPress={() => {}}
          onBackdropPress={() => {}}
          backdropOpacity={0.6}>
          <View style={styles.noInternetConnSec}>
            <Text style={{fontSize: 12, top: 15}}>
              Opps! Something went wrong
            </Text>
            <TouchableOpacity
              onPress={() => {
                hideNoInternetConnectionModal();
              }}>
              <View style={[styles.okBtn, {top: -3}]}>
                <Text style={styles.okBtnTextStyle}>{strings.OK}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <View style={styles.chatViewWrap}>
        <View style={styles.chatListWrap}>
          <>
            {isLoading && (
              <Loader
                loading={isLoading}
                loadingFor={'Uploading Image'}
                backdropOpacity={0.8}
                progress={progressNumber}
              />
            )}
            {isChatLoader && (
              <Loader
                loading={isChatLoader}
                loadingFor={'loading Chat'}
                backdropOpacity={0.8}
              />
            )}
            <Modal
              isVisible={isVideoModalVisible}
              style={styles.modal}
              animationIn="fadeIn"
              onBackButtonPress={() => {
                setVideoModalVisibility();
              }}
              onBackdropPress={() => {
                setVideoModalVisibility();
              }}
              backdropOpacity={0.6}
              animationOut="fadeOut">
              <VideoPlayer uri={videoUri} />
            </Modal>
            {/* {renderStickyDate()} */}
            <SectionList
              style={styles.sectionListPadding}
              inverted={true}
              onViewableItemsChanged={updateStickyDate}
              showsVerticalScrollIndicator={false}
              sections={sectionListArray}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => {
                isMyMsg = item.u.username == RCUtils.getRcUserName();

                return (
                  <View>
                    {_.isEmpty(item.attachments) && (
                      <TextMessage isMyMsg={isMyMsg} item={item} />
                    )}
                    {!_.isEmpty(item.attachments) &&
                      item.attachments[0].image_url && (
                        <ImageMessage
                          isMyMsg={isMyMsg}
                          item={item}
                          setImageObjectForImageViewer={
                            setImageObjectForImageViewer
                          }
                          setImageViewerVisibility={setImageViewerVisibility}
                        />
                      )}
                    {!_.isEmpty(item.attachments) &&
                      item.attachments[0].video_url && (
                        <VideoMessage
                          isMyMsg={isMyMsg}
                          item={item}
                          setVideoModalVisibility={setVideoModalVisibility}
                        />
                      )}

                    {!_.isEmpty(attachments) && attachments[0].image_url && (
                      <ImageMessage
                        isMyMsg={true}
                        item={{attachments}}
                        setImageObjectForImageViewer={
                          setImageObjectForImageViewer
                        }
                        setImageViewerVisibility={setImageViewerVisibility}
                      />
                    )}
                  </View>
                );
              }}
              renderSectionFooter={({section: {title}}) => (
                <View style={styles.stickyDate}>
                  <Text style={styles.stickyDateText}>{title}</Text>
                </View>
              )}
            />

            {isImageViewVisible && (
              <ImageViewer
                isImageViewVisible={isImageViewVisible}
                setImageViewerVisibility={setImageViewerVisibility}
                attachments={attachments}
              />
            )}
          </>
        </View>
        {!isInternetConnected && (
          <View style={styles.connectingStatusStyle}>
            <Text
              style={styles.connectingStatusTextStyle}>{`Connecting...`}</Text>
          </View>
        )}

        <View
          style={[styles.chatMessageSec, util.isRTL() && AppStyles.rowReverse]}>
          {/* <TouchableOpacity
            style={styles.attachStyle}
            onPress={() => {
              handleImagePress();
            }}>
            <Image source={Images.AttachmentIcon} />
          </TouchableOpacity> */}
          <View
            style={[styles.textInputStyle, !isChatActive && {opacity: 0.4}]}>
            {/* <TextInput
              editable={isChatActive}
              textAlign={!util.isRTL() ? 'left' : 'right'}
              placeholder={`${strings.WRITE_YOUR_MSG}…`}
              placeholderTextColor={Colors.grey2}
              value={inputText}
              style={styles.textInput}
              onChangeText={(inputText) => {
                onInputText(inputText);
              }}
            /> */}
            <RichTextEditor
              value={inputText}
              onChange={(inputText) => onInputText(inputText)}
              textAlign={util.isRTL() ? 'right' : 'left'}
              labelType={'semiBold'}
              disabled={!isChatActive}
              fontSize={Fonts.size.xxSmall}
              labelStyle={[
                AppStyles.labelStyle,
                util.isRTL() && AppStyles.alignRight,
              ]}
              placeholder={`${strings.WRITE_YOUR_MSG}…`}
              heightInput={60}
              refRichText={refChat}
            />
          </View>

          <TouchableOpacity
            disabled={!isInternetConnected || !isChatActive}
            onPress={() => {
              sendMessage();
            }}
            style={[styles.sendBtnBg]}>
            <Image
              source={Images.BackArrow}
              style={[
                styles.sendBtnStyle,
                util.isRTL()
                  ? {transform: [{rotate: '0deg'}]}
                  : {transform: [{rotate: '180deg'}]},
                ,
                !isChatActive && {opacity: 0.4},
              ]}
            />
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    </SafeAreaView>
  );
}
