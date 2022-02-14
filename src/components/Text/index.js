// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {Text as TextRN, StyleSheet, Platform} from 'react-native';
import {Fonts, Colors} from '../../theme';
import util from '../../util';

const Text = (props: Object) => {
  const {
    style,
    color,
    size,
    type,
    textAlign,
    children,
    removeFontFamily,
    ...rest
  } = props;

  const textStyle = StyleSheet.flatten([
    {
      textAlign,
      fontFamily:
        util.isRTL() && !removeFontFamily
          ? util.isPlatformAndroid()
            ? 'Lateef-Regular'
            : 'Lateef'
          : Fonts.type[type],
      // fontSize: size in Fonts.size ? Fonts.size[util.isRTL()?!util.isPlatformAndroid()?size+5:size+2:size] : util.isRTL() ?!util.isPlatformAndroid()?size+5:size+2:size,
      fontSize:
        size in Fonts.size
          ? Fonts.size[
              !util.isPlatformAndroid() && util.isRTL() ? size + 10 : size
            ]
          : !util.isPlatformAndroid() && util.isRTL()
          ? size + 3
          : size,

      color: Colors.text[color] || color,
      backgroundColor: Colors.transparent,
    },
    style,
  ]);

  return (
    <TextRN style={textStyle} {...rest} allowFontScaling={false}>
      {children}
    </TextRN>
  );
};

Text.propTypes = {
  ...TextRN.propTypes,
  removeFontFamily: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(_.keys(Fonts.size)),
    PropTypes.number,
  ]),
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(_.keys(Fonts.type)),
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
};

Text.defaultProps = {
  ...TextRN.defaultProps,
  removeFontFamily: false,
  size: 'normal',
  type: 'base',
  color: 'primary',
  textAlign: util.rtlRightText(),
};

export default Text;
