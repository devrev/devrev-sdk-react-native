import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';

const DelayScreen: React.FC = () => {
  useEffect(() => {
    try {
      DevRev.endScreenTransition();
    } catch (error) {
      console.error('Error ending screen transition:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Delayed Screen</Text>
      <Text>This screen opened after a 2-second delay</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DelayScreen;
