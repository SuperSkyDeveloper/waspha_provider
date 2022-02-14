import React from 'react';
import PropTypes from 'prop-types';
import RCListingView from './RCListingView';
import {connect} from 'react-redux';
import RocketChatSocketIO from '../RocketChatSocketIO';
import { getActiveOrdersRequest } from '../../actions/OrdersActions';

class RCListingController extends React.Component {
  constructor() {
    super();
    this.state = {isLoading: true, chatListing: []};
  }



  static propTypes = {activeOrders:PropTypes.array};
  static defaultProps = {activeOrders:[]};

componentWillMount(){
  this.props.getActiveOrdersRequest(response=>{
    
  })
}


  componentDidMount() {
    this.initial();
  }

  initial = () => {
    RocketChatSocketIO.getRooms((response) => {
      console.log("RES",response)
      if (response) {
        this.setState({
          chatListing: response.update,
          isLoading: false,
        });
      }
    });
  };

  render() {
    const {isLoading, chatListing} = this.state;
    return (
      <RCListingView
        {...this.props}
        isLoading={isLoading}
        chatListing={chatListing}
      />
    );
  }
}

const mapStateToProps = ({user,proposal}) => ({
  user:user.data,
  activeOrders:proposal.activeOrders

});
const actions = {getActiveOrdersRequest};

export default connect(mapStateToProps, actions)(RCListingController);
