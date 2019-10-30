import { StyleSheet } from 'react-native';

import { colors, scalingUtils } from '../../../styles';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  itemMe: {
    backgroundColor: colors.navy,
    color: colors.white,
    borderRadius: scalingUtils.scale(10),
    fontSize: scalingUtils.scale(16),
  },
  itemBot: {
    backgroundColor: colors.lightgray,
    color: colors.black,
    borderRadius: scalingUtils.scale(10),
    fontSize: scalingUtils.scale(16),
  },
  inputContainer: {
    marginTop: scalingUtils.verticalScale(5),
    borderTopColor: colors.lightgray,
    borderBottomColor: colors.lightgray,
    borderTopWidth: scalingUtils.verticalScale(0.5),
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    padding: scalingUtils.scale(5),
  },
  button: {
    backgroundColor: colors.navy,
  },
});

export default styles;
