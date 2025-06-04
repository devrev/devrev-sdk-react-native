import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RoundCheckboxProps {
  label: string;
  checked: boolean;
}

const RoundCheckbox: React.FC<RoundCheckboxProps> = ({ label, checked }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && (
          <View style={styles.tickMark}>
            <View style={styles.tickMarkStem} />
            <View style={styles.tickMarkKick} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingRight: 16
  },
  label: {
    flex: 1,
    fontSize: 14.5,
    paddingLeft: 8,
    color: '#000000',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
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
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: 7,
  },
  tickMarkKick: {
    width: 8,
    height: 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 14,
    left: 1,
  },
});

export default RoundCheckbox;
