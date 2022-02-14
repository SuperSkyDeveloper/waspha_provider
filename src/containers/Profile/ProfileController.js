import React from 'react';
import _ from 'lodash';
import {Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import ProfileView from './ProfileView';
import {connect} from 'react-redux';
import util from '../../util';
import {helper, constains} from '../../s3Helper';
import {updateUserProfileRequest} from '../../actions/UserActions';
import {strings} from '../../constants';

class ProfileController extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      isForEdit: false,
      fullNameError: '',
      phoneError: '',
      userImage: '',
      emailError: '',
      isLoading: false,
      isImgUploadVisible: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    // if isForEdit
    const {user} = this.props;
    this.setState({
      fullName: user.name,
      email: user.email,
      phone: user.contact,
      userImage: user.avatar,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.contact !== prevProps.user.contact) {
      this.setState({phone: this.props.user.contact});
    }
    if (this.props.user.email !== prevProps.user.email) {
      this.setState({email: this.props.user.email});
    }
  }

  setValue = (obj) => {
    this.setState(obj);
  };

  handleEditProfile = () => {
    const temp = _.cloneDeep(this.state.isForEdit);

    this.setState({
      isForEdit: !temp,
      fullNameError: '',
      emailError: '',
      phoneError: '',
    });
  };

  //  focus on fields
  fullNameFocus = () => {
    this.fullNameRef.focus();
  };

  emailFocus = () => {
    this.emailRef.focus();
  };

  phoneFocus = () => {
    // this.phoneRef.focus();
  };

  // validation all login fields
  validation = () => {
    const {fullName, email, phone} = this.state;

    let error = true;

    // if (_.isEmpty(phone.number)) {
    //   this.setState({
    //     phoneError: util.isRequiredErrorMessage('Phone'),
    //   });
    //   // this.phoneFocus();
    //   error = false;
    // } else if (!util.isNumber(phone.number) || !phone.isNumberValid) {
    //   this.setState({
    //     phoneError: strings.ENTER_VALID_NUMBER,
    //   });
    //   // this.phoneFocus();
    //   error = false;
    // }

    // if (_.isEmpty(email)) {
    //   this.setState({emailError: util.isRequiredErrorMessage('Email')});
    //   this.emailFocus();
    //   error = false;
    // } else if (!util.isEmailValid(email)) {
    //   this.setState({emailError: strings.EMAIL_IS_NOT_VALID});
    //   this.emailFocus();
    //   error = false;
    // }

    if (_.isEmpty(fullName)) {
      this.setState({
        fullNameError: strings.USER_ID_IS_REQ,
        //util.isRequiredErrorMessage(strings.USER_ID),
      });
      this.fullNameFocus();
      error = false;
    }

    return error;
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      fullNameError: '',
      emailError: '',
      phoneError: '',
    });

    // if validation pass
    if (this.validation()) {
      //  start loading
      this.setState({
        isLoading: true,
      });
      // hide keyboard
      Keyboard.dismiss();
      const {fullName, email, phone, userImage} = this.state;
      const payload = {
        name: fullName,
        // email,
        // contact: phone,
        avatar: userImage,
      };
      this.props.updateUserProfileRequest(payload, (status) => {
        //  stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          this.setState({
            isForEdit: false,
          });
        }
      });
    }
  };

  updateProfileImage = async (image) => {
    // payload
    let payload = {
      uri: image.path,
      fileType: image.mime,
    };

    try {
      // send req for aws s3 image upload
      let req = await helper.uploadImageOnS3(
        payload,
        constains.folderList.USER,
      );

      this.setState({
        userImage: req,

        isImgUploadVisible: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  closeImageModal = () => {
    this.setState({isImgUploadVisible: false});
  };

  render() {
    const {
      fullName,
      email,
      phone,
      fullNameError,
      phoneError,
      emailError,
      isForEdit,
      isLoading,
      userImage,
      isImgUploadVisible,
    } = this.state;
    return (
      <ProfileView
        {...this.props}
        userImage={userImage}
        isImgUploadVisible={isImgUploadVisible}
        isLoading={isLoading}
        closeImageModal={this.closeImageModal}
        updateProfileImage={this.updateProfileImage}
        handleSubmit={this.handleSubmit}
        handleEditProfile={this.handleEditProfile}
        fullName={fullName}
        email={email}
        phone={phone}
        fullNameError={fullNameError}
        phoneError={phoneError}
        emailError={emailError}
        setValue={this.setValue}
        isForEdit={isForEdit}
        fullNameRef={(ref) => {
          this.fullNameRef = ref;
        }}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        phoneRef={(ref) => {
          this.phoneRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {
  updateUserProfileRequest,
};

export default connect(mapStateToProps, actions)(ProfileController);
