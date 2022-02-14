// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {Images} from '../theme';
import {
  ALERT_MESSAGE,
  APP_SETTINGS,
  CHANGE_LANGUAGE,
  FIRST_TIME_OPEN,
  GET_COOKIE_POLICY,
  GET_COPY_RIGHT_POLICY,
  GET_FAQ,
  GET_GDPR_COMPLIANCE_STATEMENT,
  GET_PRIVACY_POLICY,
  GET_TERMS_AND_CONDITIONS,
  GET_TERMS_DELIVERY_PARTNER,
  TRANSLATIONS,
  SET_COUNTRY_CODE,
} from '../actions/ActionTypes';
import {GetCurrentTimeInISO} from '../helpers/generalHelper';

const initialState = Immutable({
  initialRun: true,
  appSettings: {},
  privacyPolicy: '',
  termsAndCondition: '',
  language: 'en',
  faq: [],
  cookiePolicy: '',
  copyRight: '',
  termsDelveryPartner: '',
  GDPRComplianceStatement: '',
  translationLocales: {},
  alertMessage: '',
  countryCode: 'AE',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_SETTINGS.SUCCESS: {
      let temp = _.cloneDeep(action.data);
      // todo pop beacuse delete last express delivery
      // temp.delivery_modes.pop();

      return Immutable.merge(state, {
        appSettings: temp,
      });
    }
    case CHANGE_LANGUAGE.SUCCESS: {
      return Immutable.merge(state, {
        language: _.lowerCase(action.data.language),
      });
    }
    case GET_FAQ.SUCCESS: {
      return Immutable.merge(state, {
        faq: action.data,
      });
    }
    case FIRST_TIME_OPEN: {
      return Immutable.merge(state, {
        initialRun: false,
      });
    }
    case GET_PRIVACY_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        privacyPolicy: action.data[state.language],
      });
    }
    case GET_TERMS_AND_CONDITIONS.SUCCESS: {
      return Immutable.merge(state, {
        termsAndCondition: action.data[state.language],
      });
    }

    case GET_COOKIE_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        cookiePolicy: action.data[state.language],
      });
    }

    case GET_COPY_RIGHT_POLICY.SUCCESS: {
      return Immutable.merge(state, {
        copyRight: action.data[state.language],
      });
    }

    case GET_TERMS_DELIVERY_PARTNER.SUCCESS: {
      return Immutable.merge(state, {
        termsDelveryPartner: action.data[state.language],
      });
    }

    case GET_GDPR_COMPLIANCE_STATEMENT.SUCCESS: {
      return Immutable.merge(state, {
        GDPRComplianceStatement: action.data[state.language],
      });
    }

    case TRANSLATIONS.SUCCESS: {
      const temp = {
        translationsUpdatedAt: GetCurrentTimeInISO(),
        ...action.data,
      };
      return Immutable.merge(state, {
        translationLocales: temp,
      });
    }

    case ALERT_MESSAGE: {
      return Immutable.merge(state, {
        alertMessage: action.data,
      });
    }

    case SET_COUNTRY_CODE: {
      return Immutable.merge(state, {
        countryCode: action.data,
      });
    }

    default:
      return state;
  }
};
