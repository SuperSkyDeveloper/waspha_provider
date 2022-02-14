import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  locationHeadingText: {
    color: Colors.text.quaternary,
    fontSize: Fonts.size.xxxSmall,
  },
  locationText: {
    color: Colors.text.hexa,
    fontSize: Fonts.size.small,
    width: '90%',
  },
  locationWrap: {
    padding: 30, // shadow

    elevation: 1.2,
    borderRadius: 10,
    borderWidth: 0.2,
  },

  confirmTxt: {
    paddingHorizontal: 30,
    alignSelf: 'center',
    paddingVertical: 15,
    color: Colors.white,
  },
  btn: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.resolutionBlue,
    borderRadius: 5,
  },
  imageLocation: {height: 24, width: 24},
});
