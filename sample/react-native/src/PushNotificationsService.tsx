import {
  NotificationBackgroundFetchResult,
  Notifications,
  Registered,
  RegistrationError,
  Notification,
  NotificationCompletion,
} from 'react-native-notifications';
import * as DevRev from '@devrev/sdk-react-native';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

const register = async (): Promise<void> => {
  Notifications.registerRemoteNotifications();
};

// Configure the notification service.
const configure = async (): Promise<void> => {
  try {
    register();

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannel({
        channelId: 'default',
        name: 'Default Channel',
        enableLights: true,
        enableVibration: true,
        showBadge: true,
        importance: 4,
      });
    }

    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        console.log('Device token received:', event.deviceToken);
        const deviceToken = event.deviceToken;

        DeviceInfo.getUniqueId()
          .then((deviceId) => DevRev.registerDeviceToken(deviceToken, deviceId))
          .catch((error) => {
            console.error('Could not register the device token!', error);
          });
      }
    );

    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: RegistrationError) => {
        console.error('Failed to register the device token!', event);
      }
    );

    Notifications.events().registerNotificationReceivedForeground(
      (
        notification: Notification,
        completion: (response: NotificationCompletion) => void
      ) => {
        processPushNotification(notification);

        completion({ alert: true, badge: true, sound: true });
      }
    );

    Notifications.events().registerNotificationReceivedBackground(
      (
        notification: Notification,
        completion: (response: NotificationBackgroundFetchResult) => void
      ) => {
        processPushNotification(notification);

        completion(NotificationBackgroundFetchResult.NO_DATA);
      }
    );

    Notifications.events().registerNotificationOpened(processPushNotification);
    Notifications.getInitialNotification().then(processPushNotification);
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};

const processPushNotification = (notification: Notification | undefined) => {
  if (!notification) {
    return;
  }

  const message = JSON.stringify(notification.payload);
  if (!message) {
    return;
  }

  DevRev.processPushNotification(message);
};

export const PushNotificationsService = {
  configure,
  register,
};

export default PushNotificationsService;
