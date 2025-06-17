import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

const buttons = [
  { text: "Identification", route: "Identification" },
  { text: "Support Chat", route: "SupportChat" },
  { text: "Push Notifications", route: "PushNotifications" },
  { text: "Session Analytics", route: "SessionAnalytics" },
] as const;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Features</Text>
      {buttons.map((button, index) =>
        <TouchableOpacityButton key={`button-${index}`} buttonText={button.text} onPress={() => navigation.navigate(button.route)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 8,
    backgroundColor: '#FFFFFF',
  },
  textbox: {
    width: '80%',
    padding: 8,
    color: '#000000'
  },
  titleBar: {
    width: '100%',
    padding: 20,
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading: {
    color: '#454141',
    fontSize: 12,
    textAlign: 'left',
    paddingTop: 8,
    paddingLeft: 8,
  }
});

export default HomeScreen;
