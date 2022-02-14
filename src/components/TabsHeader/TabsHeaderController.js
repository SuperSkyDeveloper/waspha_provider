import React from 'react';
import PropTypes from 'prop-types';
import TabsHeaderView from './TabsHeaderView';
import {connect} from 'react-redux';

class TabsHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    handleTabIndex: PropTypes.func,
    headerMainText: PropTypes.string,
    headerSubText: PropTypes.string,
    activeTabIndex: PropTypes.bool,
    tabList: PropTypes.array,
  };
  static defaultProps = {
    headerMainText: 'Promo',
    headerSubText: 'Codes',
    tabList: [],
    activeTabIndex: false,
    handleTabIndex: () => {},
  };

  render() {
    return <TabsHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(TabsHeaderController);
