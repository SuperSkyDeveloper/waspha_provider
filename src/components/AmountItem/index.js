// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../';
import styles from './styles';
import {strings} from '../../constants';
import {AppStyles, Colors, Images, Fonts} from '../../theme';
import util from '../../util';

export default class AmountItem extends React.Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  render() {
    const {amount, currencyCode} = this.props;
    return (
      <View style={[styles.reviewSec, util.isRTL() && AppStyles.rowReverse]}>
        <Text
          size={Fonts.size.xSmall}
          color={Colors.text.secondary}
          type="bold">
          {`${util.isRTL() ? ` ${currencyCode}` : `${currencyCode} `}`}
        </Text>
        <Text
          size={Fonts.size.xSmall}
          color={Colors.text.secondary}
          type="bold">
          {amount}
        </Text>
        <RnImage
          style={[styles.arrow, util.isRTL() && styles.arrowRtl]}
          source={Images.UnionIcon}
        />
      </View>
    );
  }
}
