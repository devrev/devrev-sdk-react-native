import * as DevRev from '@devrev/sdk-react-native';
import PushNotificationsService from '../PushNotificationsService';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import * as Notifications from 'expo-notifications';

function ViewModel() {
  const registerPushNotifications = async () => {
    try {
      await PushNotificationsService.register();
    } catch (error) {
      console.error('Error configuring the push notifications:', error);
    }
  };

  const unregisterDevice = async () => {
    DeviceInfo.getUniqueId()
      .then((id) => DevRev.unregisterDevice(id))
      .catch((error) => {
        console.error('Error unregistering the device:', error);
      });
  };

  const simulateANR = () => {
    if (Platform.OS === 'android') {
      console.log(
        'Simulating an ANR on Android by blocking the main thread for 5 seconds.'
      );
      // Simulate an ANR by blocking the main thread.
      const startTime = Date.now();
      while (Date.now() - startTime < 5000) {
        // Block the main thread for five seconds.
        Math.random();
      }

      return;
    }

    console.log('Simulating ANRs on iOS is not supported');
  };

  const simulateCrash = () => {
    // Force a crash by accessing an undefined property.
    console.log('Simulating a crash by accessing an undefined property.');
    const obj: any = undefined;
    obj.nonExistentMethod();
  };

  const logout = async () => {
    DeviceInfo.getUniqueId()
      .then((id) => DevRev.logout(id))
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return {
    registerPushNotifications,
    unregisterDevice,
    simulateANR,
    simulateCrash,
    logout,
  };
}

const viewModel = ViewModel();

export default viewModel;
