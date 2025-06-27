import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, type TextStyle, type ViewStyle, View } from 'react-native';
import { commonStyles } from '../styles/styles';

interface TouchableOpacityProps {
    onPress: () => void;
    buttonText: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const TouchableOpacityButton = forwardRef<View, TouchableOpacityProps>(({
    onPress,
    buttonText,
    buttonStyle,
    textStyle,
}, ref) => {
    return (
        <TouchableOpacity
            ref={ref}
            onPress={onPress}
            style={[commonStyles.button, buttonStyle]}
        >
            <Text style={[commonStyles.buttonText, textStyle]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
});

export default TouchableOpacityButton;
