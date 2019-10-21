import { StyleSheet } from 'react-native';
import { scalingUtils } from '../../../styles';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: scalingUtils.scale(20),
    backgroundColor: 'white',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    marginTop: scalingUtils.verticalScale(20),
  },
});

export default styles;
