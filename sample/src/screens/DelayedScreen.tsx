import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import { commonStyles } from '../styles/styles';

const DelayedScreen: React.FC = () => {
    useEffect(() => {
        // End the screen transition when the screen is loaded (Android only)
        if (Platform.OS === 'android') {
            try {
                DevRev.endScreenTransition();
            } catch (error) {
                console.error('Error ending screen transition:', error);
            }
        }
    }, []);

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.heading}>Delayed Screen</Text>
        </View>
    );
};

export default DelayedScreen;
