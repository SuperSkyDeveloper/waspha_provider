import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PromoCodesView from './PromoCodesView';
import {connect} from 'react-redux';
import {getPromoCodesRequest} from '../../actions/PromoCodesAction';
import {filterPromos} from '../../helpers/promoHelper';

class PromoCodesController extends React.Component {
  constructor() {
    super();
    this.state = {
      pressedOnceList: [],
      loading: false,
      activeTabIndex: 0,
      generalPromos: [],
      myPromos: [],
    };
  }
  static propTypes = {promos: PropTypes.array};
  static defaultProps = {promos: []};

  componentDidMount() {
    this.initialRequest();
  }

  initialRequest = () => {
    switch (this.state.activeTabIndex) {
      case 0: {
        this.pushTabInArray('general');

        break;
      }
      case 1: {
        this.pushTabInArray('specific');

        break;
      }
    }
  };

  pushTabInArray = (status) => {
    let pressedOnceList = _.cloneDeep(this.state.pressedOnceList);
    if (!_.includes(pressedOnceList, status)) {
      this.getTabData(status);
      pressedOnceList.push(status);
      this.setState({pressedOnceList});
    }
  };

  getTabData = (type) => {
    const {getPromoCodesRequest} = this.props;

    const payload = {
      type,
    };
    this.setState({loading: true});
    getPromoCodesRequest(payload, (response) => {
      if (response) {
        this.getPromosIntoState();
      }
      this.setState({loading: false});
    });
  };

  getPromosIntoState = async () => {
    this.setState({
      generalPromos: filterPromos(this.props.promos, 'general'),
      myPromos: filterPromos(this.props.promos, 'specific'),
    });
  };

  handleTabIndex = (index) => {
    this.setState(
      {
        activeTabIndex: index,
      },
      () => {
        this.initialRequest();
      },
    );
  };

  render() {
    const {activeTabIndex, generalPromos, myPromos, loading} = this.state;
    return (
      <PromoCodesView
        activeTabIndex={activeTabIndex}
        generalPromos={generalPromos}
        myPromos={myPromos}
        loading={loading}
        handleTabIndex={this.handleTabIndex}
        getTabData={this.getTabData}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({promoCodes}) => ({
  promos: promoCodes.promos,
});

const actions = {getPromoCodesRequest};

export default connect(mapStateToProps, actions)(PromoCodesController);
