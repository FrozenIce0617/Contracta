import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../../styles';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardContainer: {
    width: '80%',
    borderRadius: scalingUtils.scale(15),
  },
  title: {
    color: colors.navy,
  },
  content: {
    textAlign: 'justify',
  },
  link: {
    color: colors.navy,
    textAlign: 'center',
    marginTop: scalingUtils.scale(15),
  },
  divider: {
    marginTop: scalingUtils.scale(20),
    marginBottom: scalingUtils.scale(20),
    height: scalingUtils.verticalScale(0.5),
    backgroundColor: colors.navy,
  },
  accept: {
    backgroundColor: colors.navy,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
  decline: {
    backgroundColor: colors.gray,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
});

export default styles;
