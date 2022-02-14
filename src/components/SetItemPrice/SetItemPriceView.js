import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {HTMLView, Text, TextInput} from '..';
import styles from './SetItemPriceStyles';
import {Colors, AppStyles, Metrics, Fonts} from '../../theme';
import {
  strings,
  AMOUNT_FIELD_LENGTH,
  TAX_FIELD_LENGTH,
  PROMO_TYPES,
} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function SetItemPriceView(props) {
  const {
    taxAmount,
    setValue,

    taxFocus,
    data,
    onChangeField,
    index,
    isChangeMode,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
        <HTMLView
          htmlContent={
            _.isEmpty(data.name) || _.isNil(data.name)
              ? strings.NEW_ITEM
              : renderNameStringAndImageRender(data.name)
          }
          textAlign={util.isRTL() ? 'right' : 'left'}
          size={Fonts.size.medium}
          type="bold"
        />
        {/* <Text
          type="bold"
          style={styles.titleStyle}
          textAlign={util.rtlRightText()}>
          {_.isEmpty(data.name) || _.isNil(data.name)
            ? strings.NEW_ITEM
            : renderNameStringAndImageRender(data.name)}
        </Text> */}
      </View>
      <View style={[styles.parentSec, util.isRTL() && styles.parentSecRtl]}>
        <View
          style={[styles.inputParent, util.isRTL() && AppStyles.rowReverse]}>
          <View style={[styles.inputWrap, util.isRTL() && AppStyles.mLeft20]}>
            <TextInput
              editable={!isChangeMode}
              textAlign={util.isRTL() ? 'right' : 'left'}
              keyboardType="number-pad"
              placeholder={strings.ENTER_PRICE}
              placeholderTextColor={Colors.text.quaternary}
              label={strings.PRICE}
              labelStyle={[styles.labelStyle, {fontSize: Fonts.size.xxSmall}]}
              value={isChangeMode ? _.toString(data.price) : data.price}
              maxLength={AMOUNT_FIELD_LENGTH}
              onChangeText={(priceAmount) => {
                if (!isChangeMode) {
                  if (isNaN(priceAmount)) {
                    return true;
                  }
                  onChangeField('price', index, priceAmount);

                  if (
                    !_.isNil(data.menu_promotion) &&
                    data.menu_promotion.type === PROMO_TYPES.DISCOUNT
                  ) {
                    let discountAmount =
                      (priceAmount / 100) *
                      (100 - data.menu_promotion.extra_data.discount);
                    onChangeField(
                      'discount',
                      index,
                      `${discountAmount.toFixed(2)}`,
                    );
                  }
                }
              }}
              style={styles.textInput}
              onSubmitEditing={taxFocus}
              ref={(ref) => {
                props.priceRef(ref);
              }}
            />
            {!_.isEmpty(data.priceError) && (
              <Text
                type="medium"
                size={Fonts.size.xxxxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop5, AppStyles.mBottom20]}>
                {data.priceError}
              </Text>
            )}

            {!_.isNil(data.menu_promotion) &&
              data.menu_promotion.type === PROMO_TYPES.DISCOUNT && (
                <TextInput
                  editable={false}
                  placeholder={strings.DISCOUNT_PRICE}
                  placeholderTextColor={Colors.text.quaternary}
                  label={strings.DISCOUNTED_PRICE}
                  labelStyle={[
                    styles.labelStyle,
                    {fontSize: Fonts.size.xxSmall},
                  ]}
                  value={data.discount}
                  maxLength={AMOUNT_FIELD_LENGTH}
                  style={styles.textInput}
                />
              )}
          </View>

          <View
            style={[styles.inputWrap, {marginLeft: Metrics.mediumBaseMargin}]}>
            <TextInput
              editable={!isChangeMode}
              keyboardType="number-pad"
              // placeholder={`${strings.TAX} %`}
              placeholderTextColor={Colors.text.quaternary}
              value={
                _.isNil(data.tax)
                  ? _.isNil(data.tax_ratio)
                    ? '0'
                    : _.toString(data.tax_ratio)
                  : data.tax
              }
              maxLength={TAX_FIELD_LENGTH}
              onChangeText={(taxAmount) => {
                if (!isChangeMode) {
                  if (isNaN(taxAmount) || taxAmount > 100) {
                    return true;
                  }
                  onChangeField('tax', index, taxAmount);
                }
              }}
              label={strings.TAX_AMT}
              labelStyle={[styles.labelStyle, {fontSize: Fonts.size.xxSmall}]}
              style={styles.textInput}
              ref={(ref) => {
                props.taxRef(ref);
              }}
            />
            {(!_.isEmpty(data.tax) || !_.isNil(data.tax_ratio)) && (
              <View
                style={[
                  styles.percentSignWrap,
                  util.isRTL() && styles.percentSignWrapRtl,
                  isChangeMode && {opacity: 0.35},
                ]}>
                <Text size={Fonts.size.small}>%</Text>
              </View>
            )}

            {!_.isEmpty(data.taxError) && (
              <Text
                type="medium"
                size={Fonts.size.xxxxSmall}
                color={Colors.error.primary}
                textAlign={util.rtlRightText()}
                style={[AppStyles.mTop5, AppStyles.mBottom20]}>
                {data.taxError}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.quantityWrap}>
          <Text type="bold" style={styles.quantityStyle}>
            {strings.QTY}: {data.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
}
