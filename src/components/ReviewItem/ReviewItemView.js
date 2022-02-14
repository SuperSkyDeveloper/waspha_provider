import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {HTMLView, StarRating, Text} from '../../components';
import styles from './ReviewItemStyles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';

export default function ReviewItemView(props) {
  const {data} = props;

  let avatar = _.isEmpty(data.user.avatar)
    ? Images.ProfilePlaceholder
    : {uri: data.user.avatar};

  return (
    <View style={[styles.review, util.isRTL() && AppStyles.rowReverse]}>
      <View style={util.isRTL() ? AppStyles.mLeft15 : AppStyles.mRight15}>
        <RnImage source={avatar} style={styles.profileImg} />
      </View>
      <View style={AppStyles.flex}>
        <Text
          color={Colors.text.primary}
          size={Fonts.size.small}
          type="medium"
          textAlign={util.rtlRightText()}>
          {data.user && data.user.name}
        </Text>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.mTop5,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          {/* <Rating
            isDisabled={true}
            ratingCount={5}
            imageSize={15}
            readonly={true}
            startingValue={data.rating}
          /> */}

          <StarRating
            initialRating={data.rating}
            readonly={true}
            imageSize={15}
          />
        </View>
        {/* <Text
          color={Colors.text.primary}
          size={Fonts.size.xxSmall}
          type="medium"
          textAlign={util.rtlRightText()}
          style={[AppStyles.flex, AppStyles.mTop5]}>
          {data.review && data.review}
        </Text> */}
        <View style={AppStyles.mTop5}>
          <HTMLView
            htmlContent={data.review ? data.review : ''}
            color={Colors.text.primary}
            size={Fonts.size.xxSmall}
            type="medium"
            textAlign={util.rtlRightText()}
          />
        </View>
      </View>
    </View>
  );
}
