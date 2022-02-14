import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Button} from '../../components';
import styles from './NoConnectionStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';

export default function NoConnectionView(props) {
  return (
    <View style={styles.container}>
      <RnImage source={Images.NoConnection} style={styles.img} />
      <Text
        size={Fonts.size.medium}
        type="bold"
        color={Colors.text.error}
        textAlign="center"
        style={AppStyles.mTop50}>
        {strings.NO_INTERNET_CONNECTION}
      </Text>
      <View style={styles.btnWrap}>
        <Button
          color={Colors.text.primary}
          textStyle={styles.btnTextStyle}
          size={Fonts.size.normal}
          style={styles.btn}
          indicatorColor={Colors.text.secondary}
          onPress={() => {
            Actions.reset('drawerMenu');
          }}
          type="bold">
          {strings.TRY_AGAIN}
        </Button>
      </View>
    </View>
  );
}
