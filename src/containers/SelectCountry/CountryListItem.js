import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './SelectCountryStyles';
import {View, Image as RNImage, TouchableOpacity} from 'react-native';
import {Images, Fonts, AppStyles, Colors} from '../../theme';
import {Text} from '../../components';
import util from '../../util';
import {strings} from '../../constants';

class CountryListItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    isCountrySelected: PropTypes.bool,
    onPress: PropTypes.func,
  };
  static defaultProps = {
    item: {},
    isCountrySelected: false,
    onPress: () => {},
  };

  render() {
    const {item, isCountrySelected, onPress} = this.props;

    return (
      <TouchableOpacity
        style={styles.listingWrap}
        activeOpacity={0.7}
        onPress={() => {
          onPress(item);
        }}>
        <View style={[styles.singleList, util.isRTL() && AppStyles.rowReverse]}>
          <View style={[styles.imageWrap, util.isRTL() && AppStyles.mLeft5]}>
            <RNImage
              source={item.icon}
              style={[styles.image]}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.textWrap, util.isRTL() && AppStyles.rowReverse]}>
            <Text
              textAlign={util.rtlRightText()}
              style={[
                styles.category_text,
                isCountrySelected && styles.category_text_active,
              ]}>
              {item.name[util.getLanguage()]}
            </Text>
            {isCountrySelected && (
              <RNImage
                source={Images.CheckIcon}
                style={[styles.checkIcon]}
                resizeMode="contain"
              />
            )}
            {!isCountrySelected && (
              <RNImage
                source={Images.UncheckIcon}
                style={[styles.checkIcon]}
                tintColor={Colors.purple}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CountryListItem;
