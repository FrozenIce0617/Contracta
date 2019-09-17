import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: scalingUtils.scale(15),
    padding: scalingUtils.scale(20),
    paddingTop: scalingUtils.verticalScale(5),
    backgroundColor: colors.white,
    borderWidth: scalingUtils.scale(0.5),
    borderColor: colors.lightgray,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
  },
  category: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: scalingUtils.scale(15),
    width: scalingUtils.scale(70),
  },
  intent: {
    width: scalingUtils.scale(200),
    marginTop: -scalingUtils.verticalScale(20),
  },
  prioText: {
    color: colors.navy,
  },
  borderBottom: {
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    borderColor: colors.navy,
    paddingBottom: scalingUtils.verticalScale(10),
  },
  textCategory: {
    // fontSize: scalingUtils.verticalScale(15),
    marginTop: scalingUtils.verticalScale(10),
    marginBottom: scalingUtils.verticalScale(10),
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
});

export default styles;