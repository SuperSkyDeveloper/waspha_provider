// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {Text, ButtonView, SearchBar, HTMLView} from '../';
import styles from './styles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    subTitleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    hasBackground: PropTypes.object,
    hasBottomRadius: PropTypes.bool,
    isNavWithHeader: PropTypes.bool,
    cornerBackground: PropTypes.string,
  };

  static defaultProps = {
    hasBack: true,
    titleColor: '',
    subTitleColor: '',
    subTitle: '',
    leftBtnImage: undefined,
    leftBtnPress: Actions.pop,
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnPress: () => {},
    rightBtnText: '',
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    hasBackground: false,
    hasBottomRadius: false,
    isNavWithHeader: false,
    cornerBackground: '',
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView onPress={leftBtnPress} style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image source={leftBtnImage} size={styles.btnImage} />
        )}
        {renderBack && (
          <Image
            source={Images.BackBtn}
            style={[styles.btnImage, util.isRTL() && styles.btnImageRtl]}
          />
        )}
      </ButtonView>
    );
  }

  renderRight(rightBtnImage, rightBtnPress, rightBtnText) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[styles.btnWrapper, styles.rightBtn]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <Image source={rightBtnImage} size={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderTitle(title, subTitle, titleColor, subTitleColor) {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        {/* <Text
          color={titleColor || Colors.blue1}
          type="medium"
          numberOfLines={2}
          ellipsizeMode="tail"
          size={Fonts.size.medium}
          style={{textAlign: 'center'}}>
          {title || ''}
        </Text> */}
        <HTMLView
          htmlContent={title || ''}
          color={titleColor || Colors.blue1}
          type="medium"
          numberOfLines={2}
          ellipsizeMode="tail"
          size={Fonts.size.medium}
          style={{textAlign: 'center'}}
        />

        {!_.isEmpty(subTitle) && (
          // <Text
          //   color={subTitleColor || Colors.blue1}
          //   numberOfLines={1}
          //   ellipsizeMode="tail"
          //   size={Fonts.size.xSmall}>
          //   {subTitle}
          // </Text>

          <HTMLView
            htmlContent={subTitle}
            color={subTitleColor || Colors.blue1}
            numberOfLines={1}
            ellipsizeMode="tail"
            size={Fonts.size.xSmall}
          />
        )}
      </View>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  render() {
    const {
      hasBack,
      title,
      subTitle,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
      titleColor,
      subTitleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      hasBottomRadius,
      isNavWithHeader,
      cornerBackground,
    } = this.props;

    const renderContent = () => {
      return (
        <>
          <View
            style={[AppStyles.flexRow, util.isRTL() && AppStyles.rowReverse]}>
            {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack)}
            {this.renderTitle(title, subTitle, titleColor, subTitleColor)}
            {this.renderRight(rightBtnImage, rightBtnPress, rightBtnText)}
          </View>

          {hasSearch && (
            <View style={AppStyles.centerInner}>
              {this.renderSearch(onSearchText, isSearching)}
            </View>
          )}
        </>
      );
    };

    const navWithGradient = (
      <View style={{backgroundColor: cornerBackground}}>
        <LinearGradient
          start={{x: 0.4, y: 0}}
          end={{x: 1, y: 3}}
          colors={Colors.gradient.primary}
          style={[
            styles.container,
            style,
            hasBorder ? styles.borderBottom : {},
            hasSearch ? styles.searchHeader : {},
            hasBottomRadius && styles.borderRadius,
          ]}>
          {renderContent()}
        </LinearGradient>
      </View>
    );

    const navWithBg = (
      <ImageBackground
        source={Images.NavHeader01}
        colors={[Colors.resolutionBlue, Colors.violetRed]}
        style={[
          styles.container,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
          hasBottomRadius && styles.borderRadius,
        ]}>
        {renderContent()}
      </ImageBackground>
    );

    return isNavWithHeader ? navWithBg : navWithGradient;
  }
}
