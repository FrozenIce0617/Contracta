import { StyleSheet } from 'react-native';
import { scalingUtils, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: scalingUtils.scale(25),
    paddingRight: scalingUtils.scale(25),
    borderBottomColor: colors.navy,
    borderBottomWidth: scalingUtils.verticalScale(0.5),
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
  filterContainer: {
    borderTopWidth: scalingUtils.verticalScale(2),
    borderTopColor: '#1E8AF6',
  },
  category: {
    flex: 3,
    flexDirection: 'row',
  },
  filterType: {
    flex: 5,
    marginTop: -scalingUtils.verticalScale(20),
    width: '100%',
  },
  sortOrder: {
    flex: 1,
    height: scalingUtils.scale(35),
    marginTop: scalingUtils.verticalScale(10),
    marginLeft: scalingUtils.verticalScale(10),
  },
  filterDir: {
    flex: 2,
    marginTop: -scalingUtils.verticalScale(20),
    marginLeft: scalingUtils.scale(10),
    width: '100%',
  },
});

export default styles;
