import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../RCTheme';

export default StyleSheet.create({
  chatWrap: {
    paddingHorizontal: Metrics.baseMargin,
  },
  otherMessages: {
    marginTop: Metrics.smallMargin,
    alignSelf: 'flex-start',
    borderRadius: Metrics.borderRadius,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    flexDirection: 'row',
  },
  otherMessage: {
    backgroundColor: Colors.white,
    marginRight: Metrics.tripleMediumBaseMargin,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.alto1,
    flex: 1,
    width: '100%',
  },
  myMessage: {
    backgroundColor: Colors.deepCove,
    marginRight: Metrics.tripleMediumBaseMargin,
    alignSelf: 'flex-start',
    flex: 1,
    width: '100%',
  },
  flexWrap: {
    flexWrap: 'wrap',
    flex: 1,
  },
  timingsWrap: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.grey,
    paddingLeft: Metrics.baseMargin,
    alignSelf: 'flex-end',
  },

  trianglePosition: {
    top: 25,
    left: -13,
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
    borderBottomColor: '#ecebeb',
  },
  trianglePositionOther: {
    top: 25,
    right: -13,
    position: 'absolute',
    transform: [{rotate: '-270deg'}],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.deepCove,
    borderLeftColor: 'transparent',
  },
});
