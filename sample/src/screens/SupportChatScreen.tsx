import React from 'react';
import { View, Text } from 'react-native';
import * as DevRevSDK from '@devrev/sdk-react-native';
import { commonStyles } from '../styles/styles';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

const SupportChatScreen: React.FC = () => {
  const buttons = [
    {
      text: 'Show Support',
      onPress: () => {
        console.log('Showing support');
        DevRevSDK.showSupport();
      },
    },
    {
      text: 'Create Support Conversation',
      onPress: () => {
        console.log('Creating support conversation');
        DevRevSDK.createSupportConversation();
      },
    },
  ];

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Support Chat</Text>
      {buttons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={commonStyles.button}
          textStyle={commonStyles.buttonText}
        />
      ))}
    </View>
  );
};

export default SupportChatScreen;
