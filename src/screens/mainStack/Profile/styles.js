import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../../styles';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    width: '100%',
    height: scalingUtils.verticalScale(140),
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: scalingUtils.scale(5),
  },
  btnEdit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: scalingUtils.scale(30),
    height: scalingUtils.scale(30),
    borderRadius: scalingUtils.scale(20),
    backgroundColor: colors.navy,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarStyle: {
    borderWidth: scalingUtils.scale(2),
    borderColor: colors.white,
  },
  infoContainer: {
    marginTop: scalingUtils.verticalScale(10),
    marginLeft: scalingUtils.scale(40),
    marginRight: scalingUtils.scale(40),
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  infoHeading: {
    marginTop: scalingUtils.verticalScale(15),
    marginBottom: scalingUtils.verticalScale(10),
    color: colors.navy,
    fontSize: scalingUtils.scale(18),
    fontWeight: 'bold',
  },
  infoContent: {
    fontSize: scalingUtils.scale(14),
  },
});

export default styles;
