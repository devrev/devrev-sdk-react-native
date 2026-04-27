import React, { forwardRef } from 'react';
import {
  TouchableOpacity,
  Text,
  type TextStyle,
  type ViewStyle,
  View,
  StyleProp,
} from 'react-native';
import { commonStyles } from '../styles/styles';

interface TouchableOpacityProps {
  onPress: () => void;
  buttonText: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const TouchableOpacityButton = forwardRef<View, TouchableOpacityProps>(
  ({ onPress, buttonText, buttonStyle, textStyle, disabled = false }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[commonStyles.button, buttonStyle]}
        disabled={disabled}
      >
        <Text style={[commonStyles.buttonText, textStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
);

export default TouchableOpacityButton;
