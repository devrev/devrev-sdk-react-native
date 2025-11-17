import * as React from 'react';

import { Text, TouchableOpacity } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import PushNotificationsService from './PushNotificationsService';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import IdentificationScreen from './screens/IdentificationScreen';
import PushNotificationsScreen from './screens/PushNotificationsScreen';
import SessionAnalyticsScreen from './screens/SessionAnalyticsScreen';
import SupportChatScreen from './screens/SupportChatScreen';
import HomeScreen from './screens/HomeScreen';
import DelayedScreen from './screens/DelayedScreen';
import WebViewScreen from './screens/WebViewScreen';
import FlatListScreen from './screens/FlatListScreen';
import { commonStyles } from './styles/styles';

export type RootStackParamList = {
  Home: undefined;
  Identification: undefined;
  PushNotifications: undefined;
  SessionAnalytics: undefined;
  SupportChat: undefined;
  DelayedScreen: undefined;
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
    name: 'DelayedScreen',
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
          <TouchableOpacity
            onPress={() => navigation.replace(name)}
            style={commonStyles.refreshButton}
          >
            <Text style={commonStyles.refreshIcon}>↻</Text>
          </TouchableOpacity>
        ),
      })}
    />
  );
};

const App = () => {
  React.useEffect(() => {
    try {
      DevRev.configure('YOUR_APP_ID');
      DevRev.setShouldDismissModalsOnOpenLink(true);
      PushNotificationsService.configure();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {screens.map((screen, index) =>
          createScreen(
            screen.name as keyof RootStackParamList,
            screen.component,
            screen.title,
            index
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
