import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  Button,
  Calendar,
  OrderItemAccordian,
  TextInput,
} from '../../components';
import styles from './OrderPlaceStyles';
import {strings, ORDER_ITEM_TYPE} from '../../constants';
import {Colors, Fonts, Images, AppStyles, Metrics} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';

const renderCollected = (packageCharge,
  packageChargeError,
  deliveryFee,
  deliveryFeeError,
  waitingTollCharges,
  waitingTollChargesError,
  setValue,
  totalCharges,
  user
  ) => {
    let currency=  _.isNil(user.currency_code)
    ? 'ESP'
    : user.currency_code
  return (
    <View style={{paddingHorizontal:20}}>
<View style={[AppStyles.mBottom20,{paddingTop:30,borderBottomColor:Colors.border.accent,borderBottomWidth:0.3}]}>
<TextInput
style={{}}
keyboardType="number-pad"

                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={''}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={[AppStyles.inputStyle]}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.mRight30,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.PACKAGE_CHARGE}

                // labelImgStyle={[
                //   AppStyles.labelImgStyle,
                //   util.isRTL() && AppStyles.labelImgStyleRtl,
                // ]}
                // secureTextEntry={hidePassword}
                value={packageCharge}
                // error={packageChargeError}
                onChangeText={(val) => {
                  let value=_.toNumber(val)
                  
                  console.log({notNum:isNaN(value),value})
                  if(_.isNaN(value)){

                    return true
                  }
                                      setValue({packageCharge: val});

                }}
                // ref={(ref) => {
                //   props.passRef(ref);
                // }}
                // onSubmitEditing={handleSubmit}
              />
</View>
{!_.isEmpty(packageChargeError) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.error.primary}
            style={[ AppStyles.mBottom5]}
            textAlign={util.rtlRightText()}>
            {packageChargeError}
          </Text>
        )}
{/* <View style={[AppStyles.mBottom20,{paddingTop:30,borderBottomColor:Colors.border.accent,borderBottomWidth:0.3}]}>
<TextInput
style={{}}
keyboardType="number-pad"

                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={'********'}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={[AppStyles.inputStyle]}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.mRight30,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={'Delivery Fees'}

                // labelImgStyle={[
                //   AppStyles.labelImgStyle,
                //   util.isRTL() && AppStyles.labelImgStyleRtl,
                // ]}
                // secureTextEntry={hidePassword}
                value={deliveryFee}
                // error={deliveryFeeError}
                onChangeText={(val) => {
                  let value=_.toNumber(val)
                  
                  console.log({notNum:isNaN(value),value})
                  if(_.isNaN(value)){
                    // setDeliveryFee(value)

                    return true
                  }
                                      setValue({deliveryFee: val});

                }}
                // ref={(ref) => {
                //   props.passRef(ref);
                // }}
                // onSubmitEditing={handleSubmit}
              />
</View>
{!_.isEmpty(deliveryFeeError) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.error.primary}
            style={[ AppStyles.mBottom5]}
            textAlign={util.rtlRightText()}>
            {deliveryFeeError}
          </Text>
        )}

<View style={[AppStyles.mBottom20,{paddingTop:30,borderBottomColor:Colors.border.accent,borderBottomWidth:0.3}]}>
<TextInput
style={{}}
keyboardType="number-pad"

                textAlign={util.isRTL() ? 'right' : 'left'}
                placeholder={'********'}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={[AppStyles.inputStyle]}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.mRight30,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={'Waiting / Toll charges'}

                // labelImgStyle={[
                //   AppStyles.labelImgStyle,
                //   util.isRTL() && AppStyles.labelImgStyleRtl,
                // ]}
                // secureTextEntry={hidePassword}
                value={waitingTollCharges}
                // error={waitingTollChargesError}
                onChangeText={(val) => {
                  let value=_.toNumber(val)
                  
                  console.log({notNum:isNaN(value),value})
                  if(_.isNaN(value)){
                    // setDeliveryFee(value)

                    return true
                  }
                                      setValue({waitingTollCharges: val});

                }}
                // ref={(ref) => {
                //   props.passRef(ref);
                // }}
                // onSubmitEditing={handleSubmit}
              />
</View>
{!_.isEmpty(waitingTollChargesError) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.error.primary}
            style={[ AppStyles.mBottom5]}
            textAlign={util.rtlRightText()}>
            {waitingTollChargesError}
          </Text>
        )} */}
<View style={[ AppStyles.marginVerticalBase,AppStyles.alignItemsCenter]}>
  <Text type="semiBold" size={Fonts.size.normal}>{strings.TOTAL_TO_COLLECT} : </Text>
  <Text type="medium">{currency} {totalCharges.toFixed(2)}</Text>
</View>
</View>
  
  );
};

export default function OrderPlaceView(props) {
  const {
    setValue,
    activeIndex,
    handleIndex,
    itemList,
    hanldeNewItemPress,
    onChangeFiled,
    openCalender,
    openBottomSheet,
    setSelectedDropDownValue,

    removeItemModal,

    handleRemoveItem,
    loading,
    renderSubmitBtn,
    showRemoveImgBtn,
    packageCharge,
packageChargeError,
deliveryFee,
deliveryFeeError,
waitingTollCharges,
waitingTollChargesError,totalCharges,
user
  } = props;
console.log({loading})
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.ORDER_PLACE}
        titleColor={Colors.white}
        hasBottomRadius={true}
        showBackgroundColor={false}
      />
      {/* <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}> */}
      <KeyboardAwareScrollView
        // //keyboardShouldPersistTaps="always"
        // style={styles.container}
        style={styles.wrap}
        showsVerticalScrollIndicator={false}>
        <View style={styles.accordinWrap}>
          <FlatList
            data={itemList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const active = index === activeIndex;
              return (
                <OrderItemAccordian
                  active={active}
                  toggleAccordinPress={handleIndex}
                  data={item}
                  onChange={onChangeFiled}
                  handleRemovePrdItem={handleRemoveItem}
                  index={index}
                  itemType={ORDER_ITEM_TYPE.createTraditionalOrder}
                  fromOrderPlace={true}
                />
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={hanldeNewItemPress}
          style={[
            styles.newItemWrap,
            util.isRTL() ? [AppStyles.rowReverse] : [AppStyles.flexRow],
            {alignItems: 'baseline'},
          ]}>
          <Text style={styles.newItemText} type="semiBold">
            {strings.NEW_ITEM}
          </Text>
          <View style={[styles.circularPlusStyleWrap]}>
            <RnImage
              source={Images.CircularPlusIcon}
              style={styles.circularPlusStyle}
            />
          </View>
        </TouchableOpacity>

      {renderCollected(packageCharge,
packageChargeError,
deliveryFee,
deliveryFeeError,
waitingTollCharges,
waitingTollChargesError,
setValue,
totalCharges,
user
)}

        <View style={[styles.btnSec,AppStyles.mTop20]}>
          <View style={styles.submitBtnWrap}>
            <Button
              onPress={() => renderSubmitBtn()}
              isLoading={loading}
              disabled={loading}
              color={Colors.white}
              style={[styles.submitBtn, AppStyles.shadow5]}
              textStyle={styles.submitBtnText}>
              {strings.SUBMIT}
            </Button>
          </View>
        </View>

        {openCalender && (
          <Calendar
            setSelectedDropDownValue={setSelectedDropDownValue}
            setValue={setValue}
          />
        )}

      </KeyboardAwareScrollView>
    </View>
  );
}
