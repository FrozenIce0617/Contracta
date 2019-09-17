import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navy,
    height: scalingUtils.verticalScale(60),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: scalingUtils.scale(20),
  },
  row: {
    flexDirection: 'row',
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scalingUtils.scale(20),
  },
  headingText: {
    fontSize: scalingUtils.verticalScale(20),
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
