import React from 'react';

import {Rating} from 'react-native-rating-element';
import util from '../../util';

export default function StarRatingView(props) {
  const {initialRating, readonly, onChangeRating, imageSize} = props;
  return (
    <Rating
      rated={initialRating}
      totalCount={5}
      ratingColor="#f1c644"
      ratingBackgroundColor="#d4d4d4"
      size={imageSize}
      readonly={readonly}
      icon="ios-star"
      direction={util.isRTL() ? 'row-reverse' : 'row'} // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
      onIconTap={(position) => onChangeRating(position)}
    />
  );
}
