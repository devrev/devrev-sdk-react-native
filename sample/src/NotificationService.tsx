import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { getMessaging, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { Platform, PermissionsAndroid } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import DeviceInfo from 'react-native-device-info';
import type { DevRevNotification, StaleNotificationData, SilentNotificationData } from './model/DevRevNotification';

const messaging = getMessaging(getApp());
const isAndroid = Platform.OS === 'android';

const handleSilentNotification = async (data: SilentNotificationData) => {
  try {
    if (data.silent) {
      const silentData: StaleNotificationData = JSON.parse(data.silent);
      if (silentData.stale_notification_ids?.length) {
        console.log('Handling stale notifications:', silentData.stale_notification_ids);
        // Cancel stale notifications
        for (const notificationId of silentData.stale_notification_ids) {
          await notifee.cancelNotification(notificationId);
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
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }
};

// Request user permission for notifications
const requestUserPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const settings = await notifee.requestPermission();
    return settings.authorizationStatus >= 0;
  } else {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};

const getDeviceToken = async (): Promise<string | null> => {
  try {
    console.log('getDeviceToken: Starting token retrieval...');

    if (isAndroid) {
      console.log('getDeviceToken: Getting Android token...');
      const token = await messaging.getToken();
      console.log('getDeviceToken: Android token received:', token);
      return token;
    } else {
      console.log('getDeviceToken: Getting iOS token...');
      const token = await messaging.getAPNSToken();
      console.log('getDeviceToken: iOS token received:', token);
      return token;
    }
  } catch (error) {
    console.error('getDeviceToken: Error in getDeviceToken:', error);
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

    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_launcher_round',
        importance: AndroidImportance.HIGH,
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
      data: remoteMessage.data,
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

// Handle notification press
const handleNotificationPress = async (notification: any): Promise<void> => {
  console.log('Notification pressed:', notification);
  if (notification.data?.message) {
    DevRev.processPushNotification(notification.data.message as string)
  }
};

// Setup notification listeners
const setupNotificationListeners = (): void => {
  // Handle token refresh
  messaging.onTokenRefresh(async (token) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      DevRev.registerDeviceToken(token, deviceId);
    } catch (error) {
      console.error('Error handling token refresh:', error);
    }
  });

  // Handle background messages
  messaging.setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("BACKGROUND MESSAGE: ", remoteMessage);
    if (Platform.OS === "android") {
      await displayNotification(remoteMessage);
    }
  });

  // Handle foreground messages
  messaging.onMessage(async (remoteMessage) => {
    console.log("FOREGROUND MESSAGE: ", remoteMessage);
    await displayNotification(remoteMessage);
  });

  // Handle foreground notification press events
  notifee.onForegroundEvent(async ({ type, detail }) => {
    try {
      switch (type) {
        case EventType.PRESS:
        await handleNotificationPress(detail.notification);
        break;
        case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      }
    } catch (error) {
      console.error('Error handling foreground event:', error);
    }
  });

  // Handle background/quit state notification press
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    try {
      if (type === EventType.PRESS) {
        await handleNotificationPress(detail.notification);
      }
    } catch (error) {
      console.error('Error handling background event:', error);
    }
  });

  // Check if app was opened from a notification
  messaging
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
    await notifee.cancelAllNotifications();
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

export const NotificationService = {
  initialize: initializeNotifications,
  register: registerDevice,
  displayNotification,
  cancelAllNotifications,
};

export default NotificationService;
