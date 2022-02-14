import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {setFirstTime} from '../../actions/GeneralActions';
import util from '../../util';

import TourScreensView from './TourScreensView';

class TourScreensController extends React.Component {
  state = {
    currentPage: util.isRTL() ? 2 : 0,
    lastPage: 0,
  };
  static propTypes = {};
  static defaultProps = {};

  buttonClick = () => {
    if (
      util.isRTL() ? this.state.currentPage > 0 : this.state.currentPage < 2
    ) {
      this.swiper.scrollBy(util.isRTL() ? -1 : 1);
    } else {
      this.skip();
    }
  };

  skip = () => {
    this.props.setFirstTime();
    _.isEmpty(this.props.user.token)
      ? Actions.reset('login')
      : Actions.reset('drawerMenu');
  };

  onIndexChanged = (index) => {
    this.setState({
      currentPage: index,
    });
  };

  render() {
    return (
      <TourScreensView
        {...this.props}
        // scrollEnd={this.scrollEnd}
        onIndexChanged={this.onIndexChanged}
        buttonClick={this.buttonClick}
        currentPage={this.state.currentPage}
        swiperRef={(ref) => (this.swiper = ref)}
        skip={this.skip}
      />
    );
  }
}
const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {setFirstTime};

export default connect(mapStateToProps, actions)(TourScreensController);
