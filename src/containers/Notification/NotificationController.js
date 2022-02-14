import React from 'react';
import _, {initial} from 'lodash';
import PropTypes from 'prop-types';
import NotificationView from './NotificationView';
import {connect} from 'react-redux';
import {
  markAsViewedRequest,
  vendorNotificationsRequest,
} from '../../actions/VendorStoreAction';

class NotificationController extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      isLoading: true,
    };
  }
  static propTypes = {accountApproved:PropTypes.bool,fromSameScreen:PropTypes.bool};
  static defaultProps = {accountApproved:false,fromSameScreen:false};

  componentDidMount() {
if(this.props.fromSameScreen){
this.setState({isLoading:false})
return true
}

    this.initial();
    
  }

  initial = () => {
    // start loading
    this.setState({
      isLoading: true,
    });
    this.props.vendorNotificationsRequest({}, () => {
      /// mark as view api request here
      console.log("ASDKJSAKD",this.state.isLoading)

      this.props.markAsViewedRequest({type: 'notification'}, () => {
        this.setState({
          isLoading: false,
        });
      });
      this.setState({
        isLoading: false,
      });
    });
  };

  handleModalVisible = () => {
    const temp = _.cloneDeep(this.state.isModalVisible);
    this.setState({
      isModalVisible: !temp,
    });
  };

  render() {
    const {isModalVisible, isLoading} = this.state;
    return (
      <NotificationView
        {...this.props}
        isLoading={isLoading}
        handleModalVisible={this.handleModalVisible}
        isModalVisible={isModalVisible}
      />
    );
  }
}

const mapStateToProps = ({vendorStore}) => ({
  notifications: vendorStore.vendorNotification,
});

const actions = {vendorNotificationsRequest, markAsViewedRequest};

export default connect(mapStateToProps, actions)(NotificationController);
