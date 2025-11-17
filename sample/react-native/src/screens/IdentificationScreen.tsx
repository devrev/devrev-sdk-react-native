import React from 'react';
import * as DevRev from '@devrev/sdk-react-native';
import { View, Text, TextInput } from 'react-native';
import viewModel from '../viewmodel/ViewModel';
import TouchableOpacityButton from '../components/TouchableOpacityButton';
import { commonStyles } from '../styles/styles';

const IdentificationScreen: React.FC = () => {
  const [userID, setUserID] = React.useState('');
  const [sessionToken, setSessionToken] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);

  const handleUnverifiedUser = () => {
    console.log('Identifying unverified user with:', userID);
    DevRev.identifyUnverifiedUser(userID);
    setCurrentUserId(userID);
  };

  const handleVerifiedUser = () => {
    console.log(
      'Identifying verified user with:',
      userID,
      'and session token:',
      sessionToken
    );
    DevRev.identifyVerifiedUser(userID, sessionToken);
    setCurrentUserId(userID);
  };

  const handleUpdateUser = () => {
    if (!currentUserId) {
      console.error('No user ID found. Please identify a user first.');
      return;
    }

    const identity = {
      userRef: currentUserId,
      userTraits: {
        email: email,
      },
    };

    console.log('Updating user with:', identity);
    DevRev.updateUser(identity);
  };

  const handleLogout = () => {
    viewModel.logout();
    setCurrentUserId(null);
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Unverified User</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="User ID"
        onChangeText={setUserID}
      />

      <TouchableOpacityButton
        onPress={handleUnverifiedUser}
        buttonText="Identify Unverified User"
        buttonStyle={commonStyles.button}
        textStyle={commonStyles.buttonText}
      />

      <View style={commonStyles.separator} />

      <Text style={commonStyles.heading}>Verified User</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="User ID"
        onChangeText={setUserID}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Enter Session token"
        onChangeText={setSessionToken}
      />

      <TouchableOpacityButton
        onPress={handleVerifiedUser}
        buttonText="Identify Verified User"
        buttonStyle={commonStyles.button}
        textStyle={commonStyles.buttonText}
      />

      <View style={commonStyles.separator} />

      <Text style={commonStyles.heading}>Update User</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="New Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacityButton
        onPress={handleUpdateUser}
        buttonText="Update User"
        buttonStyle={commonStyles.button}
        textStyle={commonStyles.buttonText}
      />

      <View style={commonStyles.separator} />

      <Text style={commonStyles.heading}>Logout</Text>
      <TouchableOpacityButton
        onPress={handleLogout}
        buttonText="Logout"
        buttonStyle={commonStyles.destructiveButton}
        textStyle={commonStyles.destructiveButtonText}
      />
    </View>
  );
};

export default IdentificationScreen;
