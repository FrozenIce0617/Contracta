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
    marginTop: scalingUtils.verticalScale(10),
  },
  avatarStyle: {
    borderWidth: scalingUtils.scale(2),
    borderColor: colors.white,
  },
  infoContainer: {
    marginTop: scalingUtils.verticalScale(10),
    marginLeft: scalingUtils.scale(20),
    marginRight: scalingUtils.scale(20),
  },
  btnRow: {
    marginTop: scalingUtils.verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  update: {
    backgroundColor: colors.navy,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
  cancel: {
    backgroundColor: colors.gray,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
});

export default styles;
