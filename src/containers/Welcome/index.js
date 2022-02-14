// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Image, ImageBackground, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import {Images, Colors} from '../../theme';
import styles from './styles';
import 'moment/locale/ar';
import Util from '../../util';
import {
  appSettingsRequest,
  translationsRequest,
  setCountryCode,
} from '../../actions/GeneralActions';
import {strings} from '../../constants';
import util from '../../util';
import {getCurrentRegion} from '../../helpers/locationHelper';

class Welcome extends Component {
  componentDidMount() {
    this.initial();
  }

  // handle initial
  initial = () => {
    this.updateLocale();

    const {translationsUpdateAt, setCountryCode} = this.props;

    getCurrentRegion(true).then((countryCode) => {
      return setCountryCode(countryCode);
    });

    this.props.appSettingsRequest({}, (response) => {
      if (response) {
        if (
          _.isNil(translationsUpdateAt) ||
          moment(translationsUpdateAt).isBefore(
            response.translations_updated_at,
          )
        ) {
          this.props.translationsRequest({}, (status) => {
            if (status) {
              setTimeout(() => {
                this.getUpdatedString();
              }, 1000);
            }
          });
        } else {
          this.getUpdatedString();
        }
      }
    });
  };

  // getUpdatedString
  getUpdatedString = () => {
    strings.setContent(this.props.translationLocales);
    util.switchLanguage(this.props.language);

    this.navigate();
  };

  // navigation
  navigate = () => {
    if (!this.props.initialRun) {
      // return Actions.reset('tourScreens');
      return Actions.reset('login');
    } else if (
      !_.isNil(this.props.user.is_form_submitted) &&
      !this.props.user.is_form_submitted
    ) {
      return Actions.reset('applicationForm');
    } else if (
      !_.isNil(this.props.user.is_approved) &&
      !this.props.user.is_approved
    ) {
      return Actions.replace('waiting');
    } else if (!_.isEmpty(this.props.user.access_token)) {
      return Actions.reset('drawerMenu');
    } else {
      return Actions.reset('login');
    }
  };

  updateLocale = () => {
    const {language} = this.props;

    moment.updateLocale(language, {
      relativeTime: {
        // future: 'dans %s',
        s: 'a few sec',
        m: 'a min',
        mm: '%d mins',
        // h: 'une heure',
        // hh: '%d heures',
        // d: 'un jour',
        // dd: '%d jours',
        // M: 'un mois',
        // MM: '%d mois',
        // y: 'un an',
        // yy: '%d ans',
      },
    });
  };

  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <ImageBackground source={Images.SplashBg} style={styles.container}>
          <Image source={Images.Logo} style={styles.image} />
          {/* <DoubleBounce size={15} color={Colors.blue2} /> */}
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  user: user.data,
  initialRun: general.initialRun,
  translationLocales: general.translationLocales.strings,
  language: general.language,
  translationsUpdateAt: general.translationLocales.translationsUpdatedAt,
});

const actions = {appSettingsRequest, translationsRequest, setCountryCode};

export default connect(mapStateToProps, actions)(Welcome);
