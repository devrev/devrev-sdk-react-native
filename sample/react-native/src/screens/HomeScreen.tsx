import * as React from 'react';
import { View, Text, Platform, Animated } from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import { commonStyles } from '../styles/styles';
import viewModel from '../viewmodel/ViewModel';

type NavigationButton = {
  text: string;
  route: string;
};

type ActionButton = {
  text: string;
  onPress: () => void;
};

type Button = NavigationButton | ActionButton;

// Feature Section Buttons
const featureButtons: Button[] = [
  { text: 'Identification', route: 'Identification' },
  { text: 'Support Chat', route: 'SupportChat' },
  { text: 'Push Notifications', route: 'PushNotifications' },
  { text: 'Session Analytics', route: 'SessionAnalytics' },
];

// Debug Section Buttons
const debugButtons: Button[] = [
  ...(Platform.OS === 'android'
    ? [
        {
          text: 'Simulate ANR',
          onPress: () => viewModel.simulateANR(),
        },
      ]
    : []),
  {
    text: 'Simulate Crash',
    onPress: () => viewModel.simulateCrash(),
  },
];

const animationButton: Button[] = [
  {
    text: 'Bounce Animation',
    onPress: () => {
      console.log('Bounce Animation Triggered');
    },
  },
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const bounceAnimation = React.useRef(new Animated.Value(1)).current;

  const triggerBounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnimation, {
        toValue: 1.2,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnimation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderButton = (button: Button, index: number) => {
    if (button.text === 'Bounce Animation') {
      return (
        <Animated.View
          key={`button-${index}`}
          style={{ transform: [{ scale: bounceAnimation }] }}
        >
          <TouchableOpacityButton
            buttonText={button.text}
            onPress={triggerBounce}
          />
        </Animated.View>
      );
    }
    return (
      <TouchableOpacityButton
        key={`button-${index}`}
        buttonText={button.text}
        onPress={
          'route' in button
            ? () => navigation.navigate(button.route)
            : button.onPress
        }
        buttonStyle={commonStyles.button}
        textStyle={commonStyles.buttonText}
      />
    );
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Features</Text>
      {featureButtons.map((button, index) => renderButton(button, index))}

      <Text style={commonStyles.heading}>Debug</Text>
      {debugButtons.map((button, index) => renderButton(button, index))}

      {Platform.OS === 'android' && (
        <>
          <Text style={commonStyles.heading}>Animations</Text>
          {animationButton.map((button, index) => renderButton(button, index))}
        </>
      )}
    </View>
  );
};

export default HomeScreen;
