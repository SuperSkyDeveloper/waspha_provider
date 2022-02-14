import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HTMLViewView from './HTMLViewView';
import PropTypes from 'prop-types';
import _ from 'lodash';
import util from '../../util';
import {Fonts, Colors} from '../../theme';
export default class HTMLViewController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    htmlContent: PropTypes.string.isRequired,
    style: PropTypes.object,
    spanStyle: PropTypes.object,
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(_.keys(Fonts.size)),
      PropTypes.number,
    ]),

    type: PropTypes.oneOf(_.keys(Fonts.type)),
    textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    numberOfLines: PropTypes.string,
    ellipsizeMode: PropTypes.string,
  };
  static defaultProps = {
    style: {},
    spanStyle: {},
    size: 'normal',
    type: 'base',
    color: 'primary',
    textAlign: util.rtlRightText(),
    numberOfLines: 0,
    ellipsizeMode: 'clip',
  };

  render() {
    const {htmlContent, spanStyle, style} = this.props;
    return (
      <HTMLViewView
        htmlContent={htmlContent}
        style={style}
        spanStyle={spanStyle}
        {...this.props}
      />
    );
  }
}
