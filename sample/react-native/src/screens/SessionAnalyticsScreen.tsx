import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  findNodeHandle,
} from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import { commonStyles } from '../styles/styles';

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

const TimerButtons = [
  {
    text: 'Start Timer',
    onPress: () =>
      DevRev.startTimer('test-event', { test_key1: 'test-value1' }),
  },
  {
    text: 'Stop Timer',
    onPress: () => DevRev.endTimer('test-event', { test_key2: 'test-value2' }),
  },
] as const;

const OnDemandSessionButtons = [
  {
    text: 'Process All On-Demand Sessions',
    onPress: DevRev.processAllOnDemandSessions,
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

const SessionAnalyticsScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const sensitiveLabelRef = useRef(null);
  const textFieldRef = useRef(null);

  try {
    DevRev.addSessionProperties({
      test_user_id: 'test_001',
    });
    DevRev.trackScreenName('SessionAnalytics');
  } catch (error) {
    console.error('Error in session tracking:', error);
  }

  useEffect(() => {
    // Mark sensitive view
    if (sensitiveLabelRef.current) {
      const viewTag = findNodeHandle(sensitiveLabelRef.current);
      console.log('Marking sensitive view with tag:', viewTag);
      if (viewTag) {
        DevRev.markSensitiveViews([viewTag]);
      }
    }

    // Unmark text field
    if (textFieldRef.current) {
      const viewTag = findNodeHandle(textFieldRef.current);
      console.log('Unmarking text field with tag:', viewTag);
      if (viewTag) {
        DevRev.unmarkSensitiveViews([viewTag]);
      }
    }
  }, []); // Run once on mount

  const handleDelayedScreenNavigation = () => {
    try {
      DevRev.setInScreenTransitioning(true);

      setTimeout(() => {
        navigation.navigate('DelayedScreen');
      }, 2000);
    } catch (error) {
      console.error('Error in delayed screen navigation:', error);
      DevRev.setInScreenTransitioning(false);
      navigation.navigate('DelayedScreen');
    }
  };

  return (
    <ScrollView
      style={commonStyles.scrollView}
      contentContainerStyle={commonStyles.scrollViewContent}
    >
      <View style={commonStyles.container}>
        <Text style={commonStyles.heading}>Session Monitoring</Text>
        {SessionMonitoringButtons.map((button, index) => (
          <TouchableOpacityButton
            key={index}
            onPress={button.onPress}
            buttonText={button.text}
            buttonStyle={commonStyles.button}
            textStyle={commonStyles.buttonText}
          />
        ))}

        <Text style={commonStyles.heading}>Session Recording</Text>
        {SessionRecordingButtons.map((button, index) => (
          <TouchableOpacityButton
            key={index}
            onPress={button.onPress}
            buttonText={button.text}
            buttonStyle={commonStyles.button}
            textStyle={commonStyles.buttonText}
          />
        ))}

        <Text style={commonStyles.heading}>Timer</Text>
        {TimerButtons.map((button, index) => (
          <TouchableOpacityButton
            key={index}
            onPress={button.onPress}
            buttonText={button.text}
            buttonStyle={commonStyles.button}
            textStyle={commonStyles.buttonText}
          />
        ))}

        <Text style={commonStyles.heading}>Manual Masking / Unmasking</Text>
        <TouchableOpacityButton
          ref={sensitiveLabelRef}
          onPress={() => {}}
          buttonText="Manually Masked UI Item"
          buttonStyle={commonStyles.button}
          textStyle={commonStyles.buttonText}
        />
        <TextInput
          ref={textFieldRef}
          style={commonStyles.input}
          placeholder="Manually Unmasked UI Item"
        />

        <Text style={commonStyles.heading}>On-Demand Sessions</Text>
        {OnDemandSessionButtons.map((button, index) => (
          <TouchableOpacityButton
            key={index}
            onPress={button.onPress}
            buttonText={button.text}
            buttonStyle={commonStyles.button}
            textStyle={commonStyles.buttonText}
          />
        ))}

        <Text style={commonStyles.heading}>Web View</Text>
        {WebViewButton.map((button, index) => (
          <TouchableOpacityButton
            key={index}
            onPress={() => navigation.navigate('WebViewScreen')}
            buttonText={button.text}
            buttonStyle={commonStyles.button}
            textStyle={commonStyles.buttonText}
          />
        ))}

        <Text style={commonStyles.heading}>Large Scrollable List</Text>
        {ListViewButton.map((button, index) => (
          <TouchableOpacityButton
            key={index}
            onPress={() => navigation.navigate('FlatListScreen')}
            buttonText={button.text}
            buttonStyle={commonStyles.button}
            textStyle={commonStyles.buttonText}
          />
        ))}

        {Platform.OS === 'android' && (
          <>
            <Text style={commonStyles.heading}>
              Navigate to the Delayed Screen
            </Text>
            <TouchableOpacityButton
              onPress={handleDelayedScreenNavigation}
              buttonText="Go to Delayed Screen"
              buttonStyle={commonStyles.button}
              textStyle={commonStyles.buttonText}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default SessionAnalyticsScreen;
