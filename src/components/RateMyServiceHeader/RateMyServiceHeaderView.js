import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images, AppStyles, Colors, Metrics} from '../../theme';
import styles from './RateMyServiceHeaderStyles';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function RateMyServiceHeaderView(props) {
  const {user} = props;
  return (
    <LinearGradient
      start={{x: -1.1, y: 1.8}}
      end={{x: 3.1, y: -2.5}}
      colors={Colors.gradient.primary}
      style={styles.mainSec}>
      <TouchableOpacity
        style={styles.backWrap}
        onPress={() => {
          Actions.pop();
        }}>
        <RnImage source={Images.BackBtn} />
      </TouchableOpacity>
      <View>
        <View style={{alignItems: 'center'}}>
          <RnImage
            source={util.profilePlaceHolderImage(user.avatar)}
            style={[
              styles.profilePic,
              {borderRadius: 100},
              (_.isNil(user.avatar) || _.isEmpty(user.avatar)) && {
                tintColor: Colors.white,
              },
            ]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
