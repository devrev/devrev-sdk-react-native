import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IdentificationScreen from '../screens/IdentificationScreen';
import PushNotificationsScreen from '../screens/PushNotificationsScreen';
import SessionAnalyticsScreen from '../screens/SessionAnalyticsScreen';
import SupportChatScreen from '../screens/SupportChatScreen';
import HomeScreen from '../screens/HomeScreen';
import DelayedScreen from '../screens/DelayScreen';
import WebViewScreen from '../screens/WebViewScreen';
import FlatListScreen from '../screens/FlatListScreen';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Identification: undefined;
  PushNotifications: undefined;
  SessionAnalytics: undefined;
  SupportChat: undefined;
  DelayScreen: undefined;
  WebViewScreen: undefined;
  FlatListScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screens = [
  { name: 'Home', component: HomeScreen, title: 'DevRev SDK' },
  {
    name: 'Identification',
    component: IdentificationScreen,
    title: 'Identification',
  },
  {
    name: 'PushNotifications',
    component: PushNotificationsScreen,
    title: 'Push Notifications',
  },
  {
    name: 'SessionAnalytics',
    component: SessionAnalyticsScreen,
    title: 'Session Analytics',
  },
  {
    name: 'SupportChat',
    component: SupportChatScreen,
    title: 'Support Chat',
  },
  {
    name: 'DelayScreen',
    component: DelayedScreen,
    title: 'Delayed Screen',
  },
  {
    name: 'WebViewScreen',
    component: WebViewScreen,
    title: 'Web View',
  },
  {
    name: 'FlatListScreen',
    component: FlatListScreen,
    title: 'Large Scrollable List',
  },
] as const;

const createScreen = (
  name: keyof RootStackParamList,
  component: React.ComponentType<any>,
  title: string,
  index: number
) => (
  <Stack.Screen
    key={`screen-${index}`}
    name={name}
    component={component}
    options={({ navigation }) => ({
      title,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.replace(name)}
          style={styles.refreshButton}
        >
          <Text style={styles.refreshIcon}>↻</Text>
        </TouchableOpacity>
      ),
    })}
  />
);

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      {screens.map((screen, index) =>
        createScreen(screen.name, screen.component, screen.title, index)
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    marginRight: 20,
  },
  refreshIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
});
