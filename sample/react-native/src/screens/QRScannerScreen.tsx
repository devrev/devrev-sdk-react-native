import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  Code,
} from 'react-native-vision-camera';

const QRScannerScreen: React.FC = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleCodeScanned = useCallback(
    (codes: Code[]) => {
      if (scanned) return;

      const value = codes[0]?.value;
      if (value) {
        setResult(value);
        setScanned(true);
      }
    },
    [scanned]
  );

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Camera permission is required</Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>No Camera Device Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={!scanned}
        codeScanner={{
          codeTypes: ['qr'],
          onCodeScanned: handleCodeScanned,
        }}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.label}>Scanned Result</Text>

        <Text style={styles.resultText}>
          {result ?? 'No QR code scanned yet'}
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => {
              setScanned(false);
              setResult(null);
            }}
          >
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 4,
  },
  resultContainer: {
    flex: 1,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  resultText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 8,
  },
  scanAgainButton: {
    marginTop: 12,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  scanAgainText: {
    color: '#fff',
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});

export default QRScannerScreen;
