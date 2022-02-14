import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button, SelectLanguageModal, SideBarItem, Text} from '..';
import styles from './SideBarStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {strings, APP_VERSION} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import COUNTRY_LIST from '../../constants/countries';

export default function SideBarView(props) {
  const {
    handleLogout,
    user,
    handleChangeLanguage,
    isLoading,
    handleLanguageModal,
    isLangModalVisible,
    activeIndex,
    handleIndex,
    storeProfile,
  } = props;

  let countryName = () => {
    if (props.user.country) {
      return _.find(COUNTRY_LIST, {countryCode: props.user.country}).name[
        util.getLanguage()
      ];
    }
  };

  const LINK_LIST = [
    {
      id: 1,
      title: strings.STORE_MANAGEMENT,
      dropDownIcon: Images.DownArrow,
      icon: Images.Storemanagement,
      subMenus: [
        // {
        //   id: 25,
        //   title: strings.CHAT,
        //   icon: Images.StoreIcon,
        //   restricted: user.is_approved,
        //   notifications: '',
        //   info: '',
        //   action: () => {
        //     Actions.rclisting();
        //   },
        // },
        {
          id: 1,
          title: strings.BUSINESS_PROFILE,
          icon: Images.BusinessProfile,
          notifications: '',
          restricted: user.is_approved,
          info: '',
          action: () => {
            Actions.applicationForm({
              isForEdit: true,
            });
          },
        },
        // {
        //   id: 1,
        //   title: strings.PROFILE,
        //   icon: Images.BusinessProfile,
        //   notifications: '',
        //   restricted: user.is_approved,
        //   info: '',
        //   action: () => {
        //     Actions.profile();
        //   },
        // },
        {
          id: 2,
          title: strings.MY_MENU_LIST,
          icon: Images.MyMenuList,
          notifications: '',
          info: '',
          restricted: true,
          action: () => {
            Actions.storeMenu();
          },
        },
        {
          id: 11,
          title: strings.ADD_PRODUCT,
          icon: Images.AddProduct,
          notifications: '',
          info: '',
          restricted: true,
          action: () => {
            Actions.productAndCategoryForm();
          },
        },
        {
          id: 12,
          title: strings.ADD_CATEGORY,
          icon: Images.AddCategory,
          notifications: '',
          info: '',
          restricted: true,
          action: () => {
            Actions.productAndCategoryForm({isCategory: true});
          },
        },
        {
          id: 3,
          title: strings.PROPOSAL_CENTER,
          icon: Images.ProposalCenterIcon,
          notifications: '',
          info: '',
          restricted: user.is_approved,
          action: () => {
            Actions.proposalCenter();
          },
        },

        {
          id: 4,
          title: strings.PARTNER_DELIVERY_GUYS,
          icon: Images.PartnerDeliveryGuy,
          notifications: '',
          info: '',
          restricted: user.is_approved,
          action: () => {
            Actions.partnerDeliveryGuy();
          },
        },

        {
          id: 5,
          title: strings.PROMO_CODES,
          icon: Images.GiftWhiteIcon,
          notifications: '',
          info: '',
          restricted: user.is_approved,
          action: () => {
            Actions.promoCodes();
          },
        },
      ],
    },

    {
      id: 22,
      title: strings.LEGAL,
      dropDownIcon: Images.DownArrow,
      icon: Images.LegalIcon,
      subMenus: [
        {
          id: 8,
          title: strings.FAQ,
          icon: Images.FAQ,
          notifications: '',
          info: '',
          restricted: user.is_approved,
          action: () => {
            Actions.faqs();
          },
        },

        // {
        //   id: 4,
        //   title: strings.HELP_AND_SUPPORT,
        //   icon: Images.HelpAndSupportIcon,
        //   notifications: '',
        //   info: '',
        //   restricted: true,
        //   action: () => {},
        // },
        {
          id: 14,
          title: strings.PRIVACY_POLICY,
          icon: Images.PrivacyPolicy,
          notifications: '',
          info: '',
          restricted: true,
          action: () => {
            Actions.privacyPolicy();
          },
        },
        {
          id: 15,
          title: strings.TERMS_CONDITIONS,
          icon: Images.TermsCondition,
          notifications: '',
          info: '',
          restricted: true,
          action: () => {
            Actions.termsAndCondition();
          },
        },
        {
          id: 24,
          title: strings.COOKIE_POLICY,
          icon: Images.CookiePolicy,
          notifications: '',
          restricted: user.is_approved,
          info: '',
          action: () => {
            Actions.cookiePolicy();
          },
        },

        {
          id: 25,
          title: strings.COPY_RIGHT_POLICY,
          icon: Images.CopyRightIcon,
          restricted: user.is_approved,
          notifications: '',
          info: '',
          action: () => {
            Actions.copyrightPolicy();
          },
        },

        // {
        //   id: 26,
        //   title: strings.TERMS_DELIVERY_PARTNER,
        //   icon: Images.MoonIcon,
        //   notifications: '',
        //   restricted: user.is_approved,
        //   info: '',
        //   action: () => {
        //     Actions.termsDeliveryPartner();
        //   },
        // },

        {
          id: 27,
          title: strings.GDPR_COMPLIANCE_STATEMENT,
          icon: Images.GDPRIcon,
          notifications: '',
          restricted: user.is_approved,
          info: '',
          action: () => {
            Actions.gdprComplianceStatement();
          },
        },

        {
          id: 6,
          title: strings.CONTACT_US,
          icon: Images.ContactIconImage,
          notifications: '',
          info: '',
          restricted: user.is_approved,
          action: () => {
            Actions.contactUs();
          },
        },
      ],
    },
    {
      id: 25,
      title: strings.CHAT,
      icon: Images.Chat,
      restricted: user.is_approved,
      notifications: '',
      info: '',
      actionPerform: () => {
        Actions.rclisting();
      },
    },
    {
      id: 23,
      title: strings.SETTINGS,
      dropDownIcon: Images.DownArrow,
      icon: Images.SettingsIcon,
      subMenus: [
        {
          id: 7,
          title: strings.CHANGE_LANGUAGE,
          icon: Images.LanguageIcon,
          notifications: '',
          info: '',
          restricted: user.is_approved,
          action: () => {
            handleLanguageModal();
          },
        },
        {
          id: 13,
          title: strings.RESET_PASSWORD,
          icon: Images.ResetPasswordIcon,
          notifications: '',
          info: '',
          restricted: true,
          action: () => {
            Actions.resetPassword();
          },
        },
        {
          id: 9,
          title: strings.LOGOUT,
          icon: Images.LogoutIcon,
          notifications: '',
          restricted: true,
          info: '',
          action: () => {
            handleLogout();
          },
        },
      ],
    },
    {
      id: 26,
      title: strings.INVITE_EARN,
      icon: Images.InviteAndearn,
      restricted: user.is_approved,
      notifications: '',
      info: '',
      actionPerform: () => {
        Actions.referralCode();
      },
    },

    // {
    //   id: 10,
    //   title: strings.ACTIVATE_NIGHT_MODE,
    //   icon: Images.MoonIcon,
    //   notifications: '',
    //   info: '',
    //   restricted: user.is_approved,
    //   action: () => {},
    // },
  ];

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 2.5, y: 0}}
        colors={Colors.gradient.primary}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[styles.baseIconSec, util.isRTL() && styles.baseIconSecRtl]}>
            <TouchableOpacity
              style={styles.baseIconWrp}
              onPress={() => {
                Actions.drawerClose();
              }}>
              <RnImage style={styles.baseIcon} source={Images.BaselineIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Actions.profile();
            }}
            style={[styles.profileSec, util.isRTL() && AppStyles.rowReverse]}>
            <View style={[styles.imgWrap, util.isRTL() && AppStyles.mLeft15]}>
              <RnImage
                style={[
                  styles.profileImg,
                  _.isNil(user.avatar) && {tintColor: Colors.white},
                ]}
                source={util.profilePlaceHolderImage(user.avatar)}
              />
            </View>
            <View
              style={[
                AppStyles.mLeft10,
                AppStyles.pTop15,
                AppStyles.flex,
                util.isRTL() && AppStyles.width100,
              ]}>
              <Text
                textAlign={util.rtlRightText()}
                style={[AppStyles.mBottom5, AppStyles.flex]}
                size={Fonts.size.xxxxSmall}
                type="medium"
                color={Colors.text.secondary}>
                {util.isValueEmpty(user.name)}
              </Text>
              <View
                style={[
                  AppStyles.flexRow,
                  util.isRTL() && AppStyles.width100,
                  util.isRTL() && AppStyles.rowReverse,
                  AppStyles.mBottom10,
                ]}>
                <RnImage
                  source={Images.StarIcon}
                  style={[
                    AppStyles.mRight5,
                    util.isRTL() && AppStyles.mLeft5,
                    {height: 13, width: 13},
                  ]}
                />
                <Text
                  size={Fonts.size.xxxxxSmall}
                  style={AppStyles.flex}
                  color={Colors.text.secondary}
                  textAlign={util.rtlRightText()}>
                  {user.avg_rating}
                </Text>
              </View>
              {util.isEmpty(user.loyalty_points) && (
                <View
                  style={[
                    AppStyles.flexRow,
                    AppStyles.alignItemsCenter,
                    util.isRTL() && {alignSelf: 'flex-end'},
                  ]}>
                  <RnImage
                    source={Images.GiftIcon}
                    style={[AppStyles.mRight5, {tintColor: Colors.white}]}
                  />
                  <Text
                    size={Fonts.size.font15}
                    // color={Colors.text.tertiary}
                    color={Colors.white}
                    type={'bold'}>
                    {util.isValueEmpty(user.loyalty_points)} {strings.POINTS}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.hLine} />
          <View style={styles.linkSec}>
            <FlatList
              data={LINK_LIST}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                return (
                  <SideBarItem
                    item={item}
                    active={active}
                    togglePress={handleIndex}
                    index={index}
                  />
                );
              }}
            />
          </View>
          <View style={AppStyles.mBottom20}>
            <Text
              textAlign="center"
              size={Fonts.size.xSmall}
              color={Colors.text.secondary}
              type="medium">
              {APP_VERSION}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
      {/* {isLangModalVisible&&( <Modal
     hasBackdrop={true}
        isVisible={isLangModalVisible}
        style={[styles.modalContainer]}
        onBackButtonPress={handleLanguageModal}
        onBackdropPress={handleLanguageModal}>
        <View style={[styles.container]}>
          <ImageBackground source={Images.LanguageModal} style={styles.bgStyle}>
            <Text
              size={Fonts.size.medium}
              type={'bold'}
              color={Colors.text.secondary}
              style={styles.headingText}>
              {strings.SELECT_LANGUAGE}
            </Text>
            {isLoading && (
              <ActivityIndicator
                color={Colors.text.secondary}
                style={AppStyles.mBottom15}
              />
            )}
            <Button
              onPress={() => {
                handleChangeLanguage('en');
              }}
              style={[
                styles.btnStyle,
                AppStyles.mBottom30,
                util.getLanguage() == 'en' && styles.activeLangStyle,

              ]}
              color={Colors.text.secondary}
              background={'#8685855e'}
              disabled={isLoading}
              type="bold">
              ENGLISH
            </Button>
            <Button
              onPress={() => {
                handleChangeLanguage('ar');
              }}
              style={[
                styles.btnStyle,
                util.getLanguage() == 'ar' && styles.activeLangStyle,
              ]}
              disabled={isLoading}
              color={Colors.text.secondary}
              background={'#8685855e'}
              type="bold">
              عربى
            </Button>
          </ImageBackground>
        </View>
      </Modal>
)} */}
      {isLangModalVisible && (
        <SelectLanguageModal
          isModalOpen={isLangModalVisible}
          closeModal={handleLanguageModal}
          modalType="isLangModalVisible"
          handleLangSelect={handleChangeLanguage}
        />
      )}
    </>
  );
}
