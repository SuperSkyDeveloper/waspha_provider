import React from 'react';
import _ from 'lodash';
import PropTypes, {string} from 'prop-types';
import RateMyServiceView from './RateMyServiceView';
import {connect} from 'react-redux';
import {submitRatingRequest} from '../../actions/RatingActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {alertMessage} from '../../actions/GeneralActions';
const refCustom = React.createRef();
const refDriver = React.createRef();
class RateMyServiceController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverReview: '',
      driverReviewError: '',
      driverRating: 1,
      driverRatingError: '',
      customerReview: '',
      customerReviewError: '',
      customerRating: 1,
      customerRatingError: '',
      loading: false,
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  setValue = (key) => {
    this.setState(key);
  };

  validation = () => {
    let error = true;
    const {
      customerReview,
      customerRating,
      driverRating,
      driverReview,
    } = this.state;

    if (!util.isEmpty(customerRating)) {
      this.setState({
        customerRatingError: strings.USER_RATING_IS_REQ,
        //util.isRequiredErrorMessage(strings.USER_RATING),
      });
      error = false;
    }

    // if (_.isEmpty(customerReview)) {
    //   this.setState({
    //     customerReviewError: util.isRequiredErrorMessage(strings.USER_REVIEW),
    //   });
    //   error = false;
    // }

    if (util.isEmpty(this.props.data.driver_id)) {
      if (!util.isEmpty(driverRating)) {
        this.setState({
          driverRatingError: strings.DRIVER_RATING_IS_REQ,
          //util.isRequiredErrorMessage(strings.DRIVER_RATING),
        });
        error = false;
      }

      // if (_.isEmpty(driverReview)) {
      //   this.setState({
      //     driverReviewError: util.isRequiredErrorMessage(strings.DRIVER_REVIEW),
      //   });
      //   error = false;
      // }
    }

    return error;
  };

  submitRating = () => {
    const {
      driverReview,
      driverRating,
      customerReview,
      customerRating,
    } = this.state;

    // clear errors
    this.setState({
      customerReviewError: '',
      customerRatingError: '',
      driverReviewError: '',
      driverRatingError: '',
    });

    // if (this.validation()) {
    const {data, alertMessage} = this.props;

    let payload = {
      order_id: data.proposal_id,

      driver: {
        id: util.isEmpty(data.driver_id) ? data.driver_id : null,
        review: _.isEmpty(driverReview) ? null : driverReview,
        rating: driverRating,
      },
    };

    if (!util.isEmpty(data.driver_id)) {
      delete payload.driver;
    }

    if (!_.isNil(data.user_id)) {
      payload['user'] = {
        id: util.isEmpty(data.user_id) ? data.user_id : null,
        review: _.isEmpty(customerReview) ? null : customerReview,
        rating: customerRating,
      };
    }

    this.setState({loading: true});
    this.props.submitRatingRequest(payload, (response) => {
      this.setState({loading: false});

      if (response) {
        // util.topAlert(strings.RATINGS_SUBMIT_SUCCESSFULLY);
        alertMessage(strings.RATINGS_SUBMIT_SUCCESSFULLY);
        Actions.reset('drawerMenu');
      }
    });
    // }
  };

  render() {
    const {
      driverReview,
      driverRating,
      customerReview,
      customerRating,
      customerReviewError,
      customerRatingError,
      driverReviewError,
      driverRatingError,
      loading,
    } = this.state;

    return (
      <RateMyServiceView
        {...this.props}
        driverReview={driverReview}
        driverRating={driverRating}
        customerReview={customerReview}
        customerRating={customerRating}
        customerReviewError={customerReviewError}
        customerRatingError={customerRatingError}
        driverReviewError={driverReviewError}
        driverRatingError={driverRatingError}
        loading={loading}
        setValue={this.setValue}
        refCustom={refCustom}
        refDriver={refDriver}
        submitRating={this.submitRating}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({user: user.data});

const actions = {submitRatingRequest, alertMessage};

export default connect(mapStateToProps, actions)(RateMyServiceController);
