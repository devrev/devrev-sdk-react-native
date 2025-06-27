import * as DevRev from '@devrev/sdk-react-native';
import installations from '@react-native-firebase/installations';
import NotificationService from '../NotificationService';
import { Platform } from 'react-native';

function ViewModel() {
  const registerDeviceToken = async () => {
    try {
      await NotificationService.register()
    } catch (error) {
      console.error('Error registering device:', error);
    }
  };

  const unregisterDevice = async () => {
    try {
      const id = await installations().getId();
      DevRev.unregisterDevice(id);
      console.log('Device unregistered with ID:', id);
    } catch (error) {
      console.error('Error registering device:', error);
    }
  }

  const logout = async () => {
    try {
      const id = await installations().getId();
      DevRev.logout(id);
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  const simulateCrash = () => {
    // Force a crash by accessing undefined property
    const obj: any = undefined;
    obj.nonExistentMethod();
  };

  const simulateANR = () => {
    if (Platform.OS === 'android') {
      // Simulate ANR by blocking the main thread
      const startTime = Date.now();
      while (Date.now() - startTime < 5000) {
        // Block the main thread for 5 seconds
        Math.random();
      }
    }
  };

  return {
    registerDeviceToken,
    unregisterDevice,
    logout,
    simulateCrash,
    simulateANR
  }
}

const viewModel = ViewModel();
export default viewModel;
