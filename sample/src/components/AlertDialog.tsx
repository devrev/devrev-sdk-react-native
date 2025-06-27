import React from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { commonStyles } from '../styles/styles';

interface AlertDialogProps {
  title: string;
  message: string;
  onDismiss: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ title, message, onDismiss }) => {
  return (
    <Modal
      transparent={true}
      visible={true}
      onRequestClose={onDismiss}
      animationType="fade"
    >
      <View style={commonStyles.dialogContainer}>
        <View style={commonStyles.dialogContent}>
          <Text style={commonStyles.dialogTitle}>{title}</Text>
          <Text style={commonStyles.dialogMessage}>{message}</Text>
          <Button title="OK" onPress={onDismiss} />
        </View>
      </View>
    </Modal>
  );
};

export default AlertDialog;
