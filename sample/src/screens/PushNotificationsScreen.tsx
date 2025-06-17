import viewModel from '../viewmodel/ViewModel';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

interface CustomButtonProps {
  onPress: () => void;
  buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacityButton
      onPress={onPress}
      buttonText={buttonText}
      buttonStyle={styles.button}
      textStyle={styles.buttonText}
    />
  );
}

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
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <CustomButton key={index} onPress={button.onPress} buttonText={button.text} />
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

const AlertDialog: React.FC<{ title: string; message: string; onDismiss: () => void }> = ({ title, message, onDismiss }) => {
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
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 5,
    margin: 8,
  },
  buttonText: {
    color: 'black',
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
