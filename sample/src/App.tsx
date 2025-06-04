import * as React from 'react';

import { Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import firebase from '@react-native-firebase/app';
import NotificationService from './NotificationService';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import IdentificationScreen from './screens/IdentificationScreen';
import PushNotificationsScreen from './screens/PushNotificationsScreen';
import SessionAnalyticsScreen from './screens/SessionAnalyticsScreen';
import SupportChatScreen from './screens/SupportChatScreen';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Identification: undefined;
  PushNotifications: undefined;
  SessionAnalytics: undefined;
  SupportChat: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screens = [
  { name: 'Home', component: HomeScreen, title: 'DevRev SDK' },
  { name: 'Identification', component: IdentificationScreen, title: 'Identification' },
  { name: 'PushNotifications', component: PushNotificationsScreen, title: 'Push Notifications' },
  { name: 'SessionAnalytics', component: SessionAnalyticsScreen, title: 'Session Analytics' },
  { name: 'SupportChat', component: SupportChatScreen, title: 'Support Chat' },
] as const;

const createScreen = (
  name: keyof RootStackParamList,
  component: any,
  title: string,
  index: number
) => {
  return (
    <Stack.Screen
      key={`screen-${index}`}
      name={name}
      component={component}
      options={({ navigation }) => ({
        title: title,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.replace(name)}
            style={styles.refreshButton}
          >
            <Text style={styles.refreshIcon}>↻</Text>
          </TouchableOpacity>
        ),
      })} />
  )
}

const App = () => {
  React.useEffect(() => {
    try {
      firebase.app();
      DevRev.configure(
        'YOUR_APP_ID',
      );
      DevRev.setShouldDismissModalsOnOpenLink(true);
      DevRev.setInAppLinkHandler((url) => {
        Linking.openURL(url)
      });

      NotificationService.initialize();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {screens.map((screen, index) =>
          createScreen(screen.name as keyof RootStackParamList, screen.component, screen.title, index)
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  refreshButton: {
    marginRight: 20,
  },
  refreshIcon: {
    fontSize: 24,
    fontWeight: "bold",
    transform: [{ rotate: '90deg' }]
  },
});

export default App;
