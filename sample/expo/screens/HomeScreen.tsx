import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import viewModel from '../viewmodel/ViewModel';
import { useRef, useState } from 'react';

const navigateButtons = [
  { text: 'Identification', route: 'Identification' },
  { text: 'Support Chat', route: 'SupportChat' },
  { text: 'Push Notifications', route: 'PushNotifications' },
  { text: 'Session Analytics', route: 'SessionAnalytics' },
] as const;

const testButtons = [
  {
    text: 'Simulate ANR',
    onPress: viewModel.simulateANR,
    platform: 'android',
  },
  {
    text: 'Simulate Crash',
    onPress: viewModel.simulateCrash,
    platform: 'both',
  },
] as const;

const buttons = testButtons.filter(
  (button) => button.platform === 'both' || button.platform === Platform.OS
);

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    scaleValue.setValue(1);

    animation.current = Animated.loop(
      Animated.sequence([
        Animated.spring(scaleValue, {
          toValue: 1.2,
          friction: 2,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 2,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 4 }
    );

    animation.current.start(({ finished: _finished }) => {
      setIsAnimating(false);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Features</Text>
      {navigateButtons.map((button, index) => (
        <TouchableOpacityButton
          key={`button-${index}`}
          buttonText={button.text}
          onPress={() => navigation.navigate(button.route)}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}
      <Text style={styles.heading}>Debug</Text>
      {buttons.map((button, index) => (
        <TouchableOpacityButton
          key={`button-${index}`}
          buttonText={button.text}
          onPress={button.onPress}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}
      <Text style={styles.heading}>Animation</Text>
      <View style={styles.buttonContainer}>
        <Animated.View
          style={[styles.button, { transform: [{ scale: scaleValue }] }]}
        >
          <TouchableOpacity
            onPress={startAnimation}
            disabled={isAnimating}
            style={styles.buttonTouchable}
          >
            <Text style={styles.buttonText}>Play an Animation</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 8,
    paddingRight: 16,
    backgroundColor: '#FFFFFF',
  },
  textbox: {
    width: '80%',
    padding: 8,
    color: '#000000',
  },
  titleBar: {
    width: '100%',
    padding: 20,
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading: {
    color: '#454141',
    fontSize: 14,
    textAlign: 'left',
    paddingTop: 8,
    margin: 8,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: 'flex-start',
    paddingBottom: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    paddingLeft: 8,
  },
  buttonTouchable: {
    width: '100%',
  },
});

export default HomeScreen;
