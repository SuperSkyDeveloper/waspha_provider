import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {Text} from '..';
import styles from './TabsHeaderStyles';
import {Colors, Fonts, Images} from '../../theme';
import util from '../../util';

export default function TabsHeaderView(props) {
  const {
    handleTabIndex,
    headerMainText,
    headerSubText,
    activeTabIndex,
    tabList,
  } = props;
  return (
    <LinearGradient
      start={{x: 0, y: 2.1}}
      end={{x: 3, y: 0}}
      colors={Colors.gradient.primary}
      style={styles.header}>
      <TouchableOpacity
        style={[styles.backWrap, util.isRTL() && styles.backWrapRtl]}
        onPress={() => {
          Actions.pop();
        }}>
        <RnImage
          source={Images.BackBtn}
          style={[util.isRTL() && styles.backBtnRtl]}
        />
      </TouchableOpacity>
      <Text
        size={Fonts.size.large}
        color={Colors.text.secondary}
        type="bold"
        textAlign="center">
        {`${headerMainText}
${headerSubText}`}
      </Text>
      <View style={styles.tabSec}>
        {tabList.map((item, index) => {
          const active = index === activeTabIndex;
          return (
            <TouchableOpacity
              key={item.title}
              style={[styles.tabWrap, active && styles.active]}
              onPress={() => {
                handleTabIndex(index);
              }}>
              <Text
                size={Fonts.size.xSmall}
                color={Colors.text.secondary}
                type="medium"
                style={active && styles.opacity}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}
