import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  ActivityIndicatorBase,
  // Modal,
} from 'react-native';
import _ from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import {
  Text,
  SignHeader,
  TextInput,
  Button,
  DeliveryShift,
  PhoneInput,
  TimePicker,
  BusinessCategories,
  Image,
  ImagePicker,
  Loader,
  RichTextEditor,
} from '../../components';
import styles from './ApplicationFormStyles';
import {AppStyles, Images, Colors, Fonts, Metrics} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {inputFieldsLimit} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {getTimeShortForm} from '../../helpers/generalHelper';

// export default function ApplicationFormView(props) {
class ApplicationFormView extends React.Component {
  //handle document show
  documentRender = (data) => {
    const {
      handleRemoveDocument,
      visibleDocModal,
      selectedDocIndex,
      setValue,
    } = this.props;
    const images = [];

    return (
      <>
        {data.length > 2 && (
          <View
            style={{
              // position: 'absolute',
              marginTop: 20,
              marginRight: 10,
              top: 17,
              right: 0,
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <Text
              removeFontFamily={true}
              style={{opacity: 0.8, color: '#5D3FD3'}}
              size={23}
              type="bold">
              {'<'}
            </Text>
            <Text
              removeFontFamily={true}
              style={{opacity: 0.8, color: '#5D3FD3'}}
              size={23}
              type="bold">
              {' >'}
            </Text>
          </View>
        )}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.docWrap}>
          {data.map((item, index) => {
            if (item.includes('.pdf')) {
            } else {
              images.push({
                url: item,
              });
            }

            return (
              <View key={item} style={styles.docImage}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleRemoveDocument(index)}
                  style={styles.wrapCross}>
                  <RnImage
                    source={Images.CancelBtn}
                    style={styles.imageSize}
                    tintColor={Colors.text.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setValue({
                      visibleDocModal: true,
                      selectedDocIndex: index,
                    })
                  }>
                  <RnImage
                    style={{width: 100, height: 100, borderRadius: 10}}
                    source={
                      item.includes('.pdf')
                        ? Images.PdfIcon
                        : {
                            uri: item,
                          }
                    }
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        {/* <View> */}
        <Modal
          style={{padding: 0, margin: 0}}
          onBackButtonPress={() => setValue({visibleDocModal: false})}
          onBackdropPress={() => setValue({visibleDocModal: false})}
          visible={visibleDocModal}
          transparent={true}>
          <ImageViewer
            onSwipeDown={() => setValue({visibleDocModal: false})}
            index={selectedDocIndex}
            imageUrls={images}
            enableSwipeDown={true}
            swipeDownThreshold={12}
          />
        </Modal>
        {/* </View> */}
      </>
    );
  };

  render() {
    const {
      selectedSubCategoryError,
      selectedCategoryError,
      documentError,
      radioBtnData,
      scheduleOptIndex,
      onRadioButtonPress,
      handleDeleteShift,
      onCategoryItemPress,
      selectedCategoryId,
      phoneError,
      phone,
      phoneFocus,
      handleSubmit,
      deliveryRangeFocus,
      businessName,
      businessNameError,
      address,
      deliveryRangeValue,
      addressError,
      deliveryRangeError,
      // addressFocus,
      mainCategories,
      setValue,
      subcategoryCategories,
      handleSelectSubCategory,
      selectedSubCategory,
      documentData,
      isLoading,
      handleDocumentUpload,
      scheduleError,
      isHelpModalVisible,
      handleHelpModal,
      isDocumentError,

      handleSelectDay,
      schedule,
      handleScheduleShift,
      handleCloseTimeModal,
      handleAddNewShift,
      isTimeModalVisible,
      handleTimeModal,
      shiftIndex,
      dayIndex,
      timeModalFor,

      proposalPrepTime,
      proposalPrepTimeError,
      proposalSelectionTime,
      proposalSelectionTimeError,

      handleReqCategoryModal,
      showReqCategoryModal,
      handleCloseReqCategoryModal,
      requestedCategory,
      requestedCategoryError,
      handleOpenReqCategoryModal,
      refRBSheet,
      handleProposalTimeType,
      handleTimeOptionSheet,
      preperationTimeType,
      selectionTimeType,
      handleGetAddressData,
      businessCategories,
      moreCategoryBtnDisable,
      handleMoreCategory,
      storeProfileLoading,
      storeProfile,
      isForEdit,
      documentLoader,
      isImgUploadVisible,
      businessLogo,
      handleUploadBusinessLogo,
      closeImageModal,
      businessLogoError,
      translations,
      businessNameAr,
      refBusiness,
      refBusinessAR,
    } = this.props;

    return (
      <KeyboardAwareScrollView
        scrollEnabled
        //keyboardShouldPersistTaps="always"
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <SignHeader
          showMask={false}
          subTitle={strings.FORM}
          title={strings.APPLICATION}
          isForEdit={isForEdit}
        />
        {storeProfileLoading && <Loader loading={storeProfileLoading} />}
        {!storeProfileLoading && (
          <View style={AppStyles.flex}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.profileImgWrap}>
                <TouchableOpacity
                  onPress={() => setValue({isImgUploadVisible: true})}
                  style={[
                    util.isRTL() ? {left: -10} : {right: -10},
                    styles.cameraIconWrap,
                  ]}>
                  <RnImage
                    source={Images.CameraIcon}
                    style={{width: 17, height: 17}}
                  />
                </TouchableOpacity>

                <Image
                  style={styles.profileImg}
                  source={util.profilePlaceHolderImage(businessLogo)}
                />
              </View>
            </View>

            {/* business Logo  error */}
            {businessLogoError !== '' && (
              <View style={AppStyles.mTop5}>
                <Text
                  type="medium"
                  size={Fonts.size.xxSmall}
                  color={Colors.error.primary}
                  textAlign="center"
                  style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                  {businessLogoError}
                </Text>
              </View>
            )}

            <View style={styles.wraper}>
              {/* <TextInput
                // textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={translations.strings['en'].ENTER_BUSSINESS_NAME}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[
                  AppStyles.labelStyle,
                  // util.isRTL() && AppStyles.alignRight,
                ]}
                label={translations.strings['en'].BUSINESS_NAME}
                value={businessName}
                error={businessNameError}
                maxLength={inputFieldsLimit.mLimit100}
                onChangeText={(val) => {
                  setValue({businessName: val});
                }}
                // ref={(ref) => {
                //   props.businessNameRef(ref);
                // }}
                onSubmitEditing={phoneFocus}
              /> */}

              <RichTextEditor
                inputStyle={AppStyles.inputStyle}
                value={businessName}
                error={businessNameError}
                onChange={(text) => setValue({businessName: text})}
                textAlign={'left'}
                label={translations.strings['en'].BUSINESS_NAME}
                fontSize={Fonts.size.xxSmall}
                refRichText={refBusiness}
                heightInput={40}
                isLabel={true}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                placeholder={translations.strings['en'].ENTER_BUSSINESS_NAME}
              />
              {/* <TextInput
                placeholder={translations.strings['ar'].ENTER_BUSSINESS_NAME}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={[
                  AppStyles.inputStyle,
                  AppStyles.alignRight,
                  {
                    textAlign: 'right',
                  },
                ]}
                labelStyle={[
                  AppStyles.labelStyle,
                  AppStyles.mTop10,
                  AppStyles.alignRight,
                ]}
                label={translations.strings['ar'].BUSINESS_NAME}
                value={businessNameAr}
                maxLength={inputFieldsLimit.mLimit100}
                onChangeText={(val) => {
                  setValue({businessNameAr: val});
                }}
                onSubmitEditing={phoneFocus}
              /> */}

              <RichTextEditor
                placeholder={translations.strings['ar'].ENTER_BUSSINESS_NAME}
                inputStyle={AppStyles.inputStyle}
                labelStyle={[
                  AppStyles.labelStyle,
                  AppStyles.mTop10,
                  AppStyles.alignRight,
                ]}
                heightInput="30"
                textAlign={'right'}
                label={translations.strings['ar'].BUSINESS_NAME}
                value={businessNameAr}
                maxLength={inputFieldsLimit.mLimit100}
                onChangeText={(val) => {
                  setValue({businessNameAr: val});
                }}
                refRichText={refBusinessAR}
              />

              {/* phone input */}
              {isForEdit && (
                <View style={[AppStyles.mTop30, styles.disblebg]}>
                  <Text
                    style={[
                      AppStyles.labelStyle,
                      util.isRTL() && AppStyles.alignRight,
                    ]}
                    textAlign={util.rtlRightText()}>
                    {strings.PHONE}
                  </Text>
                  <Text
                    style={[
                      AppStyles.inputStyle,
                      AppStyles.mTop5,
                      util.isRTL() && AppStyles.alignRight,
                    ]}
                    numberOfLines={1}
                    type="medium"
                    textAlign={util.rtlRightText()}>
                    {phone}
                  </Text>
                </View>
              )}
              {!isForEdit && (
                <View style={AppStyles.mTop20}>
                  <PhoneInput
                    onNumberChange={(val, ref) => {
                      setValue({phone: val});
                    }}
                    error={phoneError}
                  />
                </View>
              )}
              {/* enter address  */}
              <View style={AppStyles.mTop30}>
                <Text
                  // textAlign={util.rtlRightText()}
                  style={[
                    AppStyles.labelStyle,
                    {textAlign: util.isRTL() ? 'right' : 'left'},
                  ]}>
                  {strings.ADDRESS}
                </Text>
                <TouchableOpacity
                  style={[AppStyles.mTop5, styles.border]}
                  onPress={() => {
                    Actions.selectLocationMap({handleGetAddressData});
                  }}>
                  <Text
                    style={AppStyles.inputStyle}
                    numberOfLines={1}
                    type="medium">
                    {address.formatted_address}
                  </Text>
                </TouchableOpacity>
                {!_.isEmpty(addressError) && (
                  <Text
                    type="medium"
                    size={Fonts.size.xxSmall}
                    color={Colors.error.primary}
                    textAlign={util.rtlRightText()}
                    style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                    {addressError}
                  </Text>
                )}
              </View>
              {/* delivery range */}
              <View style={[AppStyles.mTop20, AppStyles.mBottom15]}>
                <View
                  style={[
                    util.isRTL() ? [AppStyles.rowReverse] : AppStyles.flexRow,
                  ]}>
                  <Text
                    color={Colors.text.primary}
                    size={Fonts.size.small}
                    type="bold"
                    textAlign={util.rtlRightText()}
                    style={AppStyles.mTop10}>
                    {strings.DELIVERY_RANGE}
                  </Text>
                  <View
                    style={[
                      styles.inputWrap,

                      {
                        flex: 1,
                        alignItems: util.isRTL() ? 'center' : 'center',
                        justifyContent: util.isRTL() ? 'flex-end' : 'center',
                      },
                      util.isRTL() ? [AppStyles.rowReverse] : AppStyles.flexRow,
                    ]}>
                    <View
                      style={
                        util.isRTL()
                          ? !util.isPlatformAndroid()
                            ? {marginLeft: Metrics.screenWidth / 9}
                            : {marginLeft: Metrics.screenWidth / 7}
                          : AppStyles.mRight10
                      }>
                      <TextInput
                        maxLength={5}
                        placeholderTextColor={Colors.text.quaternary}
                        inputStyle={styles.preperationInput}
                        keyboardType={'numeric'}
                        value={`${deliveryRangeValue}`}
                        onChangeText={(val) => {
                          setValue({deliveryRangeValue: val});
                        }}
                      />
                    </View>
                    <View
                      style={[
                        AppStyles.mTop5,
                        util.isRTL() ? AppStyles.mRight5 : AppStyles.mLeft5,
                      ]}>
                      <Text
                        style={styles.phoneNumTextStyle}
                        color={Colors.text.primary}
                        size={Fonts.size.xSmall}
                        type="semiBold">
                        {strings.KM}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  {/* delivery range error */}
                  {deliveryRangeError !== '' && (
                    <View
                      style={[
                        styles.deliveryRangeInputErrorStyle,
                        util.isRTL() && {alignSelf: 'flex-end'},
                      ]}>
                      <Text
                        type="medium"
                        size={Fonts.size.xxSmall}
                        color={Colors.error.primary}
                        style={[
                          AppStyles.mTop5,
                          AppStyles.mBottom5,
                          {textAlign: util.isRTL() ? 'right' : 'left'},
                        ]}>
                        {deliveryRangeError}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {/* rfp preperation time */}
              <View
                style={[
                  util.isRTL()
                    ? [AppStyles.rowReverse, AppStyles.spaceBetween]
                    : AppStyles.flexRow,
                ]}>
                <View
                  style={[
                    {
                      marginTop: Metrics.baseMargin,

                      maxWidth: '50%',
                    },
                    !util.isPlatformAndroid() && [
                      util.isRTL()
                        ? {marginLeft: Metrics.screenWidth / 12}
                        : {marginRight: Metrics.screenWidth / 18},
                    ],
                  ]}>
                  <Text
                    color={Colors.text.primary}
                    size={Fonts.size.small}
                    type="bold"
                    textAlign={util.rtlRightText()}>
                    {strings.ORDER_PREPARATION_TIME}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <View
                    style={[
                      styles.inputWrap,
                      util.isRTL() && styles.inputWrapRtl,
                    ]}>
                    <View
                      style={[
                        AppStyles.mTop15,
                        AppStyles.flexRow,
                        AppStyles.alignItemsCenter,
                      ]}>
                      <TextInput
                        value={`${proposalPrepTime}`}
                        maxLength={3}
                        placeholderTextColor={Colors.text.quaternary}
                        inputStyle={styles.preperationInput}
                        keyboardType={'phone-pad'}
                        onChangeText={(val) => {
                          setValue({proposalPrepTime: val});
                        }}
                      />
                      <TouchableOpacity
                        style={[styles.preperationInput, styles.boxWrap]}
                        onPress={() => {
                          handleTimeOptionSheet('on');
                          setValue({timeBottomSheetFor: 'preperationTime'});
                        }}>
                        <RnImage
                          source={Images.DownArrowIcon}
                          style={styles.btnImage}
                        />
                        <Text size={Fonts.size.xxSmall} type="medium">
                          {getTimeShortForm(preperationTimeType)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* proposalPrepTimeError error */}
              {proposalPrepTimeError !== '' && (
                <View
                  style={[
                    styles.deliveryRangeInputErrorStyle,
                    util.isRTL() && {alignSelf: 'flex-end'},
                  ]}>
                  <Text
                    type="medium"
                    size={Fonts.size.xxSmall}
                    color={Colors.error.primary}
                    textAlign={util.rtlRightText()}
                    style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                    {proposalPrepTimeError}
                  </Text>
                </View>
              )}

              {/* proposal selection time */}
              <View
                style={[
                  util.isRTL()
                    ? [AppStyles.rowReverse, AppStyles.spaceBetween]
                    : AppStyles.flexRow,
                ]}>
                <View
                  style={[
                    {
                      marginTop: Metrics.mediumBaseMargin,

                      maxWidth: '50%',
                    },

                    !util.isPlatformAndroid() && {minWidth: '48%'},
                    !util.isRTL() && {marginRight: 10},
                  ]}>
                  <Text
                    color={Colors.text.primary}
                    size={Fonts.size.small}
                    type="bold"
                    textAlign={util.rtlRightText()}>
                    {strings.PROPOSAL_TIME_OUT}
                  </Text>
                </View>
                <View style={[styles.wrapper]}>
                  <View
                    style={[
                      styles.inputWrap,
                      util.isRTL() && styles.inputWrapRtl,
                    ]}>
                    <View
                      style={[
                        AppStyles.mTop15,
                        AppStyles.flexRow,
                        AppStyles.alignItemsCenter,
                      ]}>
                      <TextInput
                        value={`${proposalSelectionTime}`}
                        maxLength={3}
                        placeholderTextColor={Colors.text.quaternary}
                        inputStyle={styles.preperationInput}
                        keyboardType={'phone-pad'}
                        onChangeText={(val) => {
                          setValue({proposalSelectionTime: val});
                        }}
                      />
                      <TouchableOpacity
                        style={[styles.preperationInput, styles.boxWrap]}
                        onPress={() => {
                          handleTimeOptionSheet('on');
                          setValue({timeBottomSheetFor: 'timeOut'});
                        }}>
                        <RnImage
                          source={Images.DownArrowIcon}
                          style={styles.btnImage}
                        />
                        <Text size={Fonts.size.xxSmall} type="medium">
                          {getTimeShortForm(selectionTimeType)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/* proposalPrepTimeError error */}
              {proposalSelectionTimeError !== '' && (
                <View
                  style={[
                    styles.deliveryRangeInputErrorStyle,
                    util.isRTL() && {alignSelf: 'flex-end'},
                  ]}>
                  <Text
                    type="medium"
                    size={Fonts.size.xxSmall}
                    color={Colors.error.primary}
                    style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                    {proposalSelectionTimeError}
                  </Text>
                </View>
              )}
              {/* category */}
              <View style={AppStyles.mTop50}>
                <View style={styles.businessCategory}>
                  <Text
                    textAlign={util.rtlRightText()}
                    color={Colors.text.primary}
                    fontSize={Fonts.size.xSmall}
                    type={'bold'}>
                    {strings.BUSINESS_CATEGORY}
                  </Text>
                </View>
                {/* categories section */}

                <FlatList
                  inverted={util.isRTL()}
                  keyExtractor={(item, index) => `categoriesList_${index}`}
                  data={businessCategories}
                  showsVerticalScrollIndicator={false}
                  //keyboardShouldPersistTaps="always"
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <BusinessCategories
                        data={item}
                        mainCategories={item.mainCategories}
                        selectedCategoryId={selectedCategoryId}
                        selectedCategoryError={selectedCategoryError}
                        subcategoryCategories={item.subcategories}
                        handleSelectSubCategory={handleSelectSubCategory}
                        onCategoryItemPress={onCategoryItemPress}
                        selectedSubCategoryError={selectedSubCategoryError}
                        selectedSubCategory={selectedSubCategory}
                        categoryListIndex={index}
                      />
                    );
                  }}
                />

                <View style={[styles.btnWrapNewProviderType]}>
                  <Text
                    style={[AppStyles.mTop5, AppStyles.mBottom5]}
                    color={Colors.text.primary}
                    size={Fonts.size.xSmall}
                    type="semiBold">
                    {requestedCategory}
                  </Text>
                  <TouchableOpacity
                    disabled={moreCategoryBtnDisable}
                    onPress={handleMoreCategory}>
                    <View
                      style={[
                        styles.newProviderTypeWrap,
                        moreCategoryBtnDisable && styles.disbleBtn,
                      ]}>
                      <Text type="semiBold" color={Colors.text.secondary}>
                        {strings.NEW_PROVIDER_TYPE}
                      </Text>
                      <RnImage
                        style={styles.plusIconStyle}
                        source={Images.AddButton}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* timing section */}
              <View style={styles.timings}>
                <Text
                  color={Colors.text.primary}
                  fontSize={Fonts.size.xSmall}
                  type={'bold'}
                  textAlign={util.rtlRightText()}>
                  {strings.TIMINGS}
                </Text>
                <RadioForm
                  style={styles.radioFormStyle}
                  formHorizontal={true}
                  animation={true}>
                  {/* To create radio buttons, loop through your array of options */}
                  {radioBtnData.map((obj, i) => (
                    <RadioButton key={i} labelHorizontal={true} key={i}>
                      {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={scheduleOptIndex === i}
                        onPress={(value) => {
                          onRadioButtonPress(value);
                        }}
                        borderWidth={1}
                        buttonInnerColor={Colors.button.tertiary}
                        buttonOuterColor={Colors.button.tertiary}
                        buttonSize={10}
                        buttonOuterSize={20}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={() => {
                          onRadioButtonPress(i);
                        }}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>

                {/* select day and time section */}
                {scheduleOptIndex === 0 && (
                  <DeliveryShift
                    handleSelectDay={handleSelectDay}
                    schedule={schedule}
                    handleAddNewShift={handleAddNewShift}
                    handleTimeModal={handleTimeModal}
                    handleDeleteShift={handleDeleteShift}
                  />
                )}
                <View>
                  {!_.isEmpty(scheduleError) && (
                    <Text
                      type="medium"
                      size={Fonts.size.xxSmall}
                      color={Colors.error.primary}
                      textAlign={util.rtlRightText()}
                      style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                      {scheduleError}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* selected document */}
            {!_.isEmpty(documentData) && this.documentRender(documentData)}
            {documentLoader && <Loader loading={documentLoader} />}
            <View
              style={[
                styles.btnWrap,
                styles.paddingHr,
                util.isRTL() ? AppStyles.mRight15 : AppStyles.mLeft15,
              ]}>
              <View
                style={[
                  styles.documentUploader,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <TouchableOpacity onPress={handleDocumentUpload}>
                  <View
                    style={[
                      styles.viewWrap,
                      util.isRTL()
                        ? {marginLeft: 15, paddingHorizontal: 83}
                        : {minWidth: Metrics.screenWidth / 12},
                    ]}>
                    <RnImage
                      style={styles.uploadDocImage}
                      source={Images.UploadDocument}
                    />
                    <Text
                      type="semiBold"
                      size={Fonts.size.normal}
                      color={Colors.text.secondary}>
                      {strings.UPLOAD_DOCUMENT}
                      {/* ajshj */}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleHelpModal}
                  style={[util.isRTL() && AppStyles.mRight10]}>
                  <RnImage
                    source={Images.HelpIcon}
                    style={[
                      styles.helpIcon,
                      util.isRTL() && {
                        transform: [{rotate: '-180deg'}, {rotateX: '-180deg'}],
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              {isDocumentError && (
                <View style={styles.havingProblemSec}>
                  <Text color={Colors.text.quaternary} size={Fonts.size.xSmall}>
                    {strings.HAVING_PROBLEM}{' '}
                  </Text>
                  <TouchableOpacity onPress={handleDocumentUpload}>
                    <Text size={Fonts.size.xSmall} color={Colors.text.accent}>
                      {strings.TRY_AGAIN}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {!_.isEmpty(documentError) && (
                <Text
                  type="medium"
                  size={Fonts.size.xxSmall}
                  color={Colors.error.primary}
                  textAlign={util.rtlRightText()}
                  style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                  {documentError}
                </Text>
              )}
            </View>
            <View style={[styles.submitBtnWrap, styles.paddingHr]}>
              <Button
                color={Colors.text.secondary}
                background={Colors.button.primary}
                style={styles.submitBtn}
                size={Fonts.size.normal}
                onPress={handleSubmit}
                isLoading={isLoading}
                indicatorColor={Colors.text.secondary}
                disabled={isLoading}
                type="bold">
                {isForEdit ? strings.UPDATE : strings.SUBMIT}
              </Button>
            </View>

            {/* help modal */}
            {isHelpModalVisible && (
              <Modal
                isVisible={isHelpModalVisible}
                style={styles.modal}
                onBackButtonPress={handleHelpModal}
                onBackdropPress={handleHelpModal}>
                <View style={styles.modalWrap}>
                  <Text
                    style={styles.text}
                    size={Fonts.size.xxSmall}
                    color={Colors.text.secondary}
                    textAlign={util.rtlRightText()}>
                    {strings.HELP_INFO_VENDOR}
                  </Text>
                  <Button
                    color={Colors.text.secondary}
                    background={Colors.button.secondary}
                    style={AppStyles.mTop25}
                    size={Fonts.size.xSmall}
                    onPress={handleHelpModal}
                    type="semiBold">
                    {strings.CLOSE}
                  </Button>
                </View>
              </Modal>
            )}
            {/* shift time modal */}
            {isTimeModalVisible && (
              <TimePicker
                visible={isTimeModalVisible}
                onSelect={handleScheduleShift}
                onClose={handleCloseTimeModal}
                data={{shiftIndex, dayIndex, timeModalFor}}
              />
            )}
          </View>
        )}
        {showReqCategoryModal && (
          <KeyboardAwareScrollView
            scrollEnabled
            //keyboardShouldPersistTaps="always"
            // style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Modal
              isVisible={showReqCategoryModal}
              onBackButtonPress={handleCloseReqCategoryModal}
              onBackdropPress={handleCloseReqCategoryModal}>
              <View style={[styles.modalWrap, {backgroundColor: '#fff'}]}>
                <Text
                  size={Fonts.size.large}
                  color={Colors.text.primary}
                  type="bold">
                  {strings.CATEGORY_REQUEST}
                </Text>

                <TextInput
                  placeholder={'Enter Category Name'}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={[AppStyles.inputStyle, AppStyles.mTop15]}
                  labelStyle={AppStyles.labelStyle}
                  value={requestedCategory}
                  error={requestedCategoryError}
                  maxLength={inputFieldsLimit.limit50}
                  onChangeText={(val) => {
                    setValue({requestedCategory: val});
                  }}
                  // ref={(ref) => {
                  //   props.businessNameRef(ref);
                  // }}
                  // onSubmitEditing={phoneFocus}
                />

                <Button
                  color={Colors.text.secondary}
                  background={Colors.button.primary}
                  style={AppStyles.mTop25}
                  size={Fonts.size.xSmall}
                  onPress={handleReqCategoryModal}
                  isLoading={isLoading}
                  indicatorColor={Colors.text.secondary}
                  disabled={isLoading}
                  type="semiBold">
                  {strings.SUBMIT}
                </Button>
              </View>
            </Modal>
          </KeyboardAwareScrollView>
        )}
        {isImgUploadVisible && (
          <ImagePicker
            addImage={handleUploadBusinessLogo}
            showPickerModal={isImgUploadVisible}
            closeModal={closeImageModal}
          />
        )}
        <RBSheet
          ref={(ref) => {
            refRBSheet(ref);
          }}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: '#0000009e',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          {util.PROPOSAL_TIME_TYPE().map((item) => {
            return (
              <TouchableOpacity
                key={item}
                style={styles.optionWrap}
                onPress={() => {
                  handleProposalTimeType(item);
                }}>
                <Text textAlign={util.rtlRightText()} type="medium">
                  {item && item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </RBSheet>
      </KeyboardAwareScrollView>
    );
  }
}
export default ApplicationFormView;
