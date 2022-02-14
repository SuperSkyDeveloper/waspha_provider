// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  Image as RnImage,
  ViewPropTypes,
  View,
  Image,
} from 'react-native';
import {Text, ButtonView} from '../';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import PhoneInput from 'react-native-phone-input';
import styles from './styles';
import ModalPickerImage from './ModalPickerImage';

export default class ContactInput extends React.PureComponent {
  constructor() {
    super();

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      pickerData: null,
    };
  }
  componentDidMount() {
    this.setState({
      pickerData: this.myRef.getPickerData(),
    });
  }
  onPressFlag() {
    const {onClickFlag} = this.props;
    onClickFlag ? this.myCountryPicker.open() : '';
  }

  // here arrange country code and number seperate the return call back function
  handleCountryCode = () => {
    if (this.myRef.isValidNumber()) {
      const countryCode = this.myRef.getCountryCode();

      let phoneNumber = this.myRef.getValue();
      if (!_.isEmpty(phoneNumber)) {
        phoneNumber = phoneNumber.replace('+', '');
        phoneNumber = phoneNumber.replace(countryCode, '');

        let numberData = {
          country_code: `+${countryCode}`,
          phone_number: this.myRef.getValue(),
          number: phoneNumber,
        };

        // callback funciton
        this.props.onNumberChange(numberData, this.myRef);
      }
    }
  };

  selectCountry(country) {
    this.myRef.selectCountry(country.iso2);
  }

  static propTypes = {
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.number,
    onNumberChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    error: '',
    label: 'Phone No',
    containerStyle: {},
    onPress: null,
    multiline: false,
    onClickFlag: true,
    onNumberChange: () => {},
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      icon,
      value,
      onNumberChange,
      ...rest
    } = this.props;
    return (
      <View style={containerStyle}>
        <View style={styles.labelWrapper}>
          <Text
            style={[AppStyles.labelStyle, AppStyles.mBottom10]}
            type="medium">
            {label}
          </Text>
        </View>
        <View>
          <View>
            <RnImage source={Images.DownArrowIcon} style={styles.btnImage} />
            {/* <View style={styles.verticalLine} /> */}
            <View style={AppStyles.pRight30}>
              <PhoneInput
                ref={(ref) => {
                  this.myRef = ref;
                }}
                value={value.number}
                initialCountry={'pk'}
                textStyle={styles.textStyle}
                allowZeroAfterCountryCode={false}
                flagStyle={styles.flagStyle}
                onPressFlag={this.onPressFlag}
                autoFormat={true}
                textProps={{maxLength: 20}}
                onChangePhoneNumber={(number) => {
                  this.handleCountryCode(number);
                }}
                {...rest}
              />
            </View>
            <ModalPickerImage
              ref={(ref) => {
                this.myCountryPicker = ref;
              }}
              data={this.state.pickerData}
              onChange={(country) => {
                this.selectCountry(country);
              }}
              cancelText="Cancel"
            />
          </View>
          <View style={styles.line} />
          {!_.isNull(onPress) && (
            <ButtonView onPress={onPress} style={styles.buttonOverlay}>
              <Image
                source={Images.arrow_right_grey}
                style={styles.arrowIcon}
              />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.error.primary}
            textAlign={util.rtlRightText()}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
