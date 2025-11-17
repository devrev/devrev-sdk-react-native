import React, { useRef } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  View,
  findNodeHandle,
} from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigator/Navigator';

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'DelayScreen'
// >;

const SessionMonitoringButtons = [
  { text: 'Stop All Monitoring', onPress: DevRev.stopAllMonitoring },
  { text: 'Resume All Monitoring', onPress: DevRev.resumeAllMonitoring },
] as const;

const SessionRecordingButtons = [
  { text: 'Start Recording', onPress: DevRev.startRecording },
  { text: 'Stop Recording', onPress: DevRev.stopRecording },
  { text: 'Pause Recording', onPress: DevRev.pauseRecording },
  { text: 'Resume Recording', onPress: DevRev.resumeRecording },
  {
    text: 'Pause User Interaction Tracking',
    onPress: DevRev.pauseUserInteractionTracking,
  },
  {
    text: 'Resume User Interaction Tracking',
    onPress: DevRev.resumeUserInteractionTracking,
  },
] as const;

const OnDemandSessionButtons = [
  {
    text: 'Process All On-Demand Sessions',
    onPress: DevRev.processAllOnDemandSessions,
  },
] as const;

const Timer = [
  {
    text: 'Start Timer',
    onPress: () => DevRev.startTimer('session', { state: 'start-timer' }),
  },
  {
    text: 'Stop Timer',
    onPress: () => DevRev.endTimer('session', { state_now: 'end-timer' }),
  },
] as const;

const WebViewButton = [
  {
    text: 'Open Web View',
  },
] as const;

const ListViewButton = [
  {
    text: 'Open Large Scrollable List',
  },
] as const;

const SessionAnalyticsScreen = ({ navigation }: { navigation: any }) => {
  const sensitiveLabelRef = useRef<Text>(null);
  const unsensitiveLabelRef = useRef<TextInput>(null);

  const properties: Record<string, any> = { state: 'active' };
  DevRev.addSessionProperties(properties);

  DevRev.trackScreen('Session Analytics Screen');

  if (sensitiveLabelRef.current) {
    const sensitiveLabelHandle = findNodeHandle(sensitiveLabelRef.current);
    if (sensitiveLabelHandle) {
      try {
        DevRev.markSensitiveViews([`devrev-mask-${sensitiveLabelHandle}`]);
      } catch (error) {
        console.error('Failed to mark view as sensitive:', error);
      }
    }

    const unsensitiveLabelHandle = findNodeHandle(unsensitiveLabelRef.current);
    if (unsensitiveLabelHandle) {
      try {
        DevRev.markSensitiveViews([`devrev-mask-${unsensitiveLabelHandle}`]);
      } catch (error) {
        console.error('Failed to mark view as unsensitive:', error);
      }
    }
  }

  const displayScreenTransition = () => {
    if (Platform.OS === 'android') {
      DevRev.startScreenTransition();
    }
    setTimeout(() => {
      navigation.navigate('DelayScreen');
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Session Monitoring</Text>
      {SessionMonitoringButtons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}

      <Text style={styles.heading}>Session Recording</Text>
      {SessionRecordingButtons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}

      <Text style={styles.heading}>Timers</Text>
      {Timer.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}

      <Text style={styles.heading}>Manual Masking / Unmasking</Text>
      <Text style={styles.text} ref={sensitiveLabelRef}>
        Manual Masked UI Item
      </Text>
      <TextInput
        ref={unsensitiveLabelRef}
        style={styles.input}
        placeholder="Manual Unmasked UI Item"
      />

      <Text style={styles.heading}>On-Demand Sessions</Text>
      {OnDemandSessionButtons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}

      <Text style={styles.heading}>Web View</Text>
      {WebViewButton.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={() => navigation.navigate('WebViewScreen')}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}

      <Text style={styles.heading}>Large Scrollable List</Text>
      {ListViewButton.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={() => navigation.navigate('FlatListScreen')}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}

      {Platform.OS === 'android' && (
        <View>
          <Text style={styles.heading}>Navigate to the Delayed Screen</Text>
        </View>
      )}
      {Platform.OS === 'android' && (
        <View>
          <TouchableOpacityButton
            onPress={() => displayScreenTransition()}
            buttonText="Navigate to the Delayed Screen"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingRight: 16,
  },
  heading: {
    color: '#454141',
    fontSize: 12,
    textAlign: 'left',
    margin: 8,
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'black',
    paddingLeft: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    margin: 8,
  },
  text: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 16,
    padding: 8,
  },
});

export default SessionAnalyticsScreen;
