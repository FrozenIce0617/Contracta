import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: scalingUtils.scale(25),
    marginRight: scalingUtils.scale(25),
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    width: scalingUtils.scale(100),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: scalingUtils.verticalScale(10),
    marginBottom: scalingUtils.verticalScale(10),
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: scalingUtils.scale(40),
  },
  count: {
    marginLeft: scalingUtils.scale(5),
    fontSize: scalingUtils.verticalScale(16),
    color: colors.black,
  },
});

export default styles;
