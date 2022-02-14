import React from 'react';
import PropTypes from 'prop-types';
import RiderListItemView from './RiderListItemView';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import {Colors, Fonts, Images} from '../../theme';

class RiderListItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      isDeleteModalShow: false,
      riderId: null,
    };
  }
  static propTypes = {
    item: PropTypes.array,
    isDeliveryGuyForm: PropTypes.bool,
    isForAssign: PropTypes.bool,
    vehicles: PropTypes.array,
    deletePress: PropTypes.func,
    deletable: PropTypes.bool,
    itemPress: PropTypes.func,
    isLoading: PropTypes.bool,
    isDeleteBtnShow: PropTypes.bool,
  };
  static defaultProps = {
    item: [],
    isDeliveryGuyForm: false,
    isForAssign: false,
    deletePress: () => {},
    itemPress: () => {},
    isLoading: false,
    isDeleteBtnShow: false,
  };

  // handle delete confirmation modal
  handleConfirmationModal = (riderId) => {
    this.setState({
      isDeleteModalShow: !this.state.isDeleteModalShow,
      riderId,
    });
  };

  handleDelete = () => {
    const {riderId} = this.state;
    this.props.deletePress(riderId);
  };

  render() {
    const {isDeleteModalShow} = this.state;
    return (
      <RiderListItemView
        isDeleteModalShow={isDeleteModalShow}
        handleConfirmationModal={this.handleConfirmationModal}
        handleDelete={this.handleDelete}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(RiderListItemController);
