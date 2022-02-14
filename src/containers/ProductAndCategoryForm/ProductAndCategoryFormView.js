import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  Switch,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './ProductAndCategoryFormStyles';
import {
  SignHeader,
  TextInput,
  Button,
  ImagePicker,
  Text,
  Image,
  ProductPromotions,
  Calendar,
  RichTextEditor,
} from '../../components';
import {Colors, AppStyles, Metrics, Images, Fonts} from '../../theme';
import {DATE_TIME, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import style from '../../components/PhoneInput/style';
import {ISOToFormat} from '../../helpers/generalHelper';
import {arabicEnglishCategoryText} from '../../helpers/multilingualHelper';

export default function ProductAndCategoryFormView(props) {
  const {
    titleName,
    category,
    description,
    titleNameError,
    categoryError,
    descriptionError,
    titleNameFocus,
    descriptionFocus,
    setValue,
    uploadImagePicker,
    closeImagePickerModal,
    openImagePickerModal,
    addItemImage,
    isEdit,
    isCategory,
    categoryNestSelect,
    handleSubmit,
    itemImageError,
    itemImage,
    isLoading,
    handleEdit,
    submitBtnTitle,
    isFeatureProduct,
    item,
    handleChangeLanguage,
    language,
    isRTL,
    translations,

    titleNameAr,
    categoryAr,
    descriptionAr,
    titleNameErrorAr,
    categoryErrorAr,
    descriptionErrorAr,
    uploadImagePickerAr,
    itemImageAr,
    itemImageErrorAr,

    selectedPromoOption,
    selectPromoOption,
    giftProduct,
    discount,
    discountError,
    giftProductError,
    eta,
    isDateTimePicker,
    featureDesc,
    featureDescError,
    refTitle,
    refDes,
    refPromotion,
  } = props;
  const activeSelectorImg = true ? Images.TickCheckBox : Images.UnTickCheckBox;

  const handleCategory = (category, arabic = false) => {
    if (!_.isEmpty(category)) {
      if (arabic) {
        return arabicEnglishCategoryText(category.name, arabic);
      }

      return arabicEnglishCategoryText(category.name);
    }

    return '';
  };

  const englishForm = () => {
    return (
      <View style={AppStyles.flex}>
        <View style={styles.contentSec}>
          <View style={AppStyles.mTop30}>
            {/* <TextInput
              placeholderTextColor={Colors.text.quaternary}
              inputStyle={AppStyles.inputStyle}
              style={styles.categoryWrap}
              autoCapitalize="none"
              labelStyle={[
                AppStyles.labelStyle,
                props.isRTL && AppStyles.alignRight,
              ]}
              label={translations.strings['en'].ITEM_TITLE}
              value={titleName}
              error={titleNameError}
              formErrorAlign={'left'}
              onChangeText={(val) => {
                setValue({titleName: val});
              }}
              ref={(ref) => {
                props.titleNameRef(ref);
              }}
              onSubmitEditing={descriptionFocus}
            /> */}
            <Text
              type="semiBold"
              style={{marginLeft: 5}}
              size={Fonts.size.xSmall}>
              {translations.strings['en'].ITEM_TITLE}
            </Text>
            <View style={styles.richInputStyle}>
              <RichTextEditor
                value={titleName}
                onChange={(text) => setValue({titleName: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                label={translations.strings['en'].ITEM_TITLE}
                labelType={'semiBold'}
                fontSize={Fonts.size.xxSmall}
                heightInput="40"
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                refRichText={refTitle}
              />
            </View>

            <Text
              type="medium"
              size={Fonts.size.xxSmall}
              // textAlign={util.rtlRightText()}
              color={Colors.error.primary}
              style={[AppStyles.mTop5, AppStyles.mBottom5, AppStyles.mLeft5]}>
              {titleNameError}
            </Text>
          </View>

          <View
            style={[
              AppStyles.mTop30,
              AppStyles.mBottom10,
              {marginHorizontal: 5},
            ]}>
            <Text
              type="medium"
              style={[
                AppStyles.labelStyle,
                props.isRTL && AppStyles.alignRight,
              ]}
              textAlign={util.rtlRightText()}>
              {translations.strings['en'].CATEGORY}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                Actions.categoriesForm({
                  categoryNestSelect,
                  stateName: 'category',
                  categoryItem: item,
                });
              }}
              style={styles.categoryWrap}>
              <Text
                size={Fonts.size.small}
                style={[AppStyles.width100, props.isRTL && AppStyles.pRight5]}
                // textAlign={util.rtlRightText()}
                type="medium">
                {handleCategory(category)}
              </Text>
            </TouchableOpacity>
            {!_.isEmpty(categoryError) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                // textAlign={util.rtlRightText()}
                color={Colors.error.primary}
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {categoryError}
              </Text>
            )}
          </View>
          <View style={styles.inputWrap}>
            {/* <TextInput
              multiline={true}
              inputStyle={styles.inputStyle}
              labelStyle={[
                styles.labelStyle,
                props.isRTL && AppStyles.alignRight,
              ]}
              style={styles.addressInputWrap}
              autoCapitalize="none"
              label={translations.strings['en'].ADD_DESC}
              value={description}
              error={descriptionError}
              formErrorAlign={'left'}
              onChangeText={(val) => {
                setValue({description: val});
              }}
              ref={(ref) => {
                props.descriptionRef(ref);
              }}
            /> */}
            <Text
              type="semiBold"
              style={{marginLeft: 5}}
              size={Fonts.size.xSmall}>
              {translations.strings['en'].ADD_DESC}
            </Text>
            <View style={styles.richInputStyle}>
              <RichTextEditor
                value={description}
                onChange={(text) => setValue({description: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                labelType={'semiBold'}
                fontSize={Fonts.size.xxSmall}
                showLateToolbar={true}
                heightInput={147}
                refRichText={refDes}
              />
            </View>
            <Text
              type="medium"
              size={Fonts.size.xxSmall}
              // textAlign={util.rtlRightText()}
              color={Colors.error.primary}
              style={[AppStyles.mTop5, AppStyles.mBottom5, AppStyles.mLeft5]}>
              {descriptionError}
            </Text>
          </View>
          <View style={[styles.btnWrap, styles.paddingHr]}>
            {!_.isEmpty(itemImage) && (
              <Image style={styles.prdImage} source={{uri: itemImage}} />
            )}
            <TouchableOpacity onPress={openImagePickerModal}>
              <View style={styles.viewWrap}>
                <RnImage
                  style={[
                    styles.uploadDocImage,
                    AppStyles.mRight5,
                    AppStyles.mLeft5,
                  ]}
                  source={Images.UploadDocument}
                />
                <Text
                  type="semiBold"
                  size={Fonts.size.small}
                  color={Colors.text.secondary}>
                  {translations.strings['en'].UPLOAD_COVER_PHOTO}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {!_.isEmpty(itemImageError) && (
            <Text
              type="medium"
              size={Fonts.size.xxSmall}
              color={Colors.error.primary}
              textAlign="center"
              style={[AppStyles.mTop5, AppStyles.mBottom5]}>
              {itemImageError}
            </Text>
          )}
          {isEdit && (
            <TouchableOpacity
              style={styles.changeTextWrap}
              onPress={openImagePickerModal}>
              <Text type="medium" style={styles.changeTextStyle}>
                {_.startCase(_.camelCase(translations.strings['en'].CHANGE))}
              </Text>
              <View style={styles.lineStyle}></View>
            </TouchableOpacity>
          )}
        </View>
        {uploadImagePicker && (
          <ImagePicker
            addImage={addItemImage}
            showPickerModal={uploadImagePicker}
            closeModal={closeImagePickerModal}
          />
        )}
      </View>
    );
  };

  const arabicForm = (props) => {
    return (
      <View style={AppStyles.flex}>
        <View style={styles.contentSec}>
          <View style={AppStyles.mTop30}>
            <TextInput
              textAlign={'right'}
              placeholderTextColor={Colors.text.quaternary}
              inputStyle={[AppStyles.inputStyle, AppStyles.alignRight]}
              style={styles.categoryWrap}
              autoCapitalize="none"
              labelStyle={[AppStyles.labelStyle, AppStyles.alignRight]}
              label={translations.strings['ar'].ITEM_TITLE}
              value={titleNameAr}
              formErrorAlign={'right'}
              error={titleNameErrorAr}
              onChangeText={(val) => {
                setValue({titleNameAr: val});
              }}
              ref={(ref) => {
                props.titleNameRef(ref);
              }}
              onSubmitEditing={descriptionFocus}
            />

            <View style={[AppStyles.mTop30, AppStyles.mBottom10]}>
              <Text
                type="medium"
                style={[AppStyles.labelStyle, AppStyles.alignRight]}
                textAlign={'right'}>
                {translations.strings['ar'].CATEGORY}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();

                  Actions.categoriesForm({
                    categoryNestSelect,
                    stateName: 'categoryAr',
                    fromArabicForm: true,
                    categoryItem: item,
                  });
                }}
                style={styles.categoryWrap}>
                <Text
                  size={Fonts.size.small}
                  style={[AppStyles.width100, AppStyles.pRight5]}
                  textAlign={'right'}
                  type="medium">
                  {handleCategory(categoryAr, true)}
                </Text>
              </TouchableOpacity>
              {!_.isEmpty(categoryErrorAr) && (
                <Text
                  type="medium"
                  size={Fonts.size.xxSmall}
                  textAlign={'right'}
                  color={Colors.error.primary}
                  style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                  {categoryErrorAr}
                </Text>
              )}
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                multiline={true}
                textAlign={'right'}
                inputStyle={[AppStyles.inputStyle, {textAlign: 'right'}]}
                labelStyle={[styles.labelStyle, AppStyles.alignRight]}
                style={styles.addressInputWrap}
                autoCapitalize="none"
                label={translations.strings['ar'].ADD_DESC}
                value={descriptionAr}
                formErrorAlign={'right'}
                error={descriptionErrorAr}
                onChangeText={(val) => {
                  setValue({descriptionAr: val});
                }}
                ref={(ref) => {
                  props.descriptionRef(ref);
                }}
              />
            </View>
            <View style={[styles.btnWrap, styles.paddingHr]}>
              {!_.isEmpty(itemImageAr) && (
                <Image style={styles.prdImage} source={{uri: itemImageAr}} />
              )}
              <TouchableOpacity onPress={openImagePickerModal}>
                <View style={styles.viewWrap}>
                  <RnImage
                    style={[
                      styles.uploadDocImage,
                      AppStyles.mRight5,
                      AppStyles.mLeft5,
                    ]}
                    source={Images.UploadDocument}
                  />
                  <Text
                    type="semiBold"
                    size={Fonts.size.small}
                    color={Colors.text.secondary}>
                    {translations.strings['ar'].UPLOAD_COVER_PHOTO}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {!_.isEmpty(itemImageErrorAr) && (
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                color={Colors.error.primary}
                textAlign="center"
                style={[AppStyles.mTop5, AppStyles.mBottom5]}>
                {itemImageErrorAr}
              </Text>
            )}
            {isEdit && (
              <TouchableOpacity
                style={styles.changeTextWrap}
                onPress={openImagePickerModal}>
                <Text type="medium" style={styles.changeTextStyle}>
                  {_.startCase(_.camelCase(translations.strings['ar'].CHANGE))}
                </Text>
                <View style={styles.lineStyle}></View>
              </TouchableOpacity>
            )}
          </View>
          {isDateTimePicker && (
            <Calendar
              setValue={setValue}
              isDateTimePicker={isDateTimePicker}
              getValue={setValue}
            />
          )}

          {uploadImagePicker && (
            <ImagePicker
              addImage={addItemImage}
              showPickerModal={uploadImagePicker}
              closeModal={closeImagePickerModal}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled
      keyboardShouldPersistTaps="handled"
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <SignHeader
        title={isEdit ? strings.EDIT : strings.CREATE}
        subTitle={isCategory ? strings.CATEGORY : strings.PRODUCT}
        drawerImg={Images.BackBtn}
      />

      <View style={styles.tabWrap}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.tab, language === 'en' && styles.activeTab]}
          onPress={() => {
            handleChangeLanguage('en');
          }}>
          <Text
            size={Fonts.size.normal}
            type="semiBold"
            color={[
              language === 'en' ? Colors.text.secondary : Colors.text.primary,
            ]}>
            ENGLISH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.tab, language === 'ar' && styles.activeTab]}
          onPress={() => {
            handleChangeLanguage('ar');
          }}>
          <Text
            size={Fonts.size.normal}
            type="semiBold"
            color={[
              language === 'ar' ? Colors.text.secondary : Colors.text.primary,
            ]}>
            عربى
          </Text>
        </TouchableOpacity>
      </View>

      {!isCategory && (
        <View
          style={[
            AppStyles.mTop30,
            styles.featureSec,
            language === 'ar' ? AppStyles.rowReverse : AppStyles.row,
          ]}>
          <Text size={Fonts.size.xSmall} type="medium" color={Colors.black}>
            {translations.strings[language].FEATURE_PRODUCT}
          </Text>
          <Switch
            trackColor={{
              false: Colors.button.tertiary,
              true: Colors.button.accent,
            }}
            thumbColor={
              isFeatureProduct ? Colors.button.hexa : Colors.button.hexa
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setValue({isFeatureProduct: !isFeatureProduct});
            }}
            value={isFeatureProduct}
            style={
              util.isPlatformAndroid() ? styles.androidSize : styles.iosSize
            }
          />
        </View>
      )}

      {language === 'ar' ? arabicForm(props) : englishForm(props)}

      {isFeatureProduct && (
        <View
          style={[
            AppStyles.mBottom20,
            AppStyles.mTop20,
            AppStyles.paddingHorizontalBase,
          ]}>
          <Text
            style={{
              fontSize: 19,
              textAlign: util.isRTL() ? 'right' : 'left',
            }}
            type="medium">
            {`${strings.PROMOTIONS} :`}
          </Text>
          <ProductPromotions
            isEdit={isEdit}
            selectedPromoOption={selectedPromoOption}
            selectOption={selectPromoOption}
            setValue={setValue}
            discount={discount}
            discountError={discountError}
            giftProduct={giftProduct}
            giftProductError={giftProductError}
          />
          <TouchableOpacity
            onPress={() => {
              setValue({isDateTimePicker: true});
            }}
            style={[
              styles.dateTimeItemWrap,
              util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
            ]}>
            <RnImage
              source={Images.CalendarIcon}
              style={styles.calendarStyle}
            />
            <View
              style={[
                AppStyles.flex,
                util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
              ]}>
              <Text
                style={[
                  styles.dateTimeText,
                  util.isRTL() && {
                    textAlign: 'right',
                    marginRight: 10,
                  },
                ]}
                type="semiBold">
                {_.isNil(eta)
                  ? strings.SELECT_EXPIRY_DATE
                  : ISOToFormat(eta, DATE_TIME)}
              </Text>
              <RnImage
                source={Images.DownArrowIcon}
                style={styles.dropDownArrowStyle}
              />
            </View>
          </TouchableOpacity>
          {!_.isNil(selectedPromoOption) && selectedPromoOption.id !== 1 && (
            <View style={styles.inputWrap}>
              <Text
                type={'medium'}
                style={[
                  styles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}>
                {strings.ADD_PROMO_DESC}
              </Text>
              <View style={[styles.richInputStyle, {margin: 0}]}>
                <RichTextEditor
                  value={featureDesc}
                  onChange={(val) => {
                    setValue({featureDesc: val});
                  }}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  fontSize={Fonts.size.xxSmall}
                  showLateToolbar={true}
                  heightInput={147}
                  refRichText={refPromotion}
                />
              </View>
              {/* <TextInput
                textAlign={util.isRTL() ? 'right' : 'left'}
                multiline={true}
                inputStyle={styles.inputStyle}
                labelStyle={[
                  styles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                style={styles.addressInputWrap}
                autoCapitalize="none"
                label={strings.ADD_PROMO_DESC}
                value={featureDesc}
                error={featureDescError}
                onChangeText={(val) => {
                  setValue({featureDesc: val});
                }}
                ref={(ref) => {
                  props.featureDescRef(ref);
                }}
              /> */}
            </View>
          )}
        </View>
      )}

      <View style={styles.submitBtnWrap}>
        <Button
          color={Colors.text.secondary}
          style={[styles.submitBtn, {backgroundColor: Colors.button.primary}]}
          textStyle={styles.submitBtnText}
          isLoading={isLoading}
          indicatorColor={Colors.white}
          onPress={isEdit ? handleEdit : handleSubmit}>
          {submitBtnTitle()}
        </Button>
      </View>

      {isDateTimePicker && (
        <Calendar
          setValue={setValue}
          isDateTimePicker={isDateTimePicker}
          getValue={setValue}
        />
      )}
    </KeyboardAwareScrollView>
  );
}
