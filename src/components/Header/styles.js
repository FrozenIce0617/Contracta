import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.navy,
  },
  avatar: {
    marginLeft: scalingUtils.scale(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    marginLeft: scalingUtils.scale(10),
    marginTop: scalingUtils.verticalScale(10),
    marginBottom: scalingUtils.verticalScale(10),
  },
  text: {
    fontSize: scalingUtils.verticalScale(16),
    color: colors.white,
  },
});

export default styles;
