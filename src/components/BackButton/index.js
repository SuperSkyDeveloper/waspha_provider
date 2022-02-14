// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {ButtonView, Text} from '../';
import styles from './styles';
import {Images, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';

export default class BackButton extends React.Component {
  static propTypes = {
    leftBtnPress: PropTypes.func,
    color: PropTypes.string,
    imageStyle: PropTypes.object,
  };

  static defaultProps = {
    leftBtnPress: () => {
      Actions.pop();
    },
    color: Colors.background.secondary,
  };

  render() {
    const {leftBtnPress, color, imageStyle} = this.props;
    return (
      <ButtonView onPress={leftBtnPress} style={styles.btnWrapper}>
        <Image
          source={Images.BackBtnBlack}
          style={[styles.btnImage, imageStyle, {tintColor: color}]}
          tintColor={color}
        />
      </ButtonView>
    );
  }
}
