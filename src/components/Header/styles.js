import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.navy,
    height: scalingUtils.scale(50),
  },
  avatar: {
    marginLeft: scalingUtils.scale(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: scalingUtils.scale(10),
    marginTop: scalingUtils.verticalScale(10),
    marginBottom: scalingUtils.verticalScale(10),
  },
  text: {
    width: scalingUtils.scale(300),
    fontSize: scalingUtils.verticalScale(16),
    color: colors.white,
  },
});

export default styles;
