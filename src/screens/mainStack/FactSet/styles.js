import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../../styles';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    margin: scalingUtils.scale(20),
    marginTop: scalingUtils.scale(10),
    flexDirection: 'column',
  },
  btnAdd: {
    margin: scalingUtils.verticalScale(20),
    marginBottom: 0,
    alignItems: 'flex-end',
  },
  btnAddStyle: {
    marginLeft: scalingUtils.scale(10),
    fontSize: scalingUtils.scale(16),
  },
  info: {
    flexDirection: 'column',
    marginBottom: scalingUtils.verticalScale(20),
  },
  factName: {
    borderBottomColor: colors.gray,
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    color: colors.navy,
    fontSize: scalingUtils.verticalScale(24),
  },
  factValue: {
    borderBottomColor: colors.gray,
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    marginTop: scalingUtils.verticalScale(5),
    color: colors.black,
    fontSize: scalingUtils.verticalScale(20),
  },
});

export default styles;
