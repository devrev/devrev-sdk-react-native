import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import DeviceInfo from 'react-native-device-info';
import * as Notifications from 'expo-notifications';

interface NotificationActor {
  display_handle: string;
  display_id: string;
  display_name: string;
  full_name: string;
  id: string;
  id_v1: string;
  state: string;
  thumbnail: string;
  type: string;
}

interface NotificationDevice {
  android: {
    channel: string;
    channel_id: string;
  };
  device_type: string;
}

interface NotificationItem {
  display_id: string;
  id: string;
  id_v1: string;
  target: string;
  title: string;
  type: string;
}

interface DevRevNotification {
  actor: NotificationActor;
  body: string;
  device: NotificationDevice;
  id: string;
  item: NotificationItem;
  notification_id: string;
  notification_id_v1: string;
  source_id: string;
  state: string;
  subtitle: string;
  title: string;
  type: string;
  url: string;
}

interface StaleNotificationData {
  stale_notification_ids?: string[];
}

interface SilentNotificationData {
  silent?: string;
}

const isAndroid = Platform.OS === 'android';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const handleSilentNotification = async (data: SilentNotificationData) => {
  try {
    if (data.silent) {
      const silentData: StaleNotificationData = JSON.parse(data.silent);
      if (silentData.stale_notification_ids?.length) {
        console.log(
          'Handling stale notifications:',
          silentData.stale_notification_ids
        );
        // Cancel stale notifications
        for (const notificationId of silentData.stale_notification_ids) {
          await Notifications.cancelScheduledNotificationAsync(notificationId);
        }
      }
    }
  } catch (error) {
    console.error('Error handling silent notification:', error);
  }
};

// Create default channel for Android
const createDefaultChannel = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default Channel',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

// Request user permission for notifications
const requestUserPermission = async (): Promise<boolean> => {
  // Check permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.error('Failed to get the device token for push notifications!');
    return false;
  }
  return true;
};

const getDeviceToken = async (): Promise<string | null> => {
  try {
    console.log('Device token: Starting token retrieval...');

    if (isAndroid) {
      console.log('Device token: Getting Android token...');
      const token = await Notifications.getDevicePushTokenAsync();
      console.log('Device token: Android token received:', token);
      return token.data;
    } else {
      console.log('Device token: Getting iOS token...');
      const token = await Notifications.getDevicePushTokenAsync();
      console.log('Device token: iOS token received:', token);
      return token.data;
    }
  } catch (error) {
    console.error('Device token: Error in getDeviceToken:', error);
    throw error;
  }
};

// Register device with DevRev
const registerDevice = async (): Promise<void> => {
  try {
    console.log('Starting device registration...');
    const hasPermission = await requestUserPermission();
    console.log('Permission status:', hasPermission);

    if (hasPermission) {
      console.log('Getting device ID...');
      const deviceId = await DeviceInfo.getUniqueId();
      console.log('Device ID:', deviceId);
      console.log('Getting device token...');
      const token = await getDeviceToken();
      console.log('Token received:', token);

      if (token) {
        console.log('Registering with DevRev...');
        await DevRev.registerDeviceToken(token, deviceId);
        console.log('Successfully registered with DevRev');
      } else {
        console.warn('Failed to get device token');
      }
    } else {
      console.warn('Notification permission not granted');
    }
  } catch (error) {
    console.error('Error registering device:', error);
    throw error;
  }
};

// Display notification
const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
): Promise<void> => {
  try {
    if (remoteMessage.data?.silent) {
      await handleSilentNotification(remoteMessage.data);
      return;
    }

    let notification: DevRevNotification | null = null;
    if (remoteMessage.data?.message) {
      try {
        notification = JSON.parse(remoteMessage.data.message as string);
      } catch (parseError) {
        console.error('Error parsing notification:', parseError);
      }
    }

    if (!notification) {
      console.warn('No valid notification data');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        data: remoteMessage.data,
      },
      trigger: null, // null means show immediately
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

// Handle notification press
const handleNotificationPress = async (notification: any): Promise<void> => {
  console.log('Notification pressed:', notification);

  if (notification.notification?.request) {
    console.log(
      'Unmarshalling: ',
      notification.notification.request.content.data.message
    );
    DevRev.processPushNotification(notification.data.message);
    return;
  }

  if (notification.data?.message) {
    DevRev.processPushNotification(notification.data.message as string);
    return;
  }

  console.warn('Unexpected notification format:', notification);
};

// Setup notification listeners
const setupNotificationListeners = (): void => {
  // Handle token refresh
  messaging().onTokenRefresh(async (token) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      DevRev.registerDeviceToken(token, deviceId);
    } catch (error) {
      console.error('Error handling token refresh:', error);
    }
  });

  // Handle background messages
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('BACKGROUND MESSAGE: ', remoteMessage);
    if (Platform.OS === 'android') {
      await displayNotification(remoteMessage);
    }
  });

  // Handle foreground messages
  messaging().onMessage(async (remoteMessage) => {
    console.log('FOREGROUND MESSAGE: ', remoteMessage);
    await displayNotification(remoteMessage);
  });

  // Handle notification interaction
  Notifications.addNotificationResponseReceivedListener((response) => {
    handleNotificationPress(response);
  });

  // Handle foreground notifications
  Notifications.addNotificationReceivedListener((notification) => {
    console.log('Foreground notification received:', notification);
  });

  // Check if app was opened from a notification
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log('App opened from quit state:', remoteMessage);
        await handleNotificationPress(remoteMessage);
      }
    })
    .catch((error) => {
      console.error('Error checking initial notification:', error);
    });
};

// Cancel all notifications
const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
};

// Initialize notification service
const initializeNotifications = async (): Promise<void> => {
  try {
    if (isAndroid) {
      await createDefaultChannel();
    }
    setupNotificationListeners();
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

export const PushNotificationsService = {
  initialize: initializeNotifications,
  register: registerDevice,
  displayNotification,
  cancelAllNotifications,
};

export default PushNotificationsService;
