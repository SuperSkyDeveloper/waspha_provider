import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import SideBarView from './SideBarView';
import {userSignOutRequest} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import {changeLanguageRequest} from '../../actions/GeneralActions';
import general from '../../reducers/general';
import {getUnViewedNotificationsRequest} from '../../actions/VendorStoreAction';
let pool;

class SideBarController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      isLoading: false,
      isLangModalVisible: false,
      activeAccordin: null,
      activeIndex: null,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    if (!_.isEmpty(this.props.user.access_token)) {
      this.pooling();
    }
  }
  componentWillUnmount() {
    clearInterval(pool);
  }

  pooling = () => {
    pool = setInterval(() => {
      this.props.getUnViewedNotificationsRequest(() => {});
    }, 5000);
  };

  handleLogout = () => {
    const payload = {
      // is_online: false,
    };
    clearInterval(pool);
    Actions.reset('login');

    this.props.userSignOutRequest(payload, (status) => {
      // if (status) {
      // }
    });
  };

  // handle change language
  handleChangeLanguage = (lang) => {
    if (this.props.language == _.lowerCase(lang)) {
      return true;
    }
    this.setState(
      {
        language: lang,
        isLoading: true,
      },
      () => {
        const payload = {
          language: this.state.language,
        };

        this.props.changeLanguageRequest(payload, (status) => {
          clearInterval(pool);

          this.setState({
            isLoading: false,
          });

          if (status) {
            // hide modal
            this.setState({
              isLangModalVisible: false,
            });
            Actions.reset('welcome');
          }
        });
      },
    );
  };

  // handle Visible language modal
  handleLanguageModal = () => {
    const temp = _.cloneDeep(this.state.isLangModalVisible);

    this.setState({
      isLangModalVisible: !temp,
    });
  };

  handleIndex = (index) => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  render() {
    const {isLoading, isLangModalVisible, activeIndex} = this.state;
    return (
      <SideBarView
        activeIndex={activeIndex}
        handleIndex={this.handleIndex}
        navigate={this.navigate}
        isLangModalVisible={isLangModalVisible}
        handleLogout={this.handleLogout}
        isLoading={isLoading}
        handleChangeLanguage={this.handleChangeLanguage}
        handleLanguageModal={this.handleLanguageModal}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, general, vendorStore}) => ({
  user: user.data,
  language: general.language,
  storeProfile: vendorStore.storeProfile,
});
const actions = {
  userSignOutRequest,
  changeLanguageRequest,
  getUnViewedNotificationsRequest,
};

export default connect(mapStateToProps, actions)(SideBarController);
