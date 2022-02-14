import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, HTMLView} from '../../components';
import styles from './TrendingProductsItemStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function TrendingProductsItemView(props) {
  const {item, horizontal, storeDetail} = props;

  return (
    <View
      style={[
        horizontal ? styles.horizontalWrp : styles.trendingWrp,
        styles.shadowStyle,
      ]}>
      <View style={[styles.openBadge]}>
        {storeDetail.is_online && (
          <Text
            color={Colors.text.hepta}
            size={Fonts.size.xxxxSmall}
            type="bold">
            {strings.OPEN}
          </Text>
        )}
        {!storeDetail.is_online && (
          <Text
            color={Colors.text.error}
            size={Fonts.size.xxxxSmall}
            type="bold">
            {strings.CLOSE}
          </Text>
        )}
      </View>

      <View style={[styles.ratingBadge]}>
        <RnImage source={Images.StarIcon} style={styles.starImg} />
        <Text color={Colors.text.seca} size={Fonts.size.xxxxSmall} type="bold">
          {storeDetail.rating}
        </Text>
      </View>
      <RnImage
        source={{uri: renderNameStringAndImageRender(item.image)}}
        style={styles.trendImg}
      />
      <View style={[styles.infoSec, util.isRTL() && AppStyles.rowReverse]}>
        <View style={[styles.leftSec, util.isRTL() && AppStyles.rowReverse]}>
          <View style={util.isRTL() && AppStyles.mLeft5}>
            {/* <Text
              style={styles.leftTextStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
              color={Colors.text.heca}
              size={Fonts.size.xSmall}
              type="semiBold">
              {renderNameStringAndImageRender(item.title)}
            </Text> */}
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.title)}
              color={Colors.text.heca}
              size={Fonts.size.xSmall}
              type="semiBold"
              numberOfLines={1}
              ellipsizeMode="tail"
              textAlign={util.rtlRightText()}
            />
            {/* <Text
              style={styles.leftTextStyle}
              numberOfLines={1}
              color={Colors.text.penta}
              ellipsizeMode="tail"
              size={Fonts.size.xxxxSmall}>
              {renderNameStringAndImageRender(item.description)}
            </Text> */}
            <HTMLView
              htmlContent={renderNameStringAndImageRender(item.description)}
              color={Colors.text.penta}
              size={Fonts.size.xxxxSmall}
              type="semiBold"
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <LinearGradient
            start={{x: 0.4, y: 0}}
            end={{x: 1, y: 0}}
            colors={Colors.gradient.quaternary}
            style={styles.badge1}>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.xxxxSmall}
              type="medium">
              {storeDetail.name[util.getLanguage()]}
            </Text>
          </LinearGradient>
          <View style={styles.badge2}>
            <Text
              color={Colors.text.secondary}
              size={Fonts.size.xxxxSmall}
              type="medium">
              {`${storeDetail.distance} km`}
            </Text>
          </View>
        </View>
        {false && (
          <View style={styles.imgWrap}>
            <View style={styles.peoplesImgWrap}>
              <RnImage
                style={styles.peoplesImg}
                source={Images.ProfilePlaceholder}
              />
            </View>
            <View style={styles.peoplesImgWrap}>
              <RnImage
                style={styles.peoplesImg}
                source={Images.ProfilePlaceholder}
              />
            </View>
            <View style={styles.peoplesImgWrap}>
              <RnImage
                style={styles.peoplesImg}
                source={Images.ProfilePlaceholder}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
