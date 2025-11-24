import viewModel from '../viewmodel/ViewModel';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

const PushNotificationsScreen: React.FC = () => {
  const [showDialog, setShowDialog] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const handleRegister = async () => {
    const isRegistered = viewModel.registerDeviceToken();
    if (await isRegistered) {
      setShowDialog({
        title: 'Success',
        message: 'Successfully registered for push notifications.',
      });
    } else {
      setShowDialog({
        title: 'Error',
        message: 'Could not register the device.',
      });
    }
  };

  const handleUnregister = async () => {
    const isUnregistered = viewModel.unregisterDevice();
    if (await isUnregistered) {
      setShowDialog({
        title: 'Success',
        message: 'Successfully unregistered for push notifications.',
      });
    } else {
      setShowDialog({
        title: 'Error',
        message: 'Could not unregister the device.',
      });
      return;
    }
  };

  const buttons = [
    { text: 'Register for push notifications', onPress: handleRegister },
    { text: 'Unregister for push notifications', onPress: handleUnregister },
  ] as const;

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
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

const AlertDialog: React.FC<{
  title: string;
  message: string;
  onDismiss: () => void;
}> = ({ title, message, onDismiss }) => {
  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogTitle}>{title}</Text>
      <Text style={styles.dialogMessage}>{message}</Text>
      <Button title="OK" onPress={onDismiss} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingRight: 16,
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'black',
    paddingLeft: 8,
    fontSize: 16,
  },
  dialogContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PushNotificationsScreen;
