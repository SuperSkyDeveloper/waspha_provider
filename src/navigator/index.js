// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Stack, Scene, Router, Actions, Drawer} from 'react-native-router-flux';

import styles from './styles';
import {Colors} from '../theme';
import {BackHandler, Alert} from 'react-native';

import {
  Login,
  Welcome,
  StoreProfile,
  OrderRequest,
  EarningDetail,
  OrderDetails,
  Signup,
  ForgetPassword,
  VerificationCode,
  PasswordRecovery,
  Waiting,
  ApplicationForm,
  ProposalCreation,
  SetPrice,
  VendorDashboard,
  Notification,
  VendorReviews,
  LatestOrders,
  AcceptedOrders,
  CancelOrderDetails,
  AssignOnlineRider,
  OrderStatus,
  WasphaExpress,
  OrderDeliveryDetails,
  RiderListing,
  PartnerDeliveryGuy,
  DeliveryGuyForm,
  ProposalCenter,
  ProposalCenterDetails,
  StoreMenu,
  ItemList,
  ProductsAndCategories,
  ProductAndCategoryForm,
  CategoriesForm,
  ContactUs,
  FAQS,
  RocketChatContainer,
  SearchProductAndCategory,
  SelectLocationMap,
  SearchLocation,
  ResetPassword,
  NoConnection,
  TourScreens,
  PrivacyPolicy,
  TermsAndCondition,
  RateMyService,
  CookiePolicy,
  CopyrightPolicy,
  TermsDeliveryPartner,
  GDPRComplianceStatement,
  SelectCountry,
  Profile,
  RCListing,
  PromoCodes,
  OrderPlace,
  TraditionalOrders,
  TraditionalOrderDetails,
  WasphaOptions,
  CancelOrder,
  ReferralCode,
  ChangeEmailAndNumber,
} from '../containers';

import {SideBar} from '../components';
import {strings} from '../constants';

// function onBackPress() {
//   if (Actions.currentScene == 'verificationCode') {
//     Alert.alert(
//       strings.HOLD_ON,
//       strings.ARE_YOU_SURE_YOU_WANT_TO_NAVIGATE_BACK,
//       [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         {
//           text: 'YES',
//           onPress: () => {
//             Actions.pop();
//           },
//         },
//       ],
//     );
//     return true;
//   }
//   if (Actions.state.index === 0) {
//     return false;
//   }
//   Actions.pop();
//   return true;
// }

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Drawer
      drawer
      key="drawerMenu"
      contentComponent={SideBar}
      drawerWidth={267}
      side={'left'}
      hideNavBar>
      <Scene key="storeProfile" component={StoreProfile} hideNavBar />
      <Scene key="waiting" component={Waiting} hideNavBar />
    </Drawer>
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="searchLocation" component={SearchLocation} hideNavBar />
    <Scene key="promoCodes" component={PromoCodes} hideNavBar />
    <Scene key="vendorReviews" component={VendorReviews} hideNavBar />
    <Scene key="orderStatus" component={OrderStatus} hideNavBar />
    <Scene key="signup" component={Signup} hideNavBar />
    <Scene key="forgetPassword" component={ForgetPassword} hideNavBar />
    <Scene key="verificationCode" component={VerificationCode} hideNavBar />
    <Scene key="referralCode" component={ReferralCode} hideNavBar />
    <Scene
      key="searchProductAndCategory"
      component={SearchProductAndCategory}
      hideNavBar
    />
    <Scene
      key="productAndCategories"
      component={ProductsAndCategories}
      hideNavBar
    />
    <Scene
      key="productAndCategoryForm"
      component={ProductAndCategoryForm}
      hideNavBar
    />
    <Scene
      key="rocketChatContainer"
      component={RocketChatContainer}
      hideNavBar
    />

    <Scene key="traditionalOrders" component={TraditionalOrders} hideNavBar />
    <Scene
      key="traditionalOrderDetails"
      component={TraditionalOrderDetails}
      hideNavBar
    />

    <Scene key="wasphaOptions" component={WasphaOptions} hideNavBar />

    <Scene key="rclisting" component={RCListing} hideNavBar />
    <Scene key="passwordRecovery" component={PasswordRecovery} hideNavBar />
    <Scene key="applicationForm" component={ApplicationForm} hideNavBar />
    <Scene key="selectLocationMap" component={SelectLocationMap} hideNavBar />
    <Scene key="assignOnlineRider" component={AssignOnlineRider} hideNavBar />
    <Scene key="earningDetail" component={EarningDetail} hideNavBar />
    <Scene key="itemList" component={ItemList} hideNavBar />
    <Scene key="welcome" component={Welcome} hideNavBar initial />
    <Scene key="orderRequest" component={OrderRequest} hideNavBar />
    <Scene key="orderDetails" component={OrderDetails} hideNavBar />
    <Scene key="storeMenu" component={StoreMenu} hideNavBar />
    <Scene key="proposalCreation" component={ProposalCreation} hideNavBar />
    <Scene key="categoriesForm" component={CategoriesForm} hideNavBar />
    <Scene key="wasphaExpress" component={WasphaExpress} hideNavBar />
    <Scene key="setPrice" component={SetPrice} hideNavBar />
    <Scene key="vendorDashboard" component={VendorDashboard} hideNavBar />
    <Scene key="notification" component={Notification} hideNavBar />
    <Scene key="latestOrders" component={LatestOrders} hideNavBar />
    <Scene key="acceptedOrders" component={AcceptedOrders} hideNavBar />
    <Scene key="cancelOrderDetails" component={CancelOrderDetails} hideNavBar />
    <Scene key="riderListing" component={RiderListing} hideNavBar />
    <Scene key="partnerDeliveryGuy" component={PartnerDeliveryGuy} hideNavBar />
    <Scene key="deliveryGuyForm" component={DeliveryGuyForm} hideNavBar />
    <Scene key="proposalCenter" component={ProposalCenter} hideNavBar />
    <Scene key="contactUs" component={ContactUs} hideNavBar />
    <Scene key="cancelOrder" component={CancelOrder} hideNavBar />

    <Scene
      key="changeEmailAndNumber"
      component={ChangeEmailAndNumber}
      hideNavBar
    />
    <Scene key="faqs" component={FAQS} hideNavBar />
    <Scene key="resetPassword" component={ResetPassword} hideNavBar />
    <Scene key="noConnection" component={NoConnection} hideNavBar />
    <Scene key="tourScreens" component={TourScreens} hideNavBar />
    <Scene key="privacyPolicy" component={PrivacyPolicy} hideNavBar />
    <Scene key="termsAndCondition" component={TermsAndCondition} hideNavBar />
    <Scene key="cookiePolicy" component={CookiePolicy} hideNavBar />
    <Scene key="copyrightPolicy" component={CopyrightPolicy} hideNavBar />
    <Scene key="profile" component={Profile} hideNavBar />
    <Scene
      key="termsDeliveryPartner"
      component={TermsDeliveryPartner}
      hideNavBar
    />
    <Scene
      key="gdprComplianceStatement"
      component={GDPRComplianceStatement}
      hideNavBar
    />
    <Scene
      key="proposalCenterDetails"
      component={ProposalCenterDetails}
      hideNavBar
    />
    <Scene
      key="orderDeliveryDetails"
      component={OrderDeliveryDetails}
      hideNavBar
    />
    <Scene key="rateMyService" component={RateMyService} hideNavBar />
    <Scene key="selectCountry" component={SelectCountry} hideNavBar />
    <Scene key="orderPlace" component={OrderPlace} hideNavBar />
  </Stack>,
);

export default () => (
  <AppNavigator
    navigator={navigator}
    // backAndroidHandler={onBackPress}
  />
);

const AppNavigator = connect()(Router);
