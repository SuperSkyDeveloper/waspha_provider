import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {Loader, Text, TextInput} from '../../components';
import styles from './StoreDashboardSearchStyles';
import {Images, Colors, AppStyles, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function StoreDashboardSearchView(props) {
  const {
    onSearchText,
    searchText,
    setValue,
    showFilter,
    isLoading,
    onSearchClear,
    isSearchCleanBtn,
    onInputPress,
    fromArabicForm,
  } = props;

  let isInputClickable = _.isNil(onInputPress);

  return (
    <View style={[styles.searchWrap, util.isRTL() && AppStyles.rowReverse]}>
      <View style={[styles.searchFieldWrap]}>
        <TextInput
          textAlign={util.isRTL() || fromArabicForm ? 'right' : 'left'}
          editable={isInputClickable}
          style={styles.searchField}
          labelStyle={styles.labelStyle}
          placeholder={strings.SEARCH}
          placeholderTextColor={Colors.text.hexa}
          value={searchText}
          onPress={isInputClickable ? null : onInputPress}
          onChangeText={(text) => {
            setValue({searchText: text});
          }}
          ref={(ref) => {
            props.searchInputRef(ref);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
      {isSearchCleanBtn && (
        <TouchableOpacity
          style={AppStyles.mRight5}
          onPress={() => {
            onSearchClear();
          }}>
          <Text size={Fonts.size.xSmall}>X</Text>
        </TouchableOpacity>
      )}
      {isLoading && <Loader loading={isLoading} />}

      {!isLoading && (
        <TouchableOpacity
          onPress={() => {
            onSearchText(searchText);
          }}
          style={[
            styles.searchBtn,
            !util.isRTL() &&
              fromArabicForm && {
                left: 10,
                position: 'absolute',
              },
            (util.isRTL() || fromArabicForm) && {
              right: 10,
              position: 'absolute',
            },
          ]}>
          <RnImage source={Images.SearchIcon} />
        </TouchableOpacity>
      )}

      {false && (
        <TouchableOpacity>
          <RnImage source={Images.FilterIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}
