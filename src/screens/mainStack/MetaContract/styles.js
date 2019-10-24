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
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  contractItem: {
    flex: 1,
    flexDirection: 'column',
    width: scalingUtils.scale(85),
    height: scalingUtils.verticalScale(180),
    margin: scalingUtils.scale(15),
    marginBottom: scalingUtils.scale(50),
  },
  preview: {
    flex: 3,
    height: scalingUtils.verticalScale(150),
  },
  email: {
    margin: scalingUtils.scale(15),
    marginBottom: 0,
  },
  navy: {
    color: colors.navy,
  },
  btnUpload: {
    flexDirection: 'row',
    margin: scalingUtils.scale(15),
    marginBottom: 0,
    justifyContent: 'flex-end',
  },
  btnFontSize: {
    marginLeft: scalingUtils.scale(10),
    fontSize: scalingUtils.scale(16),
  },
  previewIcon: {
    width: scalingUtils.scale(80),
    height: scalingUtils.scale(80),
  },
  contractTitle: {
    flex: 1,
    textAlign: 'center',
    flexGrow: 1,
    flexShrink: 1,
  },
  category: {
    margin: scalingUtils.verticalScale(10),
    marginLeft: scalingUtils.scale(20),
    marginTop: scalingUtils.verticalScale(10),
    marginBottom: 0,
    fontSize: scalingUtils.verticalScale(20),
    color: colors.navy,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  },
  termsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  termsCardContainer: {
    width: '80%',
    borderRadius: scalingUtils.scale(15),
  },
  termsTitle: {
    color: colors.navy,
  },
  termsContent: {
    textAlign: 'justify',
  },
  termsLink: {
    color: colors.navy,
    textAlign: 'center',
    marginTop: scalingUtils.scale(15),
  },
  actionFooterDivider: {
    marginBottom: scalingUtils.scale(20),
  },
  termsDivider: {
    marginTop: scalingUtils.scale(20),
    marginBottom: scalingUtils.scale(20),
    height: scalingUtils.verticalScale(0.5),
    backgroundColor: colors.navy,
  },
  firstChild: {
    marginTop: -scalingUtils.scale(15),
  },
  btnAction: {
    backgroundColor: colors.white,
  },
  titleAction: {
    color: colors.navy,
  },
  termsAccept: {
    backgroundColor: colors.navy,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
  termsDecline: {
    backgroundColor: colors.gray,
    paddingLeft: scalingUtils.scale(20),
    paddingRight: scalingUtils.scale(20),
    borderRadius: scalingUtils.scale(20),
    width: scalingUtils.scale(120),
    height: scalingUtils.scale(40),
  },
});

export default styles;
