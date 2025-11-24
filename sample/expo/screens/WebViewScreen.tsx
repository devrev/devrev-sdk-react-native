import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={require('../assets/sample.html')}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});

export default WebViewScreen;
