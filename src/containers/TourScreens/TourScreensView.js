import React from 'react';
import styles from './TourScreensStyles';
import {Images, Colors, AppStyles, Metrics, Fonts} from '../../theme';
import SwiperRN from 'react-native-swiper';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Button, Text, Loader} from '../../components';
import {strings} from '../../constants';
import util from '../../util';

function _renderPage1(buttonClick) {
  return (
    <ImageBackground source={Images.Tour1} style={styles.page1Wrapper}>
      <View style={styles.wrapper}>
        <Image
          source={Images.WasphaRiderLogo}
          style={styles.centerImage}
          resizeMode="contain"
        />
        <Text style={styles.narration} type="medium">
          Lorem ipsum, or lipsum as it is sometimes known
        </Text>
      </View>
    </ImageBackground>
  );
}

function _renderPage2(buttonClick) {
  return (
    <ImageBackground source={Images.Tour2} style={styles.page1Wrapper}>
      <View style={styles.wrapper}>
        <Image
          source={Images.WasphaRiderLogo}
          style={styles.centerImage}
          resizeMode="contain"
        />
        <Text style={styles.narration}>
          Lorem ipsum, or lipsum as it is sometimes known
        </Text>
      </View>
    </ImageBackground>
  );
}

function _renderPage3(buttonClick) {
  return (
    <ImageBackground source={Images.Tour3} style={styles.page1Wrapper}>
      <View style={styles.wrapper}>
        <Image
          source={Images.WasphaRiderLogo}
          style={styles.centerImage}
          resizeMode="contain"
        />
        <Text style={styles.narration}>
          Lorem ipsum, or lipsum as it is sometimes known
        </Text>
      </View>
    </ImageBackground>
  );
}

function _renderPage4(buttonClick) {
  return (
    <ImageBackground source={Images.Tour4} style={styles.page1Wrapper}>
      <View style={styles.wrapper}>
        <Image
          source={Images.WasphaRiderLogo}
          style={styles.centerImage}
          resizeMode="contain"
        />
        <Text style={styles.narration}>
          Lorem ipsum, or lipsum as it is sometimes known
        </Text>
      </View>
    </ImageBackground>
  );
}

function dot() {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        width: 10,
        height: 10,
        borderRadius: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  );
}
function activeDot() {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.text.secondary,
          width: 16,
          height: 16,
          borderRadius: 10,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        },
        AppStyles.centerInner,
      ]}>
      <View
        style={{
          backgroundColor: Colors.text.secondary,
          width: 15,
          height: 15,
          borderRadius: 8,
          borderWidth: 1,
          // borderColor: Colors.white,
        }}></View>
    </View>
  );
}
export default function TourScreensView(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View
        style={[styles.skipParent, !util.isRTL() && {alignSelf: 'flex-end'}]}>
        <TouchableOpacity onPress={props.skip}>
          <Text
            style={{textDecorationLine: 'underline'}}
            color={Colors.text.secondary}
            type="semiBold">
            {strings.SKIP}
          </Text>
        </TouchableOpacity>
      </View>
      <SwiperRN
        index={props.currentPage}
        loop={false}
        // onMomentumScrollEnd={(e, {index, total}) => {
        //   props.scrollEnd(index, total - 1);
        // }}
        onIndexChanged={props.onIndexChanged}
        scrollEnabled={true}
        dot={dot()}
        activeDot={activeDot()}
        ref={(swiper) => {
          props.swiperRef(swiper);
        }}>
        {_renderPage1(props.buttonClick)}
        {_renderPage2(props.buttonClick)}
        {_renderPage3(props.buttonClick)}
        {_renderPage4(props.buttonClick)}
      </SwiperRN>
    </View>
  );
}
