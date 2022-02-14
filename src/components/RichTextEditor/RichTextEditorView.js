import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import _ from 'lodash';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import styles from './RichTextEditorStyles';
import {Text} from '../../components';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import util from '../../util';

export default class RichTextEditorView extends Component {
  async getHtml() {
    // Get the data here and call the interface to save the data
    //let html = await this.richText.current.getContentHtml();
    //console.log({html});
  }
  render() {
    const {
      refRichText,
      handleHeightChange,
      editorInitializedCallback,
      insertVideo,
      onPressAddImage,
      strikethrough,
      video,
      heightChange,
      onChangeText,
      text,
      iconTint,
      selectedIconTint,
      disabledIconTint,
      iconSize,
      placeholder,
      containerStyle,
      inputStyle,
      value,
      onChange,
      label,
      labelStyle,
      labelType,
      error,
      formErrorAlign,
      fontSize,
      textAlign,
      isLabel,
      heightInput,
      disabled,
      refTrue,
      showToolbar,
    } = this.props;
    console.log({refRichText});
    return (
      <ScrollView
        behavior={'height'}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {isLabel && value == '' && (
          <Text
            style={[labelStyle, AppStyles.width100]}
            type={labelType}
            textAlign={util.rtlRightText()}>
            {label}
          </Text>
        )}

        <View style={{}}>
          <RichEditor
            initialContentHTML={value}
            containerStyle={[styles.editor, containerStyle]}
            // ref={refRichText}
            ref={refRichText ? refRichText : ''}
            style={[styles.rich, inputStyle, {height: heightChange}]}
            placeholder={placeholder}
            initialContentHTML={value}
            disabled={disabled}
            onChange={(text) => {
              onChange(text);
            }}
            editorStyle={{
              contentCSSText: `font-size:${fontSize}px;color: black; height:${heightInput}px;  text-align: ${textAlign}; `,
            }}
            editorInitializedCallback={editorInitializedCallback}
            onHeightChange={handleHeightChange}
          />
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.red}
            textAlign={
              !_.isEmpty(formErrorAlign) ? formErrorAlign : util.rtlRightText()
            }
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}
        {showToolbar && (
          <View style={styles.mainToolbar}>
            <RichToolbar
              style={[styles.richBar]}
              editor={!_.isNil(refRichText) ? refRichText : ''}
              // getEditor={() => refRichText}
              iconTint={iconTint}
              selectedIconTint={selectedIconTint}
              disabledIconTint={disabledIconTint}
              onPressAddImage={onPressAddImage}
              iconSize={iconSize}
              actions={[
                actions.setBold,
                actions.setItalic,

                actions.insertBulletsList,
                actions.insertOrderedList,

                actions.setStrikethrough,
                actions.setUnderline,
                actions.removeFormat,

                actions.checkboxList,
                actions.keyboard,
                actions.undo,
                actions.redo,
              ]}
              // map icons for self made actions
              iconMap={{
                [actions.heading1]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
                ),
                [actions.heading2]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>H2</Text>
                ),
              }}
            />
            <View
              style={{
                width: 50,
                position: 'absolute',
                left: -36,
                top: 18,
                paddingRight: 10,
                transform: [{rotate: '180deg'}],
              }}>
              <Image
                style={{
                  width: 30,
                  height: 15,
                  marginTop: 10,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
                source={Images.forwordBtn}
              />
            </View>
            <Image
              style={{
                width: 10,
                height: 15,
                marginTop: 10,
                alignSelf: 'center',
              }}
              source={Images.forwordBtn}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}
