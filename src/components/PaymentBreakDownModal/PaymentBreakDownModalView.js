import React from 'react';
import {View, ScrollView} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button, HTMLView, Loader} from '..';
import styles from './PaymentBreakDownModalStyles';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import {PROMO_TYPES, strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function PaymentBreakDownModalView(props) {
  const {
    isModalOpen,
    proposalPrice,
    handleConfirmBtn,
    showValue,
    currencyCode,
    billItems,
    isDiscounted,
  } = props;

  //   let proposalPrice={...props.proposalPrice, waspha_fee_type_vendor: "fixed",waspha_fee_type_user:'percentage'}
  // let bill=_.cloneDeep(proposalPrice['bill'])
  //   delete proposalPrice['bill']
  // bill.push(
  //   {id: 5,
  //   key: "waspha_fee_user",
  //   label: "Waspha Fee User (Fixed) ",
  // value:30,
  // },
  // {
  //   id: 5,
  //   key: "waspha_fee_amount_user",
  //   label: 'Waspha Fee User',
  //   value:100
  //   },
  //   {
  //   id: 5,
  //   key: "waspha_fee_vendor",
  //   label: "Waspha Fee Vendor (Fixed)",
  //   value:40,
  //   },

  //     {
  //       id: 5,
  //       key: "waspha_fee_amount_vendor",
  //       label: "Waspha Fee Vendor",
  //       value:200
  //       }
  // )

  // proposalPrice={...proposalPrice,bill}

  console.log({proposalPrice});
  // return true

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={{
          alignItems: 'center',
        }}
        onBackButtonPress={() => {
          props.closeModal();
        }}
        onBackdropPress={() => {
          props.closeModal();
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 0.0, y: -0.3}}
          colors={Colors.gradient.primary}
          style={[
            styles.linearWrap,
            util.isRTL()
              ? {paddingLeft: 35}
              : {paddingHorizontal: Metrics.mediumBaseMargin},
          ]}>
          <View style={[styles.headWrap]}>
            <Text
              type="bold"
              style={[styles.headText, util.isRTL() && {right: 11}]}>
              {strings.PAYMENT_BREAKDOWN}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <>
              {proposalPrice.proposal &&
                proposalPrice.proposal.items.map((item) => {
                  //remove after work from server side done
                  let AmountAfterDiscount = '';
                  if (
                    !_.isNil(item.menu_promotion) &&
                    item.menu_promotion.type === PROMO_TYPES.DISCOUNT
                  ) {
                    AmountAfterDiscount =
                      (item.price / 100) *
                      (100 - item.menu_promotion.extra_data.discount);
                  }
                  return (
                    <>
                      <View
                        style={[
                          styles.contentSec,
                          util.isRTL() && AppStyles.rowReverse,
                        ]}>
                        <View
                          style={[
                            styles.titleWrap,
                            util.isRTL() && [AppStyles.rowReverse, {left: 35}],
                          ]}>
                          <View
                            style={[
                              styles.circleStyle,
                              util.isRTL() && AppStyles.mLeft5,
                            ]}
                          />
                          <HTMLView
                            htmlContent={`${
                              item.quantity
                            }x ${renderNameStringAndImageRender(item.title)}`}
                            textAlign={util.isRTL() ? 'right' : 'left'}
                            color={Colors.text.secondary}
                            size={Fonts.size.xxSmall}
                            type="medium"
                          />
                          {/* <Text type="medium" style={styles.textStyle}>
                            {`${
                              item.quantity
                            }x ${renderNameStringAndImageRender(item.title)}`}
                          </Text> */}
                        </View>
                        <View style={[styles.priceWrap]}>
                          <Text
                            type="medium"
                            style={[
                              styles.textStyle,
                              !_.isNil(item.menu_promotion) &&
                                item.menu_promotion.type ===
                                  PROMO_TYPES.DISCOUNT && {
                                  textDecorationLine: 'line-through',
                                  textDecorationStyle: 'solid',
                                },
                            ]}>
                            {`${currencyCode} ${(
                              item.price * item.quantity
                            ).toFixed(2)}`}
                          </Text>
                        </View>
                      </View>
                      {!_.isNil(item.menu_promotion) && (
                        <View
                          style={{
                            marginLeft: Metrics.mediumBaseMargin,
                            top: -10,
                            marginRight:
                              item.menu_promotion.type === PROMO_TYPES.DISCOUNT
                                ? 0
                                : Metrics.tripleMediumBaseMargin,
                          }}>
                          {item.menu_promotion.type ===
                            PROMO_TYPES.BUY_1_GET_1 && (
                            <Text type="medium" style={styles.textStyle}>
                              {`${strings.BUY1_GET1_OFFER}: ${
                                item.quantity
                              } x ${renderNameStringAndImageRender(
                                item.title,
                              )}`}
                            </Text>
                          )}

                          {item.menu_promotion.type ===
                            PROMO_TYPES.DISCOUNT && (
                            <View
                              style={[
                                styles.contentSec,
                                util.isRTL() && AppStyles.rowReverse,
                              ]}>
                              <View
                                style={[
                                  styles.titleWrap,
                                  util.isRTL() && AppStyles.rowReverse,
                                ]}>
                                <Text type="medium" style={styles.textStyle}>
                                  {strings.DISCOUNTED_PRICE}
                                </Text>
                              </View>
                              <View style={[styles.priceWrap]}>
                                <Text type="medium" style={[styles.textStyle]}>
                                  {`${currencyCode} ${AmountAfterDiscount.toFixed(
                                    2,
                                  )}`}
                                </Text>
                              </View>
                            </View>
                          )}
                          {item.menu_promotion.type ===
                            PROMO_TYPES.GIFT_PRODUCT && (
                            <Text type="medium" style={styles.textStyle}>
                              {`Gift Product offer: ${
                                item.quantity
                              } x ${renderNameStringAndImageRender(
                                item.menu_promotion.extra_data.product_name,
                              )}`}
                            </Text>
                          )}
                        </View>
                      )}
                    </>
                  );
                })}
              {billItems &&
                billItems.map((item) => {
                  {
                    /* {proposalPrice.bill &&
               proposalPrice.bill.map((item) => { */
                  }

                  if (
                    (proposalPrice.waspha_fee_type_user === 'fixed' &&
                      item.key === 'waspha_fee_amount_user') ||
                    (proposalPrice.waspha_fee_type_vendor === 'fixed' &&
                      item.key === 'waspha_fee_amount_vendor')
                  ) {
                    return true;
                  }
                  return (
                    <View
                      style={[
                        styles.contentSec,
                        util.isRTL() && AppStyles.rowReverse,
                      ]}>
                      <View
                        style={[
                          styles.titleWrap,
                          util.isRTL()
                            ? [AppStyles.rowReverse, {marginLeft: 35}]
                            : {marginRight: 35},
                        ]}>
                        <View
                          style={[
                            styles.circleStyle,
                            util.isRTL() && AppStyles.mLeft5,
                          ]}
                        />
                        <Text type="medium" style={styles.textStyle}>
                          {item.key === 'waspha_fee_user' ||
                          item.key === 'waspha_fee_amount_user'
                            ? `${item.label} User`
                            : item.key === 'waspha_fee_vendor' ||
                              item.key === 'waspha_fee_amount_vendor'
                            ? `${item.label} Vendor`
                            : item.label}
                        </Text>
                      </View>
                      <View style={styles.priceWrap}>
                        <Text
                          type="medium"
                          style={[
                            styles.textStyle,
                            item.key === 'subtotal' &&
                              isDiscounted && {
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                              },
                          ]}>
                          {/* {showValue(item)} */}
                          {proposalPrice.proposal.delivery_mode_id === 3 &&
                          item.key === 'delivery_fee'
                            ? '--'
                            : (proposalPrice.waspha_fee_type_user ===
                                'percentage' &&
                                item.key === 'waspha_fee_user') ||
                              (proposalPrice.waspha_fee_type_vendor ===
                                'percentage' &&
                                item.key === 'waspha_fee_vendor')
                            ? `${item.value} %`
                            : `${currencyCode} ${item.value.toFixed(2)}`}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </>
          </ScrollView>
          <View
            style={[
              styles.contentSec,
              util.isRTL() && [AppStyles.rowReverse, {right: 32}],
            ]}>
            <View style={[styles.toBePaidWrap]}>
              <Text type="medium" style={[styles.textStyle, AppStyles.mTop10]}>
                {proposalPrice.total.label}
              </Text>
            </View>
            <View style={[styles.totalAmountWrap]}>
              <Text type="medium" style={[styles.textStyle, AppStyles.mTop10]}>
                {!_.isNil(proposalPrice.total) &&
                  !_.isNil(proposalPrice.total.value) &&
                  util.setPaymentUnit(proposalPrice.total.value)}
              </Text>
            </View>
          </View>
          <View style={[styles.btnWrap, util.isRTL() && {right: 27}]}>
            <Button
              textStyle={styles.btnTextStyle}
              style={styles.btnStyle}
              onPress={handleConfirmBtn}>
              {strings.CONFIRM}
            </Button>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
