import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: scalingUtils.scale(10),
    padding: scalingUtils.scale(20),
    paddingTop: scalingUtils.verticalScale(5),
    paddingBottom: scalingUtils.verticalScale(5),
    backgroundColor: colors.white,
    borderWidth: scalingUtils.scale(0.5),
    borderColor: colors.navy,
    borderRadius: 4,
    height: scalingUtils.scale(680),
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.navy,
    height: scalingUtils.verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: scalingUtils.scale(20),
  },
  contractName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scalingUtils.scale(20),
  },
  contractText: {
    fontSize: scalingUtils.verticalScale(20),
    color: colors.white,
    fontWeight: 'bold',
  },
  stateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scalingUtils.scale(15),
    padding: scalingUtils.scale(5),
    backgroundColor: colors.white,
    borderRadius: scalingUtils.scale(5),
  },
  state: {
    color: colors.navy,
  },
  category: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: scalingUtils.scale(60),
  },
  intent: {
    width: scalingUtils.scale(160),
    marginTop: -scalingUtils.verticalScale(20),
  },
  prio: {
    width: scalingUtils.scale(80),
    marginTop: -scalingUtils.verticalScale(20),
    marginLeft: scalingUtils.scale(15),
  },
  prioText: {
    color: colors.navy,
  },
  entities: {
    borderTopWidth: scalingUtils.verticalScale(0.5),
    borderColor: colors.navy,
    marginTop: scalingUtils.verticalScale(5),
    paddingTop: scalingUtils.verticalScale(5),
  },
  borderTop: {
    borderTopWidth: scalingUtils.verticalScale(0.5),
    borderColor: colors.navy,
    marginTop: scalingUtils.verticalScale(5),
    paddingTop: scalingUtils.verticalScale(5),
  },
  borderBoth: {
    borderTopWidth: scalingUtils.verticalScale(0.5),
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    borderColor: colors.navy,
    marginTop: scalingUtils.verticalScale(5),
    marginBottom: scalingUtils.verticalScale(5),
    paddingTop: scalingUtils.verticalScale(5),
    paddingBottom: scalingUtils.verticalScale(5),
  },
  borderBottom: {
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    borderColor: colors.navy,
    paddingBottom: scalingUtils.verticalScale(10),
  },
  textCategory: {
    marginTop: scalingUtils.verticalScale(5),
    marginBottom: scalingUtils.verticalScale(5),
    color: colors.navy,
  },
  spaceBetween: {
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    width: scalingUtils.scale(80),
    display: 'flex',
    justifyContent: 'center',
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
  right: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  notification: {
    marginLeft: scalingUtils.scale(10),
  },
});

export default styles;
