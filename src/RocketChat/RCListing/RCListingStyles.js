import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    // padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
  },
  imageStyle: {
    marginHorizontal: Metrics.baseMargin,
    width: 60,
    height: 60,
     // resizeMode: 'cover',
     borderRadius: 100,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: Colors.text.reca,
  },
  contentWrap: {
    flex: 1,
  },
  timeAgo: {
    position: 'absolute',
    top: 5,
    right: 10,
    alignSelf: 'flex-end',
    marginHorizontal: Metrics.baseMargin,
  },
  listWrap: {
    paddingHorizontal: Metrics.xsmallMargin,
    paddingVertical: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
  },
});
