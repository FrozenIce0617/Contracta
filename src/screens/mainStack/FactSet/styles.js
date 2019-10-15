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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  },
  cardContainer: {
    width: '80%',
    borderRadius: scalingUtils.scale(15),
  },
  cardTitle: {
    color: colors.navy,
  },
  modalCategory: {
    fontSize: scalingUtils.verticalScale(16),
  },
  modalInput: {
    marginTop: scalingUtils.scale(10),
    marginBottom: scalingUtils.scale(10),
    paddingBottom: scalingUtils.scale(5),
    borderBottomColor: colors.navy,
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    fontSize: scalingUtils.verticalScale(16),
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnAddFact: {
    backgroundColor: colors.navy,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
  btnDecline: {
    backgroundColor: colors.gray,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
  btnAdd: {
    margin: scalingUtils.verticalScale(10),
    marginRight: scalingUtils.verticalScale(20),
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
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  factName: {
    borderBottomColor: colors.gray,
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    color: colors.navy,
    fontSize: scalingUtils.verticalScale(20),
  },
  factValue: {
    flex: 1,
    borderBottomColor: colors.gray,
    borderBottomWidth: scalingUtils.verticalScale(0.5),
    marginTop: scalingUtils.verticalScale(5),
    marginRight: scalingUtils.verticalScale(5),
    color: colors.black,
    fontSize: scalingUtils.verticalScale(18),
  },
});

export default styles;
