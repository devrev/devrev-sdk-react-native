import React from 'react';
import { View, Text } from 'react-native';
import { roundCheckboxStyles } from '../styles/styles';

interface RoundCheckboxProps {
  label: string;
  checked: boolean;
}

const RoundCheckbox: React.FC<RoundCheckboxProps> = ({ label, checked }) => {
  return (
    <View style={roundCheckboxStyles.checkboxContainer}>
      <Text style={roundCheckboxStyles.label}>{label}</Text>
      <View style={[roundCheckboxStyles.checkbox, checked && roundCheckboxStyles.checkedCheckbox]}>
        {checked && (
          <View style={roundCheckboxStyles.tickMark}>
            <View style={roundCheckboxStyles.tickMarkStem} />
            <View style={roundCheckboxStyles.tickMarkKick} />
          </View>
        )}
      </View>
    </View>
  );
};

export default RoundCheckbox;
