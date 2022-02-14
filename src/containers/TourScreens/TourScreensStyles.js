import {StyleSheet} from 'react-native';

import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: Metrics.tripleBaseMargin,
  },
  page1Wrapper: {
    ...AppStyles.flex,
  },
  skipParent: {
    top: 30,
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingTop: 3,
  },
  narration: {
    fontSize: Fonts.size.large,
    textAlign: 'center',
    paddingHorizontal: 50,
    color: Colors.text.secondary,
    ...AppStyles.basePadding,
  },
  bold: {fontSize: 25, ...AppStyles.fontBold},
  centerImage: {},
  button: {
    backgroundColor: Colors.texasRose,
    height: 66,
    marginBottom: 70,
    ...AppStyles.baseMargin,
  },
  buttonText: {
    color: Colors.white,
  },
});
