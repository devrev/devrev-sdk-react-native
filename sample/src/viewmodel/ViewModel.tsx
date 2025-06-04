import * as DevRev from '@devrev/sdk-react-native';
import installations from '@react-native-firebase/installations';
import NotificationService from '../NotificationService';

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

    return {
      registerDeviceToken,
      unregisterDevice,
      logout
    }
}

const viewModel = ViewModel();
export default viewModel;
