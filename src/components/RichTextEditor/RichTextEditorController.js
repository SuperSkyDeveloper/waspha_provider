import React, {Component} from 'react';

import PropTypes from 'prop-types';
import RichTextEditorView from './RichTextEditorView';
import {Fonts, Colors} from '../../theme';

const strikethrough = require('../../assets/images/ActiveRadioBtn/ActiveRadioBtn.png'); //icon for strikethrough
const video = require('../../assets/images/ActiveRadioBtn/ActiveRadioBtn.png'); //icon for Addvideo

let setTimeoutForToolbar;

export default class RichTextEditorController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightChange: 60,
      text: '',
      showToolbar: !props.showLateToolbar,
    };
  }
  static propTypes = {
    placeholder: PropTypes.style,
    value: PropTypes.string.isRequired,
    containerStyle: PropTypes.style,
    inputStyle: PropTypes.style,
    iconTint: PropTypes.style,
    selectedIconTint: PropTypes.style,
    disabledIconTint: PropTypes.style,
    iconSize: PropTypes.style,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    labelStyle: PropTypes.style,
    labelType: PropTypes.string,
    error: PropTypes.string,
    formErrorAlign: PropTypes.string,
    fontSize: PropTypes.string,
    isLabel: PropTypes.bool,
    heightInput: PropTypes.string,
    refRichText: PropTypes.object,
    disabled: PropTypes.bool,
    refTrue: PropTypes.bool,
    showLateToolbar: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    containerStyle: {},
    inputStyle: {},
    iconTint: 'purple',
    selectedIconTint: 'pink',
    disabledIconTint: 'purple',
    iconSize: 20,
    labelType: 'medium',
    labelStyle: {},
    error: '',
    formErrorAlign: '',
    fontSize: Fonts.size.xxSmall,
    textAlign: 'left',
    isLabel: false,
    heightInput: 0,
    refRichText: {},
    disabled: false,
    refTrue: true,
    showLateToolbar: false,
  };

  componentDidMount() {
    if (this.props.showLateToolbar) {
      setTimeoutForToolbar = setTimeout(() => {
        this.setState({
          showToolbar: true,
        });
      }, 400);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.showLateToolbar !== this.props.showLateToolbar &&
      this.props.showLateToolbar
    ) {
      clearInterval(setTimeoutForToolbar);
    }
  }

  editorInitializedCallback = () => {
    this.props.refRichText.current?.registerToolbar(function (items) {});
  };

  // Callback after height change
  handleHeightChange = (height) => {
    // console.log("editor height change:", height);
    this.setState({
      heightChange: heightChange + 5,
    });
  };

  onPressAddImage = () => {
    // you can easily add images from your gallery
    this.props.refRichText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
    );
  };

  insertVideo = () => {
    // you can easily add videos from your gallery
    this.props.refRichText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
    );
  };

  onChangeText = (text) => {
    return this.setState({
      text: text,
    });
  };
  render() {
    const {heightChange, text, showToolbar} = this.state;
    const {refRichText, disabled} = this.props;

    return (
      <RichTextEditorView
        showToolbar={showToolbar}
        strikethrough={strikethrough}
        video={video}
        heightChange={heightChange}
        disabled={disabled}
        text={text}
        refRichText={refRichText}
        editorInitializedCallback={this.editorInitializedCallback}
        handleHeightChange={this.handleHeightChange}
        onPressAddImage={this.onPressAddImage}
        insertVideo={this.insertVideo}
        {...this.props}
      />
    );
  }
}
