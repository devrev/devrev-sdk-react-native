import React, { useState } from 'react';
import viewModel from '../viewmodel/ViewModel';
import { View } from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import AlertDialog from '../components/AlertDialog';
import { commonStyles } from '../styles/styles';

const PushNotificationsScreen: React.FC = () => {
  const [showDialog, setShowDialog] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const registerPushNotifications = () => {
    viewModel.registerPushNotifications();
    setShowDialog({
      title: 'Success',
      message: 'Successfully registered for push notifications!',
    });
  };

  const unregisterDevice = () => {
    viewModel.unregisterDevice();
    setShowDialog({
      title: 'Success',
      message: 'Successfully unregistered the device!',
    });
  };

  const buttons = [
    {
      text: 'Register for push notifications',
      onPress: registerPushNotifications,
    },
    { text: 'Unregister the device', onPress: unregisterDevice },
  ] as const;

  return (
    <View style={commonStyles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={commonStyles.button}
          textStyle={commonStyles.buttonText}
        />
      ))}

      {showDialog && (
        <AlertDialog
          title={showDialog.title}
          message={showDialog.message}
          onDismiss={() => setShowDialog(null)}
        />
      )}
    </View>
  );
};

export default PushNotificationsScreen;
