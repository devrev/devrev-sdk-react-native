import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

const QRScannerScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [scanned, setScanned] = React.useState(false);

  const handleScan = useCallback(
    ({ data }: BarcodeScanningResult) => {
      if (scanned) return;

      setScanned(true);
      setResult(data);
    },
    [scanned]
  );

  const handleScanAgain = () => {
    setResult(null);
    setScanned(false);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Camera permission is required</Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        active={!scanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleScan}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.label}>Scanned Result</Text>

        <Text style={styles.resultText}>
          {result ?? 'No QR code scanned yet'}
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={handleScanAgain}
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
