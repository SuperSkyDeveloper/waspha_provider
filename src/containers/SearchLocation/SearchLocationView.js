import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {CustomNavbar, Text} from '../../components';
import styles from './SearchLocationStyles';
import {AppStyles, Colors, Fonts, Metrics} from './../../theme';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import util from '../../util';
import {PLACES_API_KEY, strings} from '../../constants';

export default class SearchLocationView extends React.PureComponent {
  render() {
    const {handleSearchLocation, addressRef} = this.props;

    return (
      <View style={styles.container}>
        <CustomNavbar
          title={strings.SEARCH_LOCATION}
          titleColor={Colors.text.secondary}
          hasBack={true}
          hasBottomRadius={true}
        />

        <GooglePlacesAutocomplete
          placeholder={strings.ENTER_LOCATION}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            handleSearchLocation(details);
          }}
          // style={AppStyles.inputStyle}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: [
              styles.textInput,
              !util.isRTL() && styles.textInputLeft,
              util.isRTL() && styles.textInputRight,
            ],
            predefinedPlacesDescription: styles.row,
            listView: [styles.listView],
            row: [
              styles.row,
              util.isRTL() && {
                justifyContent: 'flex-end',
              },
            ],
          }}
          query={{
            key: PLACES_API_KEY,

            language: util.getLanguage(),
          }}
        />
      </View>
    );
  }
}
