import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from './../../theme';

export default StyleSheet.create({
  categoryImageWrap: {
    marginTop: Metrics.mediumBaseMargin,
    marginRight: Metrics.baseMargin,
    alignItems: 'center',
  },
  iconWrapStyle: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadiusXXLarge,
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    ...AppStyles.mBottom10,
    ...AppStyles.centerInner,
  },
  categoryName: {
    color: Colors.text.primary,
  },
  imgStyle: {
    width: 50,
    height: 50,
  },
});
