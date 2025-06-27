import React, { useState } from 'react';
import viewModel from '../viewmodel/ViewModel';
import { View, Text, StyleSheet } from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import AlertDialog from '../components/AlertDialog';
import { commonStyles } from '../styles/styles';

const PushNotificationsScreen: React.FC = () => {
  const [showDialog, setShowDialog] = useState<{ title: string; message: string } | null>(null);

  const handleRegister = () => {
    viewModel.registerDeviceToken();
    setShowDialog({ title: 'Success', message: 'Successfully registered for push notifications.' });
  };

  const handleUnregister = () => {
    viewModel.unregisterDevice();
    setShowDialog({ title: 'Success', message: 'Successfully unregistered for push notifications.' });
  };

  const buttons = [
    { text: "Register for push notifications", onPress: handleRegister },
    { text: "Unregister for push notifications", onPress: handleUnregister },
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
