import React, {Component} from 'react';
import defaultStyles from './HTMLViewStyles';
import HTMLView from 'react-native-htmlview';
import util from '../../util';
import {Fonts, Colors} from '../../theme';
import {rest} from 'lodash';

export default class HTMLViewView extends Component {
  render() {
    const {
      htmlContent,
      spanStyle,
      style,
      size,
      type,
      textAlign,
      color,

      numberOfLines,
      ellipsizeMode,
      ...rest
    } = this.props;

    const closeInSpan = `<span>${htmlContent}</span>`;

    const Spanstyle = {
      textAlign: textAlign,
      fontFamily: util.isRTL()
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

      color: color,
      backgroundColor: Colors.transparent,
      ...style,
    };

    return (
      <HTMLView
        value={closeInSpan}
        nodeComponentProps={{
          numberOfLines: numberOfLines,
          ellipsizeMode: ellipsizeMode,
        }}
        stylesheet={{
          span: Spanstyle,
        }}
      />
    );
  }
}
