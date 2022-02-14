import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { strings } from '../constants';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '112074330014-nt4m6iqs397jhbq8qohc239f6qlr4ujn.apps.googleusercontent.com',
});
export const GoogleLogin = async (loginRequest, errorCallback) => {
  try {
    GoogleSignin.signOut();

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    loginRequest({ token: userInfo.idToken, token_type: 'google' });
  } catch (error) {
    console.log({ error });
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      errorCallback(strings.OPERATION_IN_PROGRESS);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      errorCallback(strings.SERVICE_UNAVAILABLE);
    } else {
      errorCallback();
      // some other error happened
      errorCallback(strings.SOMETHING_WENT_WRONG);
    }
  }
};
