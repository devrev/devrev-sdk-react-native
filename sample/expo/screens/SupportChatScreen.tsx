import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

const buttons = [
  {
    text: 'Create a new conversation',
    onPress: DevRev.createSupportConversation,
  },
  { text: 'Show the support chat', onPress: DevRev.showSupport },
] as const;

const SupportChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Support Chat</Text>
      {buttons.map((button, index) => (
        <TouchableOpacityButton
          key={index}
          onPress={button.onPress}
          buttonText={button.text}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  heading: {
    color: '#454141',
    fontSize: 12,
    textAlign: 'left',
    paddingTop: 8,
    paddingLeft: 8,
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
});

export default SupportChatScreen;
