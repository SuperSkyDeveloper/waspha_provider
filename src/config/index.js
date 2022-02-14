// @flow
import DebugSettings from './DebugSettings';

export default () => {
  if (__DEV__) {
    console.disableYellowBox = true;
    // eslint-disable-next-line no-console
    console.disableYellowBox = !DebugSettings.yellowBox;
  }
};
