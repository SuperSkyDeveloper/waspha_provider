import React from 'react';
import PropTypes from 'prop-types';
import GDPRComplianceStatementView from './GDPRComplianceStatementView';
import {connect} from 'react-redux';
import {getGDPRComplianceStatementRequest} from '../../actions/GeneralActions';

class GDPRComplianceStatementController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getGDPRComplianceStatementRequest} = this.props;

    this.setState({loading: true});
    getGDPRComplianceStatementRequest((response) => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <GDPRComplianceStatementView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  GDPRComplianceStatement: general.GDPRComplianceStatement,
});

const actions = {getGDPRComplianceStatementRequest};

export default connect(
  mapStateToProps,
  actions,
)(GDPRComplianceStatementController);
