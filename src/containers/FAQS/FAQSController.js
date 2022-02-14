import React from 'react';
import PropTypes from 'prop-types';
import FAQSView from './FAQSView';
import {connect} from 'react-redux';
import {initial} from 'lodash';
import {getFaqRequest} from '../../actions/GeneralActions';

class FAQSController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: null,
      isLoading: true,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    this.props.getFaqRequest({}, () => {
      this.setState({
        isLoading: false,
      });
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
    const {activeIndex, isLoading} = this.state;
    return (
      <FAQSView
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        isLoading={isLoading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  faqs: general.faq,
});

const actions = {getFaqRequest};

export default connect(mapStateToProps, actions)(FAQSController);
