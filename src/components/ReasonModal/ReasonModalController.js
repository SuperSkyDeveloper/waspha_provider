import React from 'react';
import PropTypes from 'prop-types';
import ReasonModalView from './ReasonModalView';
import {connect} from 'react-redux';
import _ from 'lodash';

class ReasonModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOptions: [],
    };
  }
  static propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
  };
  static defaultProps = {};

  // handle selected option
  handleSelectOption = (id) => {
    const temp = _.cloneDeep(this.state.selectedOptions);
    let tempSelectedOption = _.xor([id], temp);
    this.setState({
      selectedOptions: tempSelectedOption,
    });
  };

  render() {
    const {selectedOptions} = this.state;
    return (
      <ReasonModalView
        {...this.props}
        handleSelectOption={this.handleSelectOption}
        selectedOptions={selectedOptions}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ReasonModalController);
