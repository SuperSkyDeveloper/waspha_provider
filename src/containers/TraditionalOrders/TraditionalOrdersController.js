import React from 'react';
import PropTypes from 'prop-types';
import TraditionalOrdersView from './TraditionalOrdersView';
import {connect} from 'react-redux';
import {getTraditionalOrdersRequest} from '../../actions/OrdersActions';

class TraditionalOrdersController extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }
  static propTypes = {orders: PropTypes.array};
  static defaultProps = {orders: []};

  componentDidMount() {
    const {getTraditionalOrdersRequest} = this.props;
    getTraditionalOrdersRequest((res) => {
      this.setState({loading: false});
      if (res) {
      }
    });
  }

  render() {
    const {loading} = this.state;
    return <TraditionalOrdersView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({proposal}) => ({
  traditionalOrders: proposal.traditionalOrders,
});

const actions = {getTraditionalOrdersRequest};

export default connect(mapStateToProps, actions)(TraditionalOrdersController);
