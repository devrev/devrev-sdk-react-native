import React from 'react';
import { TouchableOpacity, Text, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

interface TouchableOpacityProps {
  onPress: () => void;
  buttonText: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const TouchableOpacityButton: React.FC<TouchableOpacityProps> = ({
  onPress,
  buttonText,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 4,
    padding: 8,
    paddingLeft: 4,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default TouchableOpacityButton;
