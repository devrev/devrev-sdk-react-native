import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heading: {
    color: colors.secondaryLabel,
    fontSize: 14,
    textAlign: 'left',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: colors.secondaryBackground,
    padding: 12,
    borderRadius: 5,
    margin: 8,
  },
  buttonText: {
    color: colors.label,
    fontSize: 16,
  },
  destructiveButton: {
    backgroundColor: colors.destructive,
    padding: 12,
    borderRadius: 5,
    margin: 8,
  },
  destructiveButtonText: {
    color: colors.background,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: colors.separator,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    margin: 8,
    color: colors.label,
    backgroundColor: colors.background,
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator,
    marginVertical: 16,
  },
  dialogContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    borderColor: colors.separator,
    borderWidth: 2,
    width: '80%',
    maxWidth: 400,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.label,
  },
  dialogMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.secondaryLabel,
  },
  refreshButton: {
    marginRight: 20,
  },
  refreshIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
});

export const roundCheckboxStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 14.5,
    paddingLeft: 8,
    color: colors.label,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.systemGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkedCheckbox: {
    backgroundColor: colors.systemGray,
  },
  tickMark: {
    width: 12,
    height: 18,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickMarkStem: {
    width: 2,
    height: 16,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 0,
    left: 7,
  },
  tickMarkKick: {
    width: 8,
    height: 2,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 14,
    left: 1,
  },
});

export const touchableOpacityButtonStyles = StyleSheet.create({
  button: {
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: colors.background,
  },
  buttonText: {
    color: colors.label,
    fontSize: 16,
    textAlign: 'left',
  },
});
