import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity, FlatList} from 'react-native';
import {Text} from '..';
import styles from './SideBarItemStyles';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';
import util from '../../util';

export default function SideBarItemView(props) {
  const {item, active, togglePress, index} = props;
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>{ 
          if(!_.isFunction(item.actionPerform)){
            togglePress(index)
          }
          else{
          item.actionPerform();
          }
          }}
        style={[styles.linkWrap, util.isRTL() && AppStyles.rowReverse]}>
        <RnImage
          source={item.icon}
          style={{
            width: 28,
            height: 28,
            marginRight: 10,
            tintColor: Colors.text.secondary,
          }}
          resizeMode="contain"
        />
        <Text
          size={Fonts.size.small}
          style={util.isRTL() && AppStyles.mRight10}
          color={Colors.white}
          type={'medium'}>
          {item.title}
        </Text>
        {!_.isNil(item.dropDownIcon) && (
          <View style={[AppStyles.pLeft5, {position: 'absolute', right: 0}]}>
            <RnImage
              source={item.dropDownIcon}
              style={[
                styles.iconMain,
                active && styles.activeBtn,
                {width: 11, height: 11},
              ]}
              tintColor={Colors.text.secondary}
            />
          </View>
        )}

        {/*
      {item.notifications !== '' && (
        <View style={styles.badge}>
          <Text size={Fonts.size.font13} color={Colors.white} type={'bold'}>
            {item.notifications}
          </Text>
        </View>
      )} */}
      </TouchableOpacity>

      {active && !_.isNil(item.subMenus) && (
        <View style={[AppStyles.mLeft25, AppStyles.mBottom15, {top: -17}]}>
          <FlatList
            data={item.subMenus}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (item.restricted) {
                return (
                  <TouchableOpacity
                    onPress={item.action}
                    style={[
                      AppStyles.flexRow,
                      util.isRTL() && AppStyles.rowReverse,
                      {marginTop: Metrics.baseMargin},
                      util.isRTL() && AppStyles.mLeft20,
                    ]}>
                    <RnImage
                      source={item.icon}
                      style={styles.icon}
                      tintColor={Colors.white}
                    />
                    <View
                      style={[
                        util.isRTL() && {
                          maxWidth: Metrics.screenWidth / 2,
                        },
                      ]}>
                      <Text
                        style={[
                          util.isRTL()
                            ? [AppStyles.mRight10, {textAlign: 'right'}]
                            : {textAlign: 'left'},
                        ]}
                        size={Fonts.size.xSmall}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        color={Colors.white}
                        type={'medium'}>
                        {item.title}
                      </Text>
                    </View>
                    {item.info !== '' && (
                      <View style={AppStyles.pLeft5}>
                        <Text
                          size={Fonts.size.font15}
                          color={Colors.malachite}
                          type={'bold'}>
                          {item.info}
                        </Text>
                      </View>
                    )}
                    {item.notifications !== '' && (
                      <View style={styles.badge}>
                        <Text
                          size={Fonts.size.font13}
                          color={Colors.white}
                          type={'bold'}>
                          {item.notifications}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      )}
    </>
  );
}
