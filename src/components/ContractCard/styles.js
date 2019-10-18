import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: scalingUtils.scale(5),
    padding: scalingUtils.scale(5),
    paddingTop: scalingUtils.verticalScale(5),
    backgroundColor: colors.white,
    borderWidth: scalingUtils.scale(1.5),
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
  flexEnd: {
    justifyContent: 'flex-end',
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
  rawText: {
    padding: scalingUtils.verticalScale(10),
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    borderColor: colors.navy,
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
    width: scalingUtils.scale(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scalingUtils.verticalScale(10),
    marginBottom: scalingUtils.verticalScale(5),
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: scalingUtils.scale(20),
  },
  count: {
    marginLeft: scalingUtils.scale(5),
    fontSize: scalingUtils.verticalScale(12),
    color: colors.black,
  },
  right: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default styles;
