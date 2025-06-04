import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

interface CustomButtonProps {
    onPress: () => void;
    buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonText }) => {
    return (
        <TouchableOpacityButton
            onPress={onPress}
            buttonText={buttonText}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
        />
    );
}

const SessionMonitoringButtons = [
    { text: "Stop All Monitoring", onPress: DevRev.stopAllMonitoring },
    { text: "Resume All Monitoring", onPress: DevRev.resumeAllMonitoring },
] as const;

const SessionRecordingButtons = [
    { text: "Start Recording", onPress: DevRev.startRecording },
    { text: "Stop Recording", onPress: DevRev.stopRecording },
    { text: "Pause Recording", onPress: DevRev.pauseRecording },
    { text: "Resume Recording", onPress: DevRev.resumeRecording },
] as const;

const OnDemandSessionButtons = [
    { text: "Process All On-Demand Sessions", onPress: DevRev.processAllOnDemandSessions },
] as const;

const SessionAnalyticsScreen: React.FC = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Session Monitoring</Text>
            {SessionMonitoringButtons.map((button, index) => (
                <CustomButton key={index} onPress={button.onPress} buttonText={button.text} />
            ))}

            <Text style={styles.heading}>Session Recording</Text>
            {SessionRecordingButtons.map((button, index) => (
                <CustomButton key={index} onPress={button.onPress} buttonText={button.text} />
            ))}

            <Text style={styles.heading}>On-Demand Sessions</Text>
            {OnDemandSessionButtons.map((button, index) => (
                <CustomButton key={index} onPress={button.onPress} buttonText={button.text} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
    },
    heading: {
        color: '#454141',
        fontSize: 12,
        textAlign: 'left',
        paddingTop: 8,
        paddingLeft: 8,
        paddingBottom: 8,
    },
    button: {
        padding: 8,
        paddingLeft: 2,
        borderRadius: 5,
        marginLeft: 8,
        color: '#000000',
    },
    buttonText: {
        color: '#007AFF',
        textAlign: 'left',
        fontSize: 16,
    },
});

export default SessionAnalyticsScreen;
