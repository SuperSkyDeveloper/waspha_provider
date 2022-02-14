import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    padding: 10,
  },
  btn: {
    height: 49,
    backgroundColor: Colors.button.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    backgroundColor: Colors.background.primary,

    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin,
    marginTop: Metrics.mediumBaseMargin,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    borderColor: Colors.text.quaternary,
    borderWidth: 1,
    borderRadius: 1,
    borderLeftWidth: 0,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    flex: 1,
  },
  borderLeft: {
    borderColor: Colors.text.quaternary,
    borderLeftWidth: 1,
  },

  arrowImg: {
    position: 'absolute',
    top: 18,
    right: 30,
  },
  defualtArrowImg: {
    transform: [{rotate: '180deg'}],
  },
  activeArrowImg: {
    transform: [{rotate: '0deg'}],
  },
  rowWrap: {
    justifyContent: 'space-between',
    paddingVertical: Metrics.smallMargin,
  },
});
