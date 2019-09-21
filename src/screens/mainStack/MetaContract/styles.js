import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contractContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  contractItem: {
    flexDirection: 'column',
    width: scalingUtils.scale(85),
    margin: scalingUtils.scale(15),
  },
  preview: {
    height: scalingUtils.verticalScale(120),
  },
  email: {
    margin: scalingUtils.scale(15),
    marginBottom: 0,
  },
  navy: {
    color: colors.navy,
  },
  btnUpload: {
    margin: scalingUtils.scale(15),
    marginBottom: 0,
  },
  btnFontSize: {
    marginLeft: scalingUtils.scale(10),
    fontSize: scalingUtils.scale(16),
  },
  previewIcon: {
    width: scalingUtils.scale(80),
    height: scalingUtils.scale(80),
  },
});

export default styles;
