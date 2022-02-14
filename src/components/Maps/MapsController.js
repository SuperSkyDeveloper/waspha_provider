import React from 'react';
import PropTypes from 'prop-types';
import MapsView from './MapsView';
import {connect} from 'react-redux';
import {Metrics} from '../../theme';

class MapsController extends React.Component {
  constructor() {
    super();
    this.state = {
      showEditModal: false,
    };
  }
  static propTypes = {
    coordinates: PropTypes.object,
    mapHeight: PropTypes.number,
    riders: PropTypes.array,
    selectedRider: PropTypes.object,
    pressSelectedRider: PropTypes.func,
    onMapDrag: PropTypes.func,
    directionData: PropTypes.array,
    initialRoute: PropTypes.object.isRequired,
    vehicleIcon: PropTypes.string,
    assignOnlineLoader: PropTypes.bool,
    handleAssignDriver: PropTypes.func,
    getAddress: PropTypes.func,
    fromWasphaExpress: PropTypes.bool,
    riderTimeAndKM: PropTypes.object,
  };
  static defaultProps = {
    coordinates: {},
    mapHeight: Metrics.screenHeight,
    riders: [],
    selectedRider: {},
    pressSelectedRider: () => {},
    onMapDrag: () => {},
    directionData: [],
    handleAssignDriver: () => {},
    assignOnlineLoader: false,
    vehicleIcon: '',
    getAddress: () => {},
    fromWasphaExpress: false,
    riderTimeAndKM: {},
  };

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    return <MapsView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(MapsController);
