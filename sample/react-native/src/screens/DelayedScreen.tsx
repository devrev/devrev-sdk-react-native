import * as React from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';
import { commonStyles } from '../styles/styles';

const DelayedScreen: React.FC = () => {
  useEffect(() => {
    // End the screen transition when the screen is loaded (Android only)
    DevRev.setInScreenTransitioning(false);
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Delayed Screen</Text>
    </View>
  );
};

export default DelayedScreen;
