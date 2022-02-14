import moment from 'moment';
import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '../../../components';
import {renderNameStringAndImageRender} from '../../../helpers/multilingualHelper';
import {Images, Colors, Fonts} from '../../../theme';
import styles from './styles';
export default class ItemListvehicle extends Component {
  render() {
    const {item, itemId, currency} = this.props;
    return (
      <View style={{marginTop: 10}}>
        <Text size={Fonts.size.small} type="bold" style={styles.Txt}>
          {renderNameStringAndImageRender(item.title)}
        </Text>
        <View
          style={{
            backgroundColor: itemId == item.id ? '#b6a2d1' : '#ded5ea',
            margin: 5,
            borderRadius: 45,
            width: 90,
            height: 90,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.imageInnerView}>
            <Image
              style={[styles.image, {tintColor: Colors.black}]}
              resizeMode="contain"
              source={{uri: item.image.white}}></Image>
          </View>
        </View>

        <Text size={Fonts.size.xxSmall} type="bold" style={styles.Txt}>
          {currency} {item.price}
        </Text>
        <Text size={Fonts.size.xxSmall} style={styles.Txt}>
          {moment.duration({minutes: item.eta}).humanize()}
        </Text>
      </View>
    );
  }
}
