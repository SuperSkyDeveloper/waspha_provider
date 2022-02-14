import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {BackButton, Text} from '../../components';
import styles from './SignHeaderStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function SignHeaderView(props) {
  const {
    title,
    subTitle,
    mainHeading,
    subHeading,
    drawerImg,
    leftBtnPress,
    showMask,
    isForEdit,
  } = props;
  return (
    <View>
      <ImageBackground
        source={Images.SignBg}
        style={styles.bgImage}
        imageStyle={styles.imageStyle}>
        {isForEdit && (
          <View style={[styles.backWrap, util.isRTL() && styles.rowReverseRtl]}>
            <BackButton
              color={Colors.text.primary}
              imageStyle={util.isRTL() && styles.imageStyleRtl}
            />
          </View>
        )}
        <View
          style={[styles.leftImgViewWrapper, util.isRTL() && styles.rtlWrap]}>
          {drawerImg !== '' && (
            <TouchableOpacity
              onPress={leftBtnPress}
              style={[styles.backBtnStyle]}>
              <RnImage
                style={[
                  styles.drawerImgimgStyle,
                  util.isRTL() && styles.backWrapRtl,
                ]}
                source={drawerImg}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>
          {title !== '' && (
            <Text
              size={Fonts.size.medium}
              color={Colors.white}
              type="medium"
              textAlign={util.isRTL() ? 'right' : 'left'}>
              {title}
            </Text>
          )}
          {subTitle !== '' && (
            <Text
              size={Fonts.size.xxLarge}
              color={Colors.white}
              type="semiBold"
              textAlign={util.isRTL() ? 'right' : 'left'}>
              {subTitle}
            </Text>
          )}
        </View>
      </ImageBackground>
      <View style={styles.headingSec}>
        {mainHeading !== '' && (
          <Text
            color={Colors.text.accent}
            size={Fonts.size.xxLarge}
            type="semiBold"
            textAlign="center">
            {mainHeading}
          </Text>
        )}
        {subHeading !== '' && (
          <Text
            style={AppStyles.mTop5}
            color={Colors.text.quaternary}
            size={Fonts.size.xxxSmall}
            textAlign="center">
            {subHeading}
          </Text>
        )}
        {showMask == true ? (
          <RnImage source={Images.Mask3} style={styles.mask1} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
