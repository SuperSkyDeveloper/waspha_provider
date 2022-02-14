import React from 'react';
import PropTypes from 'prop-types';
import OptionsModalView from './OptionsModalView';
import {connect} from 'react-redux';

class OptionsModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeId: '',
    };
  }
  static propTypes = {
    modalType: PropTypes.string,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    callBack: PropTypes.func,
    selectedModeId: PropTypes.number,
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    isUserChat: PropTypes.bool,
    isDeliveryChat: PropTypes.bool,
    isGroupChat: PropTypes.bool,
    detailData: PropTypes.object,
    showPhoneOptions: PropTypes.bool,
    showHeading: PropTypes.bool,
  };
  static defaultProps = {
    detailData: {},
    modalType: '',
    closeModal: () => {},
    isModalOpen: false,
    isLoading: false,
    callBack: () => {},
    selectedModeId: 2,
    onSubmit: () => {},
    showPhoneOptions: false,
    showHeading: true,
  };

  componentDidMount() {
    const {selectedModeId} = this.props;
    this.setState({activeId: selectedModeId});
  }

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    console.log({Asdfasfsa: this.props});
    const {activeId} = this.state;
    return (
      <OptionsModalView
        {...this.props}
        setValue={(data) => this.setValue(data)}
        activeId={activeId}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  deliveryModeOptions: general.appSettings.delivery_modes,
});

const actions = {};

export default connect(mapStateToProps, actions)(OptionsModalController);
