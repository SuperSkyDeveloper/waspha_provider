import React from 'react';
import _ from 'lodash';
import {Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import SelectCountryView from './SelectCountryView';
import {Actions} from 'react-native-router-flux';
import Util from '../../util';
import {strings} from '../../constants';
import COUNTRY_LIST from '../../constants/countries';
import util from '../../util';

class SelectCountryController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],

      selectedCountry: props.countrySelected,
    };
  }

  static propTypes = {
    setValue: PropTypes.func,
    countrySelected: PropTypes.object,
  };
  static defaultProps = {setValue: () => {}, countrySelected: {}};

  componentDidMount = () => {
    let countryList = COUNTRY_LIST;

    this.setState({countryList});

    Keyboard.dismiss();
  };

  // search country
  searchCountries = (data) => {
    if (_.isEmpty(data)) {
      return this.setState({countryList: COUNTRY_LIST});
    }

    const filteredList = this.state.countryList.filter((country) => {
      return country.name[util.getLanguage()].includes(data);
    });

    this.setState({countryList: filteredList});
  };

  //select country
  handleCountrySelect = (country) => {
    // if this.props.selectSingleItem is true then
    // use select only one country
    // if (this.props.selectSingleItem) {

    // } else {
    //   let selectedCountry = _.xor([country], this.state.countries);
    //   this.setState({countries: selectedCountry});
    // }
    const {setValue} = this.props;
    setValue({selectedCountry: country});
    this.setState({
      selectedCountry: country,
    });
  };

  // validation
  validation = () => {
    const {selectedCountry} = this.state;
    if (_.isEmpty(selectedCountry)) {
      Util.topAlert(strings.PLEASE_SELECT_COUNTRY, 'error');
      return false;
    }
    return true;
  };

  onProceed = () => {
    if (this.validation()) {
      Actions.pop();
    }
  };

  render() {
    return (
      <SelectCountryView
        {...this.props}
        searchCountries={this.searchCountries}
        selectedCountry={this.state.selectedCountry}
        countryList={this.state.countryList}
        onProceed={this.onProceed}
        handleCountrySelect={this.handleCountrySelect}
      />
    );
  }
}

const actions = {};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, actions)(SelectCountryController);
