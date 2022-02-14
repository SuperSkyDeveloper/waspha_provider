import React from 'react';
import PropTypes from 'prop-types';
import PromoCodeItemView from './PromoCodeItemView';
import {connect} from 'react-redux';

class PromoCodeItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {item: PropTypes.object};
  static defaultProps = {item: {}};

  render() {
    return <PromoCodeItemView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(PromoCodeItemController);
