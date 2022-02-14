import React from 'react';
import PropTypes from 'prop-types';
import TraditionalOrderDetailsView from './TraditionalOrderDetailsView';
import {connect} from 'react-redux';
import {
  getTraditionalOrderDetailsRequest,
  getWasphaVehiclesRequest,
} from '../../actions/OrdersActions';

class TraditionalOrderDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: null,
      loading: true,
    };
  }
  static propTypes = {
    id: PropTypes.number.isRequired,
    traditionalOrderDetails: PropTypes.object,
    wasphaVehicles: PropTypes.array,
  };
  static defaultProps = {traditionalOrderDetails: {}, wasphaVehicles: []};

  componentDidMount() {
    const {
      getTraditionalOrderDetailsRequest,
      getWasphaVehiclesRequest,
      id,
    } = this.props;
    getTraditionalOrderDetailsRequest({id}, (res) => {
      this.setState({loading: false});
      if (res) {
        getWasphaVehiclesRequest({order_id: id}, (res) => {
          if (res) {
          }
        });
      }
    });
  }

  // handle accordin
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
    const {activeIndex, loading} = this.state;
    return (
      <TraditionalOrderDetailsView
        {...this.props}
        activeIndex={activeIndex}
        loading={loading}
        handleIndex={this.handleIndex}
      />
    );
  }
}

// handle accordin
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

const mapStateToProps = ({proposal}) => ({
  traditionalOrderDetails: proposal.traditionalOrderDetails,
  wasphaVehicles: proposal.wasphaVehicles,
});
const actions = {getTraditionalOrderDetailsRequest, getWasphaVehiclesRequest};

export default connect(
  mapStateToProps,
  actions,
)(TraditionalOrderDetailsController);
